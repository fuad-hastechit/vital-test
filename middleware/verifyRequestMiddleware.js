import fs from "fs";
import path from "path";
import Shopify from "@shopify/shopify-api";

import { Shop } from "@models";

const unAuthHomePageRow = fs
  .readFileSync(
    path.join(__dirname, "..", "utils", "files", "unAuthHomePage.html")
  )
  .toString();

const unAuthHomePage = unAuthHomePageRow
  .replace(/{{app_name}}/g, process.env.APP_NAME)
  .replace(/{{host_domain}}/g, process.env.HOST);

const verifyRequestMiddleware = async (ctx, next) => {
  const { shop, host } = ctx.query;

  if (!shop) {
    ctx.body = unAuthHomePage;
    return;
  }

  const [shopData, sessionData] = await Promise.all([
    Shop.findOne({ shopName: shop }),
    Shopify.Utils.loadOfflineSession(shop),
  ]);

  const { scope: dataBaseSavedScope } = sessionData || {};

  const dataBaseSavedScopeSorted = dataBaseSavedScope
    ?.split(",")
    ?.map((item) => item.trim())
    ?.sort();

  const envScopeSorted = process.env.SCOPES?.split(",")
    ?.map((item) => item.trim())
    ?.sort();

  const isScopeMatched =
    dataBaseSavedScopeSorted?.toString() === envScopeSorted?.toString();

  if (!shopData || shopData.isUnInstalled || !isScopeMatched || !host) {
    ctx.redirect(`/auth?shop=${shop}`);
  } else if (!shopData.planName) {
    ctx.redirect(`/plan?shop=${shop}&is_new=true&host=${host}`);
  } else {
    await next();
  }

  // if (!shopData || !shopData.planName || !isScopeMatched) {
  //   ctx.redirect(`/auth?shop=${shop}`);
  // } else {
  //   await next();
  // }
};

export default verifyRequestMiddleware;
