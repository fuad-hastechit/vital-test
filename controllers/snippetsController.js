// import { JSDOM } from "jsdom";
import { Shop } from "@models";

// import {
//   HOME_PAGE_SCHEMA_SNIPPETS_NAME,
//   PRODUCT_PAGE_SCHEMA_SNIPPETS_NAME,
//   COLLECTION_PAGE_SCHEMA_SNIPPETS_NAME,
//   ARTICLE_PAGE_SCHEMA_SNIPPETS_NAME,
//   BLOG_PAGE_SCHEMA_SNIPPETS_NAME,
// } from "@utils/allStrings";

// import {
//   homePageSchema,
//   productPageSchema,
//   collectionPageSchema,
//   articlePageSchema,
//   blogPageSchema,
// } from "@utils/schema";

// import {
//   getHomePageSchemaRender,
//   getProductPageSchemaRender,
//   getCollectionPageSchemaRender,
//   getArticlePageSchemaRender,
//   getBlogPageSchemaRender,
// } from "@utils/getRenderCode";

export const getHomePageData = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  const shop = await Shop.findOne({ shopName }, [
    "homePageSchemeMetaDataId",
    "homePageSchemaStatus",
    "sitelinksSchemaStatus",
    "collectionPageSchemaStatus",
    "productPageSchemaStatus",
    "articlePageSchemaStatus",
    "blogPageSchemaStatus",
    "faqSchemaStatus",
    "carouselSchemaStatus",
  ]);

  // const { homePageSchemeMetaDataId } = shop;

  const {
    homePageSchemeMetaDataId,
    homePageSchemaStatus,
    sitelinksSchemaStatus,
    collectionPageSchemaStatus,
    productPageSchemaStatus,
    articlePageSchemaStatus,
    blogPageSchemaStatus,
    faqSchemaStatus,
    carouselSchemaStatus,
  } = shop;

  // const themesList = await shopify.theme.list({
  //   role: "main",
  //   fields: ["id", "role"],
  // });

  // const activeTheme = themesList.find((e) => e.role === "main");

  // const { value: themeCode } = await shopify.asset.get(activeTheme.id, {
  //   "asset[key]": "layout/theme.liquid",
  // });

  // let homePageSchemaStatus = false;
  // let collectionPageSchemaStatus = false;
  // let productPageSchemaStatus = false;
  // let articlePageSchemaStatus = false;
  // let blogPageSchemaStatus = false;

  // if (themeCode.includes(getHomePageSchemaRender())) {
  //   homePageSchemaStatus = shop.homePageSchemaStatus;
  // }
  // if (themeCode.includes(getCollectionPageSchemaRender())) {
  //   collectionPageSchemaStatus = shop.collectionPageSchemaStatus;
  // }
  // if (themeCode.includes(getProductPageSchemaRender())) {
  //   productPageSchemaStatus = shop.productPageSchemaStatus;
  // }
  // if (themeCode.includes(getArticlePageSchemaRender())) {
  //   articlePageSchemaStatus = shop.articlePageSchemaStatus;
  // }
  // if (themeCode.includes(getBlogPageSchemaRender())) {
  //   blogPageSchemaStatus = shop.blogPageSchemaStatus;
  // }

  if (!homePageSchemeMetaDataId) {
    ctx.body = {
      homePageData: false,
      homePageSchemaStatus,
      sitelinksSchemaStatus,
      collectionPageSchemaStatus,
      productPageSchemaStatus,
      articlePageSchemaStatus,
      blogPageSchemaStatus,
      faqSchemaStatus,
      carouselSchemaStatus,
    };
    return;
  }

  try {
    const resMetaData = await shopify.metafield.get(homePageSchemeMetaDataId);
    ctx.body = {
      homePageData: JSON.parse(resMetaData.value),
      homePageSchemaStatus,
      sitelinksSchemaStatus,
      collectionPageSchemaStatus,
      productPageSchemaStatus,
      articlePageSchemaStatus,
      blogPageSchemaStatus,
      faqSchemaStatus,
      carouselSchemaStatus,
    };
    return;
  } catch (err) {
    ctx.body = {
      homePageData: false,
      homePageSchemaStatus,
      sitelinksSchemaStatus,
      collectionPageSchemaStatus,
      productPageSchemaStatus,
      articlePageSchemaStatus,
      blogPageSchemaStatus,
      faqSchemaStatus,
      carouselSchemaStatus,
    };
  }
};

export const saveHomePageSchema = async (ctx) => {
  const { shop: shopName, shopify } = ctx;
  const { homePageSchema: homePageSchemaData } = ctx.request.body;

  // const themesList = await shopify.theme.list({
  //   role: "main",
  //   fields: ["id", "role"],
  // });

  // const activeTheme = themesList.find((e) => e.role === "main");

  const [resData] = await Promise.all([
    shopify.metafield.create({
      key: "json_ld",
      value: JSON.stringify(homePageSchemaData),
      type: "json",
      namespace: "gropulse_rich_snippets",
      owner_resource: "shop",
    }),
    // shopify.asset.create(activeTheme.id, {
    //   key: HOME_PAGE_SCHEMA_SNIPPETS_NAME,
    //   value: homePageSchema,
    // }),
  ]);

  await Shop.updateOne({ shopName }, { homePageSchemeMetaDataId: resData.id });

  ctx.body = { msg: "Successfully Saved!", data: resData };
};

export const saveFAQSchemaData = async (ctx) => {
  const { shop: shopName, shopify } = ctx;
  const faqSchemaData = ctx.request.body;

  const { homePageSchemeMetaDataId } = await Shop.findOne({ shopName }, [
    "homePageSchemeMetaDataId",
  ]);

  try {
    const metafieldData = await shopify.metafield.get(homePageSchemeMetaDataId);
    const existingData = JSON.parse(metafieldData.value);

    const updatedData = {
      ...existingData,
      faqData: faqSchemaData,
    };

    await shopify.metafield.update(homePageSchemeMetaDataId, {
      value: JSON.stringify(updatedData),
    });
  } catch (err) {
    const resData = await shopify.metafield.create({
      key: "json_ld",
      value: JSON.stringify({ faqData: [faqSchemaData] }),
      type: "json",
      namespace: "gropulse_rich_snippets",
      owner_resource: "shop",
    });

    await Shop.updateOne(
      { shopName },
      { homePageSchemeMetaDataId: resData.id }
    );
  }

  ctx.body = { msg: "Successfully Saved!", data: faqSchemaData };
};

export const enableHomePageSchema = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  // const themesList = await shopify.theme.list({
  //   role: "main",
  //   fields: ["id", "role"],
  // });

  // const activeTheme = themesList.find((e) => e.role === "main");

  const promiseData = [];

  promiseData.push(
    ...[
      // shopify.asset.get(activeTheme.id, {
      //   "asset[key]": "layout/theme.liquid",
      // }),
      // shopify.asset.create(activeTheme.id, {
      //   key: HOME_PAGE_SCHEMA_SNIPPETS_NAME,
      //   value: homePageSchema,
      // }),
      shopify.metafield.create({
        key: "home_page_schema_status",
        value: "enabled",
        type: "single_line_text_field",
        namespace: "gropulse_rich_snippets",
        owner_resource: "shop",
      }),
      Shop.updateOne({ shopName }, { homePageSchemaStatus: true }),
    ]
  );

  // const [{ value: themeCode }] = await Promise.all(promiseData);
  await Promise.all(promiseData);

  // let updatedThemeCode = themeCode;

  // if (!updatedThemeCode.includes(getHomePageSchemaRender())) {
  //   updatedThemeCode = updatedThemeCode.replace(
  //     /<\/head.*>/,
  //     `${getHomePageSchemaRender()} \n </head>`
  //   );
  //   await shopify.asset.update(activeTheme.id, {
  //     key: "layout/theme.liquid",
  //     value: updatedThemeCode,
  //   });
  // }

  ctx.body = { msg: "Successfully Saved!" };
};

export const disabledHomePageSchema = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  // const themesList = await shopify.theme.list({
  //   role: "main",
  //   fields: ["id", "role"],
  // });

  // const activeTheme = themesList.find((e) => e.role === "main");

  // const { value: themeCode } = await shopify.asset.get(activeTheme.id, {
  //   "asset[key]": "layout/theme.liquid",
  // });

  // let updatedThemeCode = themeCode;

  // Render gtm head snippets on the theme.liquid
  // if (updatedThemeCode.includes(getHomePageSchemaRender())) {
  //   updatedThemeCode = updatedThemeCode.replace(getHomePageSchemaRender(), "");
  //   await shopify.asset.update(activeTheme.id, {
  //     key: "layout/theme.liquid",
  //     value: updatedThemeCode,
  //   });
  // }

  await Promise.all([
    // shopify.asset.delete(activeTheme.id, {
    //   "asset[key]": HOME_PAGE_SCHEMA_SNIPPETS_NAME,
    // }),
    shopify.metafield.create({
      key: "home_page_schema_status",
      value: "disabled",
      type: "single_line_text_field",
      namespace: "gropulse_rich_snippets",
      owner_resource: "shop",
    }),
    Shop.updateOne({ shopName }, { homePageSchemaStatus: false }),
  ]);

  ctx.body = { msg: "Successfully Saved!" };
};

export const enableProductPageSchema = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  // const themesList = await shopify.theme.list({
  //   role: "main",
  //   fields: ["id", "role"],
  // });

  // const activeTheme = themesList.find((e) => e.role === "main");

  const promiseData = [];

  promiseData.push(
    ...[
      // shopify.asset.get(activeTheme.id, {
      //   "asset[key]": "layout/theme.liquid",
      // }),
      // shopify.asset.create(activeTheme.id, {
      //   key: PRODUCT_PAGE_SCHEMA_SNIPPETS_NAME,
      //   value: productPageSchema,
      // }),
      shopify.metafield.create({
        key: "product_page_schema_status",
        value: "enabled",
        type: "single_line_text_field",
        namespace: "gropulse_rich_snippets",
        owner_resource: "shop",
      }),
      Shop.updateOne({ shopName }, { productPageSchemaStatus: true }),
    ]
  );

  // const [{ value: themeCode }] = await Promise.all(promiseData);
  await Promise.all(promiseData);

  // let updatedThemeCode = themeCode;

  // if (!updatedThemeCode.includes(getProductPageSchemaRender())) {
  //   updatedThemeCode = updatedThemeCode.replace(
  //     /<\/head.*>/,
  //     `${getProductPageSchemaRender()} \n </head>`
  //   );
  //   await shopify.asset.update(activeTheme.id, {
  //     key: "layout/theme.liquid",
  //     value: updatedThemeCode,
  //   });
  // }

  ctx.body = { msg: "Successfully Saved!" };
};

export const disabledProductPageSchema = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  // const themesList = await shopify.theme.list({
  //   role: "main",
  //   fields: ["id", "role"],
  // });

  // const activeTheme = themesList.find((e) => e.role === "main");

  // const { value: themeCode } = await shopify.asset.get(activeTheme.id, {
  //   "asset[key]": "layout/theme.liquid",
  // });

  // let updatedThemeCode = themeCode;

  // remove snippets on the theme.liquid
  // if (updatedThemeCode.includes(getProductPageSchemaRender())) {
  //   updatedThemeCode = updatedThemeCode.replace(
  //     getProductPageSchemaRender(),
  //     ""
  //   );
  //   await shopify.asset.update(activeTheme.id, {
  //     key: "layout/theme.liquid",
  //     value: updatedThemeCode,
  //   });
  // }

  await Promise.all([
    // shopify.asset.delete(activeTheme.id, {
    //   "asset[key]": PRODUCT_PAGE_SCHEMA_SNIPPETS_NAME,
    // }),
    shopify.metafield.create({
      key: "product_page_schema_status",
      value: "disabled",
      type: "single_line_text_field",
      namespace: "gropulse_rich_snippets",
      owner_resource: "shop",
    }),
    Shop.updateOne({ shopName }, { productPageSchemaStatus: false }),
  ]);

  ctx.body = { msg: "Successfully Saved!" };
};

export const enableCollectionPageSchema = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  // const themesList = await shopify.theme.list({
  //   role: "main",
  //   fields: ["id", "role"],
  // });

  // const activeTheme = themesList.find((e) => e.role === "main");

  const promiseData = [];

  promiseData.push(
    ...[
      // shopify.asset.get(activeTheme.id, {
      //   "asset[key]": "layout/theme.liquid",
      // }),
      // shopify.asset.create(activeTheme.id, {
      //   key: COLLECTION_PAGE_SCHEMA_SNIPPETS_NAME,
      //   value: collectionPageSchema,
      // }),
      shopify.metafield.create({
        key: "collection_page_schema_status",
        value: "enabled",
        type: "single_line_text_field",
        namespace: "gropulse_rich_snippets",
        owner_resource: "shop",
      }),
      Shop.updateOne({ shopName }, { collectionPageSchemaStatus: true }),
    ]
  );

  // const [{ value: themeCode }] = await Promise.all(promiseData);
  await Promise.all(promiseData);

  // let updatedThemeCode = themeCode;

  // if (!updatedThemeCode.includes(getCollectionPageSchemaRender())) {
  //   updatedThemeCode = updatedThemeCode.replace(
  //     /<\/head.*>/,
  //     `${getCollectionPageSchemaRender()} \n </head>`
  //   );
  //   await shopify.asset.update(activeTheme.id, {
  //     key: "layout/theme.liquid",
  //     value: updatedThemeCode,
  //   });
  // }

  ctx.body = { msg: "Successfully Saved!" };
};

export const disabledCollectionPageSchema = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  // const themesList = await shopify.theme.list({
  //   role: "main",
  //   fields: ["id", "role"],
  // });

  // const activeTheme = themesList.find((e) => e.role === "main");

  // const { value: themeCode } = await shopify.asset.get(activeTheme.id, {
  //   "asset[key]": "layout/theme.liquid",
  // });

  // let updatedThemeCode = themeCode;

  // Remove snippets from the theme.liquid
  // if (updatedThemeCode.includes(getCollectionPageSchemaRender())) {
  //   updatedThemeCode = updatedThemeCode.replace(
  //     getCollectionPageSchemaRender(),
  //     ""
  //   );
  //   await shopify.asset.update(activeTheme.id, {
  //     key: "layout/theme.liquid",
  //     value: updatedThemeCode,
  //   });
  // }

  await Promise.all([
    // shopify.asset.delete(activeTheme.id, {
    //   "asset[key]": COLLECTION_PAGE_SCHEMA_SNIPPETS_NAME,
    // }),
    shopify.metafield.create({
      key: "collection_page_schema_status",
      value: "disabled",
      type: "single_line_text_field",
      namespace: "gropulse_rich_snippets",
      owner_resource: "shop",
    }),
    Shop.updateOne({ shopName }, { collectionPageSchemaStatus: false }),
  ]);

  ctx.body = { msg: "Successfully Saved!" };
};

export const enableArticlePageSchema = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  // const themesList = await shopify.theme.list({
  //   role: "main",
  //   fields: ["id", "role"],
  // });

  // const activeTheme = themesList.find((e) => e.role === "main");

  const promiseData = [];

  promiseData.push(
    ...[
      // shopify.asset.get(activeTheme.id, {
      //   "asset[key]": "layout/theme.liquid",
      // }),
      // shopify.asset.create(activeTheme.id, {
      //   key: ARTICLE_PAGE_SCHEMA_SNIPPETS_NAME,
      //   value: articlePageSchema,
      // }),
      shopify.metafield.create({
        key: "article_page_schema_status",
        value: "enabled",
        type: "single_line_text_field",
        namespace: "gropulse_rich_snippets",
        owner_resource: "shop",
      }),
      Shop.updateOne({ shopName }, { articlePageSchemaStatus: true }),
    ]
  );

  // const [{ value: themeCode }] = await Promise.all(promiseData);
  await Promise.all(promiseData);

  // let updatedThemeCode = themeCode;

  // if (!updatedThemeCode.includes(getArticlePageSchemaRender())) {
  //   updatedThemeCode = updatedThemeCode.replace(
  //     /<\/head.*>/,
  //     `${getArticlePageSchemaRender()} \n </head>`
  //   );
  //   await shopify.asset.update(activeTheme.id, {
  //     key: "layout/theme.liquid",
  //     value: updatedThemeCode,
  //   });
  // }

  ctx.body = { msg: "Successfully Saved!" };
};

export const disabledArticlePageSchema = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  // const themesList = await shopify.theme.list({
  //   role: "main",
  //   fields: ["id", "role"],
  // });

  // const activeTheme = themesList.find((e) => e.role === "main");

  // const { value: themeCode } = await shopify.asset.get(activeTheme.id, {
  //   "asset[key]": "layout/theme.liquid",
  // });

  // let updatedThemeCode = themeCode;

  // Remove snippets from the theme.liquid
  // if (updatedThemeCode.includes(getArticlePageSchemaRender())) {
  //   updatedThemeCode = updatedThemeCode.replace(
  //     getArticlePageSchemaRender(),
  //     ""
  //   );
  //   await shopify.asset.update(activeTheme.id, {
  //     key: "layout/theme.liquid",
  //     value: updatedThemeCode,
  //   });
  // }

  await Promise.all([
    // shopify.asset.delete(activeTheme.id, {
    //   "asset[key]": ARTICLE_PAGE_SCHEMA_SNIPPETS_NAME,
    // }),
    shopify.metafield.create({
      key: "article_page_schema_status",
      value: "disabled",
      type: "single_line_text_field",
      namespace: "gropulse_rich_snippets",
      owner_resource: "shop",
    }),
    Shop.updateOne({ shopName }, { articlePageSchemaStatus: false }),
  ]);

  ctx.body = { msg: "Successfully Saved!" };
};

export const enableBlogPageSchema = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  // const themesList = await shopify.theme.list({
  //   role: "main",
  //   fields: ["id", "role"],
  // });

  // const activeTheme = themesList.find((e) => e.role === "main");

  const promiseData = [];

  promiseData.push(
    ...[
      // shopify.asset.get(activeTheme.id, {
      //   "asset[key]": "layout/theme.liquid",
      // }),
      // shopify.asset.create(activeTheme.id, {
      //   key: BLOG_PAGE_SCHEMA_SNIPPETS_NAME,
      //   value: blogPageSchema,
      // }),
      shopify.metafield.create({
        key: "blog_page_schema_status",
        value: "enabled",
        type: "single_line_text_field",
        namespace: "gropulse_rich_snippets",
        owner_resource: "shop",
      }),
      Shop.updateOne({ shopName }, { blogPageSchemaStatus: true }),
    ]
  );

  // const [{ value: themeCode }] = await Promise.all(promiseData);
  await Promise.all(promiseData);

  // let updatedThemeCode = themeCode;

  // if (!updatedThemeCode.includes(getBlogPageSchemaRender())) {
  //   updatedThemeCode = updatedThemeCode.replace(
  //     /<\/head.*>/,
  //     `${getBlogPageSchemaRender()} \n </head>`
  //   );
  //   await shopify.asset.update(activeTheme.id, {
  //     key: "layout/theme.liquid",
  //     value: updatedThemeCode,
  //   });
  // }

  ctx.body = { msg: "Successfully Saved!" };
};

export const disabledBlogPageSchema = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  // const themesList = await shopify.theme.list({
  //   role: "main",
  //   fields: ["id", "role"],
  // });

  // const activeTheme = themesList.find((e) => e.role === "main");

  // const { value: themeCode } = await shopify.asset.get(activeTheme.id, {
  //   "asset[key]": "layout/theme.liquid",
  // });

  // let updatedThemeCode = themeCode;

  // Remove snippets from the theme.liquid
  // if (updatedThemeCode.includes(getBlogPageSchemaRender())) {
  //   updatedThemeCode = updatedThemeCode.replace(getBlogPageSchemaRender(), "");
  //   await shopify.asset.update(activeTheme.id, {
  //     key: "layout/theme.liquid",
  //     value: updatedThemeCode,
  //   });
  // }

  await Promise.all([
    // shopify.asset.delete(activeTheme.id, {
    //   "asset[key]": BLOG_PAGE_SCHEMA_SNIPPETS_NAME,
    // }),
    shopify.metafield.create({
      key: "blog_page_schema_status",
      value: "disabled",
      type: "single_line_text_field",
      namespace: "gropulse_rich_snippets",
      owner_resource: "shop",
    }),
    Shop.updateOne({ shopName }, { blogPageSchemaStatus: false }),
  ]);

  ctx.body = { msg: "Successfully Saved!" };
};

export const updateFAQSchemaStatus = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  const { status } = ctx.request.body;

  await Promise.all([
    shopify.metafield.create({
      key: "faq_schema_status",
      value: status ? "enabled" : "disabled",
      type: "single_line_text_field",
      namespace: "gropulse_rich_snippets",
      owner_resource: "shop",
    }),
    Shop.updateOne({ shopName }, { faqSchemaStatus: status }, { upsert: true }),
  ]);

  ctx.body = { msg: `Successfully ${status ? "Enabled" : "Disabled"}!` };
};

export const updateSitelinksSchemaStatus = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  const { status } = ctx.request.body;

  await Promise.all([
    shopify.metafield.create({
      key: "sitelinks_searchbox_schema_status",
      value: status ? "enabled" : "disabled",
      type: "single_line_text_field",
      namespace: "gropulse_rich_snippets",
      owner_resource: "shop",
    }),
    Shop.updateOne(
      { shopName },
      { sitelinksSchemaStatus: status },
      { upsert: true }
    ),
  ]);

  ctx.body = { msg: `Successfully ${status ? "Enabled" : "Disabled"}!` };
};

export const updateCarouselSchemaStatus = async (ctx) => {
  const { shop: shopName, shopify } = ctx;

  const { status } = ctx.request.body;

  await Promise.all([
    shopify.metafield.create({
      key: "carousel_schema_status",
      value: status ? "enabled" : "disabled",
      type: "single_line_text_field",
      namespace: "gropulse_rich_snippets",
      owner_resource: "shop",
    }),
    Shop.updateOne(
      { shopName },
      { carouselSchemaStatus: status },
      { upsert: true }
    ),
  ]);

  ctx.body = { msg: `Successfully ${status ? "Enabled" : "Disabled"}!` };
};

export const checkAppEmbeddedStatus = async (ctx) => {
  const { shopify } = ctx;

  const [activeTheme] = await shopify.theme.list({
    role: "main",
    fields: ["id", "role"],
  });

  const activeThemeSettingsJson = await shopify.asset.get(activeTheme.id, {
    "asset[key]": "config/settings_data.json",
  });

  const activeThemeSettingsJsonValue = JSON.parse(
    activeThemeSettingsJson.value
  );

  const activeThemeEmbedBlocks = activeThemeSettingsJsonValue?.current?.blocks;

  const embedBlockStatus = {
    isHeadCodeEnabled: false,
  };

  const activeThemeEmbedBlocksValues = Object.values(
    activeThemeEmbedBlocks || {}
  );

  for (let index = 0; index < activeThemeEmbedBlocksValues.length; index++) {
    const singleValue = activeThemeEmbedBlocksValues[index];

    if (singleValue.type.includes(process.env.SHOPIFY_THEME_APP_EXTENSION_ID)) {
      if (singleValue.type.includes("/gropulse-rich-snippets/")) {
        // change string here
        embedBlockStatus.isHeadCodeEnabled = !singleValue?.disabled;
      }
    }
  }

  ctx.response.status = 200;
  ctx.body = {
    embedBlockStatus,
  };
};

export const checkStorePasswordProtected = async (ctx) => {
  const { shopify } = ctx;

  const {
    password_enabled: isPasswordProtected,
    domain,
  } = await shopify.shop.get({
    fields: ["password_enabled", "domain"],
  });

  ctx.body = { isPasswordProtected, domain };
};
