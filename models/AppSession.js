import mongoose from "mongoose";

const { Schema } = mongoose;

const AppSessionSchema = new Schema(
  {
    id: String,
    shop: String,
    state: String,
    scope: String,
    expires: String,
    isOnline: Boolean,
    accessToken: String,
    onlineAccessInfo: Object,
  },
  {
    timestamps: true,
  }
);

const AppSession = mongoose.model("AppSession", AppSessionSchema);

export default AppSession;
