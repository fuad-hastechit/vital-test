import ShopifyAPINode from "shopify-api-node";
import axios from "axios";

import pricingConfig from "pricingConfig.json";
import { Shop, CouponCode } from "@models";

const forwardingAddress = process.env.HOST;

export const getPlanDetails = async (ctx) => {
  const { shop, shopify } = ctx;
  const { planName, planPricing } =
    (await Shop.findOne({ shopName: shop }, ["planName", "planPricing"])) || {};

  let activeChargePrice = planPricing;

  if (!activeChargePrice) {
    const allChargeResult = await shopify.recurringApplicationCharge.list({
      fields: ["price", "status"],
    });

    activeChargePrice = allChargeResult.find(
      (singleCharge) => singleCharge.status === "active"
    )?.price;

    if (activeChargePrice) {
      await Shop.findOneAndUpdate(
        { shopName: shop },
        {
          planPricing: activeChargePrice,
        }
      );
    }
  }

  ctx.response.status = 200;
  ctx.body = { planName, activeChargePrice, shopName: shop };
};

export const subscribePlan = async (ctx) => {
  const { shop: shopName, accessToken, shopify } = ctx;

  const {
    subscriptionType: subscriptionTypeData,
    appliedCouponCode,
  } = ctx.request.body;

  let billingResult;

  if (!subscriptionTypeData) {
    return ctx.throw(400, "Please include right req body");
  }

  const shopExist = await Shop.findOne({ shopName });
  let validatedCouponResult = {};

  if (appliedCouponCode) {
    const couponCodeRegex = new RegExp(`^${appliedCouponCode.trim()}$`, "i");

    const couponCodeResult = await CouponCode.findOne({
      discountCode: couponCodeRegex,
    });

    if (couponCodeResult) {
      const limitValidation =
        couponCodeResult.useLimit === "NO_LIMIT" ||
        couponCodeResult.useLimit > 0;

      let shopsListValidation = false;
      couponCodeResult.shopsList = couponCodeResult.shopsList || [];

      if (couponCodeResult.shopsList.length === 0) {
        shopsListValidation = true;
      } else {
        const shopMatched = couponCodeResult.shopsList.find(
          (singleShop) =>
            singleShop.trim().toLowerCase() === shopName.trim().toLowerCase()
        );
        if (shopMatched) {
          shopsListValidation = true;
        }
      }
      if (limitValidation && shopsListValidation) {
        validatedCouponResult = couponCodeResult;
        if (couponCodeResult.useLimit !== "NO_LIMIT") {
          let useLimit;
          if (isFinite(couponCodeResult.useLimit)) {
            useLimit = couponCodeResult.useLimit - 1;
          } else {
            useLimit = "NO_LIMIT";
          }
          await CouponCode.updateOne(
            {
              discountCode: couponCodeRegex,
            },
            {
              useLimit,
            }
          );
        }
      }
    }
  }

  const getQuery = function (subscriptionType) {
    let trialDays;
    let returnUrl = `${forwardingAddress}/payment_success?shopName=${shopName}&accessToken=${accessToken}&subscriptionType=${subscriptionType}`;

    if (!shopExist) {
      trialDays = pricingConfig[subscriptionType]?.trial_days;
    } else if (shopExist.isUnInstalled) {
      trialDays =
        pricingConfig[subscriptionType]?.trial_days -
        Math.round(
          (shopExist.unInstalledDate - shopExist.createdAt) / 86400000
        );
      returnUrl += "&isUnInstalled=true";
    } else {
      // trialDays =
      //   pricingConfig[subscriptionType]?.trial_days -
      //   Math.round((Date.now() - shopExist.createdAt) / 86400000);
      trialDays = pricingConfig[subscriptionType]?.trial_days;
    }

    if (subscriptionType === "free") {
      return returnUrl;
    }

    const discountString = validatedCouponResult?.discountPercentage
      ? ` (${validatedCouponResult?.discountPercentage}% DISCOUNT)`
      : "";

    let planPrice = pricingConfig[subscriptionType].price;

    let isPlanTestMode = pricingConfig[subscriptionType].test;

    if (validatedCouponResult?.discountPercentage?.toString() === "100") {
      isPlanTestMode = true;
    } else if (validatedCouponResult?.discountPercentage) {
      planPrice -=
        (validatedCouponResult?.discountPercentage / 100) * planPrice;
    }

    const planName = `${pricingConfig[subscriptionType].name}${discountString}`;

    return `mutation {
      appSubscriptionCreate(
        name: "${planName}"
        returnUrl: "${returnUrl}"
        trialDays: ${trialDays > 0 ? trialDays : 0}
        test: ${isPlanTestMode}
        lineItems: [
        {
            plan: {
                appRecurringPricingDetails: {
                    price:  { amount: ${planPrice}, currencyCode: USD }
                    interval: ${
                      subscriptionType === "yearly" ? "ANNUAL" : "EVERY_30_DAYS"
                    }
                }
            }
        }
        ]
      ) {
          appSubscription {
            id
            status
          }
          confirmationUrl
          userErrors {
            field
            message
          }
      }
  }`;
  };

  // const billingResult = await shopify.graphql(getQuery(subscriptionTypeData));

  // Free Plan
  if (subscriptionTypeData === "free") {
    billingResult = getQuery(subscriptionTypeData);
  } else {
    billingResult = await shopify.graphql(getQuery(subscriptionTypeData));
  }

  ctx.response.status = 200;
  ctx.body = { billingResult };
};

export const paymentSuccess = async (ctx) => {
  const {
    shopName,
    accessToken,
    subscriptionType,
    charge_id: chargeId,
  } = ctx.request.query;

  const host = Buffer.from(`${shopName}/admin`).toString("base64");

  if (!accessToken || !shopName) {
    return ctx.throw(400, "Please include right req body");
  }

  const shopify = new ShopifyAPINode({
    shopName,
    accessToken,
    apiVersion: process.env.SHOPIFY_API_VERSION,
  });

  const prevShopData = await Shop.findOneAndUpdate(
    { shopName },
    {
      accessToken,
      isUnInstalled: false,
      willCreateNecessaryWebhook: false,
      planName: subscriptionType,
      planPricing: pricingConfig[subscriptionType]?.price || 0,
      chargeId,
    }
  );

  await axios.post(process.env.CRM_WEBHOOK, {
    email: prevShopData.ownerEmail,
    app_plan_name: subscriptionType,
  });

  const themePublishWebHookData = {
    address: `${forwardingAddress}/theme_publish?shop=${shopName}`,
    topic: "themes/publish",
  };

  const [webHookList] = await Promise.all([shopify.webhook.list()]);

  const isThemePublishWebHookExist = webHookList
    .map((item) => item.topic)
    .includes(themePublishWebHookData.topic);

  if (!isThemePublishWebHookExist) {
    await shopify.webhook.create(themePublishWebHookData);
  }

  if (subscriptionType === "free") {
    // Fee plan
    // Cancel the previews subscription
    const chargeList = await shopify.recurringApplicationCharge.list({
      fields: ["id", "status"],
    });

    const activeCharge = chargeList.find(
      (charge) => charge.status === "active"
    );

    if (activeCharge) {
      const query = `
      mutation {
        appSubscriptionCancel(
      id: "gid://shopify/AppSubscription/${activeCharge.id}"
        ) {
          userErrors {
            field
            message
          }
          appSubscription {
            id
            status
          }
        }
      }`;
      await shopify.graphql(query);
    }
  }

  return ctx.redirect(`/?shop=${shopName}&host=${host}`);
};

export const postCouponCodeCheck = async (ctx) => {
  const { shop } = ctx;
  const { couponCode } = ctx.request.body;

  const couponCodeRegex = new RegExp(`^${couponCode.trim()}$`, "i");

  const couponCodeResult = await CouponCode.findOne({
    discountCode: couponCodeRegex,
  });

  if (!couponCodeResult) {
    ctx.response.status = 400;
    ctx.body = {
      err: "Coupon code is invalid!",
    };
    return;
  }

  const limitValidation =
    couponCodeResult?.useLimit === "NO_LIMIT" || couponCodeResult?.useLimit > 0;

  if (!limitValidation) {
    ctx.response.status = 400;
    ctx.body = {
      err: "Coupon code is expired!",
    };
    return;
  }

  couponCodeResult.shopsList = couponCodeResult.shopsList || [];
  if (couponCodeResult.shopsList.length !== 0) {
    const shopMatched = couponCodeResult.shopsList.find(
      (singleShop) =>
        singleShop.trim().toLowerCase() === shop.trim().toLowerCase()
    );
    if (!shopMatched) {
      ctx.response.status = 400;
      ctx.body = {
        err: "You are not allowed to use this coupon code!",
      };
      return;
    }
  }

  const appliedCouponCode = {
    discountCode: couponCodeResult.discountCode,
    discountPercentage: couponCodeResult.discountPercentage,
  };

  ctx.response.status = 200;
  ctx.body = { appliedCouponCode };
};
