import colors from "colors";

const errorHandlerMiddleware = async (ctx, next) => {
  try {
    if (ctx.path === "/auth" && String(ctx.query.shop) === "undefined") {
      return ctx.redirect(`/`);
    }
    await next();
  } catch (err) {
    if (ctx.path === "/auth/callback") {
      return ctx.redirect(`/auth?shop=${ctx.query.shop}`);
    }
    if (err?.response?.body?.errors) {
      console.log(colors.red("Shopify ERROR: "), err?.response?.body?.errors);
    }

    ctx.status = err.status || 500;
    ctx.body = { err: err.message };
    ctx.app.emit("error", err, ctx);
  }
};

export default errorHandlerMiddleware;
