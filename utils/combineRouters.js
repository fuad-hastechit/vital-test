import Router from "koa-router";

const combineRouters = function (...routersList) {
  const router = new Router();

  routersList.forEach((singleRouter) => {
    router.use(singleRouter.routes()).use(singleRouter.allowedMethods());
  });
  return router;
};

export default combineRouters;
