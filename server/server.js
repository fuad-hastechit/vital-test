import "@babel/polyfill";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import Koa from "koa";
import nextJS from "next";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import { receiveWebhook } from "@shopify/koa-shopify-webhooks";

// import middleware, routes, controllers, models, utils
import {
  apiRouteMiddleware,
  errorHandlerMiddleware,
  verifyRequestMiddleware,
} from "@middleware";
import combineRouters from "../routes/index";
import mongoConnect from "@utils/mongoConnect";
import customSessionStorage from "@utils/customSessionStorage";
import { paymentSuccess } from "@controllers/planController";
import {
  appUninstalled,
  getScriptTag,
  eraseShopData,
  eraseCustomerData,
  requestCustomerData,
  themePublish,
} from "@controllers/webhookAndScriptTagController";
import { afterAuth } from "@controllers/authController";

// background process
require("../all_background_process");

Shopify.Context.initialize({
  // eslint-disable-next-line no-process-env
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: process.env.SHOPIFY_API_VERSION,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: customSessionStorage,
});

const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = nextJS({
  dev,
});
const handle = app.getRequestHandler();

const webhook = receiveWebhook({ secret: process.env.SHOPIFY_API_SECRET });

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];

  // use middleware
  server.use(serve("./public"));
  server.use(bodyParser());
  server.use(errorHandlerMiddleware);
  server.use(
    createShopifyAuth({
      accessMode: "offline",
      afterAuth,
    })
  );

  // Global Error Handler
  server.on("error", (err, ctx) => {
    const extraPrams = `[${new Date().toLocaleString([], {
      timeZone: "Asia/Dhaka",
    })}] - ${ctx?.request?.method} - ${ctx?.response?.status} - [${
      ctx?.request?.url
    }] ==>`;
    console.log("\x1b[36m%s\x1b[0m", extraPrams, err);
  });

  // Serve next.js
  const handleRequest = async (ctx) => {
    if (ctx.query.shop) {
      ctx.response.set(
        "Content-Security-Policy",
        `frame-ancestors https://${ctx.query.shop} https://admin.shopify.com`
      );
    }
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.get("/plan", async (ctx) => {
    await handleRequest(ctx);
  });

  router.get("/payment_success", paymentSuccess);

  router.get("/get_script", getScriptTag);

  // Webhook routes
  // App Uninstall webhook
  router.post("/app_uninstalled", webhook, appUninstalled);
  // Theme Publish Webhook
  router.post("/theme_publish", webhook, themePublish);
  // erase shop data Webhook
  router.post("/shop/data-erase", webhook, eraseShopData);
  // erase customer data Webhook
  router.post("/customer/data-erase", webhook, eraseCustomerData);
  // request customer data Webhook
  router.post("/customer/data-request", webhook, requestCustomerData);

  // Handle Graphql Request
  router.post("/graphql", verifyRequest(), async (ctx) => {
    await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
  });

  router.use(
    "/api",
    apiRouteMiddleware,
    combineRouters.routes(),
    combineRouters.allowedMethods()
  );

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear

  router.get("(.*)", verifyRequestMiddleware, handleRequest); // Everything else must have sessions

  server.use(router.allowedMethods());
  server.use(router.routes());

  // mongodb connect
  mongoConnect(process.env.MONGO_CONNECT_URI, port, server);
});
