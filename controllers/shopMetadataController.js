import { ShopMetadata } from "@models";

export const getShopMetadata = async (ctx) => {
  const { shop: shopName } = ctx;

  const shopMetadata = await ShopMetadata.findOne({ shopName }, [
    "isReviewModalShown",
    "isReviewBannerClosed",
  ]);

  ctx.response.status = 200;
  ctx.body = shopMetadata || {};
};

export const updateShopMetadata = async (ctx) => {
  const { shop: shopName } = ctx;

  if (!shopName) {
    return ctx.throw(400, "Please include shop name");
  }

  const { isReviewModalShown, isReviewBannerClosed } = ctx.request.body;

  let shopMetadata = await ShopMetadata.findOne({ shopName });

  if (!shopMetadata) {
    shopMetadata = new ShopMetadata({
      shopName,
      isReviewModalShown,
      isReviewBannerClosed,
    });

    shopMetadata = await shopMetadata.save();

    ctx.status = 201;
    ctx.body = shopMetadata;
    return;
  }

  if (isReviewModalShown !== undefined) {
    shopMetadata.isReviewModalShown = isReviewModalShown;
  }

  if (isReviewBannerClosed !== undefined) {
    shopMetadata.isReviewBannerClosed = isReviewBannerClosed;
  }

  const updatedShopMetadata = await shopMetadata.save();

  ctx.response.status = 200;
  ctx.body = updatedShopMetadata;
};
