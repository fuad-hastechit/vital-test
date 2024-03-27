import mongoose from "mongoose";

const { Schema } = mongoose;

const shopSchema = new Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      default: null,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    homePageSchemeMetaDataId: Number,
    homePageSchemaStatus: {
      type: Boolean,
      default: false,
    },
    sitelinksSchemaStatus: {
      type: Boolean,
      default: false,
    },
    collectionPageSchemaStatus: {
      type: Boolean,
      default: false,
    },
    productPageSchemaStatus: {
      type: Boolean,
      default: false,
    },
    articlePageSchemaStatus: {
      type: Boolean,
      default: false,
    },
    blogPageSchemaStatus: {
      type: Boolean,
      default: false,
    },
    faqSchemaStatus: {
      type: Boolean,
      default: false,
    },
    carouselSchemaStatus: {
      type: Boolean,
      default: false,
    },
    planName: {
      type: String,
      default: null,
    },
    planPricing: {
      type: String,
      default: null,
    },
    willCreateNecessaryWebhook: {
      type: Boolean,
      default: false,
    },
    isUnInstalled: Boolean,
    unInstalledDate: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Shop", shopSchema);
