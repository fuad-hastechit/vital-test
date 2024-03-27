import fs from "fs";
import path from "path";
import Shopify from "@shopify/shopify-api";
import Queue from "bull";
import juice from "juice";
import ShopifyAPINode from "shopify-api-node";

import axios from "axios";

import { Shop } from "@models";

import {
  HOME_PAGE_SCHEMA_SNIPPETS_NAME,
  PRODUCT_PAGE_SCHEMA_SNIPPETS_NAME,
  COLLECTION_PAGE_SCHEMA_SNIPPETS_NAME,
} from "@utils/allStrings";

import {
  homePageSchema,
  productPageSchema,
  collectionPageSchema,
} from "@utils/schema";

import {
  getHomePageSchemaRender,
  getProductPageSchemaRender,
  getCollectionPageSchemaRender,
} from "@utils/getRenderCode";

const sendMailQueue = new Queue(
  process.env.EMAIL_QUEUE_NAME,
  process.env.REDIS_URI
);

const unInstallMail = fs
  .readFileSync(
    path.join(
      __dirname,
      "..",
      "utils",
      "sendmail",
      "email-templates",
      "uninstall-mail.html"
    )
  )
  .toString();

export const appUninstalled = async (ctx) => {
  // eslint-disable-next-line camelcase
  const { myshopify_domain, email } = ctx.request.body;

  const emailHTML = unInstallMail
    .replace(/{{APP_NAME}}/g, process.env.APP_NAME)
    .replace(/{{APP_EMAIL}}/g, process.env.APP_EMAIL);

  // // send uninstall mail
  // await sendMailQueue.add({
  //   to: email,
  //   subject: `You Have Uninstalled The ${process.env.APP_NAME} App`,
  //   html: juice(emailHTML),
  //   text: `You Have Uninstalled The ${process.env.APP_NAME} App`,
  // });

  await axios.post(process.env.CRM_WEBHOOK, {
    email,
    myshopify_domain,
    app_plan_name: "Uninstalled",
    app_name: process.env.APP_NAME,
    tags: [process.env.CRM_UNINSTALL_ID],
  });

  await Promise.all([
    Shop.findOneAndUpdate(
      { shopName: myshopify_domain },
      {
        isUnInstalled: true,
        planName: null,
        planPricing: null,
        accessToken: null,
        unInstalledDate: Date.now(),
      }
    ),
    Shopify.Utils.deleteOfflineSession(myshopify_domain),
  ]);

  ctx.response.status = 200;
  ctx.body = { done: true };
};

export const themePublish = async (ctx) => {
  // eslint-disable-next-line camelcase
  const { shop } = ctx.query;

  const shopData = (await Shop.findOne({ shopName: shop })) || {};

  await axios.post(process.env.CRM_WEBHOOK, {
    email: shopData.ownerEmail,
    myshopify_domain: shopData.shopName,
    app_name: process.env.APP_NAME,
    tags: [process.env.CRM_THEME_CHANGE_ID],
  });
  ctx.response.status = 200;
  ctx.body = { done: true };
};

export const getScriptTag = async (ctx) => {
  // eslint-disable-next-line camelcase
  const { shop } = ctx.request.query;

  if (!shop) {
    ctx.response.status = 400;
    ctx.body = { err: "Please include shop name" };
  }

  ctx.set("content-type", "application/javascript");
  ctx.response.status = 200;
  ctx.body = "";
};

// erase shop data
export const eraseShopData = async (ctx) => {
  try {
    console.log("From shop data erase webhook ", ctx.request.body);
    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
    };
  } catch (error) {
    console.log("From shop data erase webhook ", error);
  }
};

// erase customer data
export const eraseCustomerData = async (ctx) => {
  try {
    console.log("From customer data erase webhook ", ctx.request.body);
    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
    };
  } catch (error) {
    console.log("From customer data erase webhook ", error);
  }
};

// request customer data
export const requestCustomerData = async (ctx) => {
  try {
    console.log("From customer data request webhook ", ctx.request.body);
    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
    };
  } catch (error) {
    console.log("From customer data request webhook ", error);
  }
};
