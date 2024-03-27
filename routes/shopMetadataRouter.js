import Router from "koa-router";

import {
  getShopMetadata,
  updateShopMetadata,
} from "@controllers/shopMetadataController";

const router = new Router();

router.get("/shop_metadata", getShopMetadata);
router.patch("/shop_metadata", updateShopMetadata);

export default router;
