import mongoose from "mongoose";

const { Schema } = mongoose;

const couponCodeSchema = new Schema(
  {
    discountCode: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    shopsList: {
      type: Array,
      required: true,
    },
    useLimit: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CouponCode", couponCodeSchema);
