const { parsed: localEnv } = require("dotenv").config();

const webpack = require("webpack");
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const nodeEnv = JSON.stringify(process.env.NODE_ENV);
const devStore = JSON.stringify(process.env.DEV_STORE);
const extensionUuid = JSON.stringify(
  process.env.SHOPIFY_THEME_APP_EXTENSION_ID
);

module.exports = {
  webpack: (config) => {
    const env = {
      API_KEY: apiKey,
      NODE_ENV: nodeEnv,
      DEV_STORE: devStore,
      EXTENSION_UUID: extensionUuid,
    };
    config.plugins.push(new webpack.DefinePlugin(env));

    // Add ESM support for .mjs files in webpack 4
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};
