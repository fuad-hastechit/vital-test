import Router from "koa-router";

import {
  getHomePageData,
  saveHomePageSchema,
  saveFAQSchemaData,
  enableHomePageSchema,
  disabledHomePageSchema,
  enableProductPageSchema,
  disabledProductPageSchema,
  enableCollectionPageSchema,
  disabledCollectionPageSchema,
  disabledArticlePageSchema,
  disabledBlogPageSchema,
  enableArticlePageSchema,
  enableBlogPageSchema,
  checkAppEmbeddedStatus,
  checkStorePasswordProtected,
  updateFAQSchemaStatus,
  updateSitelinksSchemaStatus,
  updateCarouselSchemaStatus,
} from "@controllers/snippetsController";

const router = new Router();

router.get("/get_home_page_data", getHomePageData);
router.post("/save_home_page_schema", saveHomePageSchema);
router.post("/save_faq_schema_data", saveFAQSchemaData);

router.post("/enable_home_page_schema", enableHomePageSchema);
router.post("/disabled_home_page_schema", disabledHomePageSchema);
router.post("/enable_product_page_schema", enableProductPageSchema);
router.post("/disabled_product_page_schema", disabledProductPageSchema);
router.post("/enable_collection_page_schema", enableCollectionPageSchema);
router.post("/disabled_collection_page_schema", disabledCollectionPageSchema);
router.post("/enable_article_page_schema", enableArticlePageSchema);
router.post("/disabled_article_page_schema", disabledArticlePageSchema);
router.post("/enable_blog_page_schema", enableBlogPageSchema);
router.post("/disabled_blog_page_schema", disabledBlogPageSchema);
router.post("/update_faq_schema_status", updateFAQSchemaStatus);
router.post("/update_sitelinks_schema_status", updateSitelinksSchemaStatus);
router.post("/update_carousel_schema_status", updateCarouselSchemaStatus);

router.get("/check_app_embedded_status", checkAppEmbeddedStatus);
router.get("/check_store_password_protection", checkStorePasswordProtected);

export default router;
