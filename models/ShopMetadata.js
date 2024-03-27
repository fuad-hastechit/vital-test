import mongoose from "mongoose";

const { Schema } = mongoose;

const shopMetadataSchema = new Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    isReviewModalShown: {
      type: Boolean,
      default: false,
    },
    isReviewBannerClosed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ShopMetadata", shopMetadataSchema);
