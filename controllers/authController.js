import ShopifyAPINode from "shopify-api-node";
import juice from "juice";
import Queue from "bull";
import fs from "fs";
import path from "path";
import axios from "axios";

import { Shop } from "@models";

const forwardingAddress = process.env.HOST;

// email sending dependance
const sendMailQueue = new Queue(
  process.env.EMAIL_QUEUE_NAME,
  process.env.REDIS_URI
);

const welcomeMail = fs
  .readFileSync(
    path.join(
      __dirname,
      "..",
      "utils",
      "sendmail",
      "email-templates",
      "welcome-mail.html"
    )
  )
  .toString();

const emailHTML = welcomeMail
  .replace(/{{APP_NAME}}/g, process.env.APP_NAME)
  .replace(/{{APP_EMAIL}}/g, process.env.APP_EMAIL);

export const afterAuth = async (ctx) => {
  // Access token and shop available in ctx.state.shopify
  const { shop, accessToken } = ctx.state.shopify;

  const shopify = new ShopifyAPINode({
    shopName: shop,
    accessToken,
    apiVersion: process.env.SHOPIFY_API_VERSION,
  });

  const [shopExist, shopData] = await Promise.all([
    Shop.findOne({ shopName: shop }),
    shopify.shop.get({
      fields: [
        "email",
        "domain",
        "name",
        "shop_owner",
        "phone",
        "address1",
        "address_line_2",
        "city",
        "state",
        "postal_code",
        "country",
        "domain",
        "myshopify_domain",
        "plan_name",
      ],
    }),
  ]);

  if (!shopExist || shopExist.isUnInstalled) {
    await Shop.updateOne(
      {
        shopName: shop,
      },
      {
        shopName: shop,
        accessToken,
        willCreateNecessaryWebhook: true,
        isUnInstalled: false,
        planName: null,
        ownerEmail: shopData.email,
      },
      {
        upsert: true,
      }
    );
    // NOTE: HERE ONLY UNINSTALL WEBHOOK WILL BE CREATED. OTHER WEBHOOK WILL BE CREATED ON THE paymentSuccess CONTROLLER
    await shopify.webhook.create({
      address: `${forwardingAddress}/app_uninstalled`,
      topic: "app/uninstalled",
    });

    // await sendMailQueue.add({
    //   to: shopData.email,
    //   subject: `Welcome to The ${process.env.APP_NAME} App`,
    //   html: juice(emailHTML),
    //   text: `Welcome to The ${process.env.APP_NAME} App`,
    // });
    await axios.post(process.env.CRM_WEBHOOK, {
      full_name: shopData.shop_owner || shopData.name,
      email: shopData.email,
      phone: shopData.phone,
      address_line_1: shopData.address_line_1,
      address_line_2: shopData.address_line_2,
      city: shopData.city,
      state: shopData.state,
      postal_code: shopData.postal_code,
      country: shopData.country,
      domain: shopData.domain,
      myshopify_domain: shopData.myshopify_domain,
      plan_name: shopData.plan_name,
      app_name: process.env.APP_NAME,
      tags: [process.env.CRM_INSTALL_ID],
    });
  }

  // Redirect to Billing Page
  if (!shopExist || !shopExist.planName) {
    return ctx.redirect(
      `/plan?shop=${shop}&is_new=true&host=${ctx.query.host}`
    );
    // return ctx.redirect(
    //   `/payment_success?shopName=${shop}&accessToken=${accessToken}&subscriptionType=free&host=${ctx.query.host}`
    // );
  }
  ctx.redirect(`/?shop=${shop}&host=${ctx.query.host}`);
};
