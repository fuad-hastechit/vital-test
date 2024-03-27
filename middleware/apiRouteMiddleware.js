import ShopifyAPINode from "shopify-api-node";
import Shopify from "@shopify/shopify-api";

const apiRouteMiddleware = async (ctx, next) => {
  const { authorization } = ctx.request.headers;
  if (!authorization) {
    return ctx.throw(
      401,
      "Please include authentication token in the request header!"
    );
  }
  const token = authorization.split(" ")[1];
  const { dest } = Shopify.Utils.decodeSessionToken(token);
  const shop = dest.replace(/https:\/\//, "");

  const { accessToken } = await Shopify.Utils.loadOfflineSession(shop);

  ctx.shopify = new ShopifyAPINode({
    shopName: shop,
    accessToken,
    apiVersion: process.env.SHOPIFY_API_VERSION,
  });
  ctx.shop = shop;
  ctx.accessToken = accessToken;

  await next();
};

export default apiRouteMiddleware;
