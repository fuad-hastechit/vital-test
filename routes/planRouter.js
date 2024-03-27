import Router from "koa-router";

import {
  getPlanDetails,
  subscribePlan,
  postCouponCodeCheck,
} from "@controllers/planController";

const router = new Router();

router.get("/get_plan_details", getPlanDetails);
router.post("/subscribe_plan", subscribePlan);

router.post("/coupon_code_check", postCouponCodeCheck);

export default router;
