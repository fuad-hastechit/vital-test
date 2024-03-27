const path = require("path");
const jsConfig = require("./jsconfig.json");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "module-resolver",
      {
        root: [path.resolve(jsConfig.compilerOptions.baseUrl)],
        alias: {
          "@utils": "./utils",
          "@routes": "./routes",
          "@models": "./models",
          "@controllers": "./controllers",
          "@components": "./components",
          "@middleware": "./middleware",
          "@hooks": "./hooks",
        },
      },
    ],
  ],
};
