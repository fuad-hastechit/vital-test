import Shopify from "@shopify/shopify-api";

import { AppSession } from "@models";

async function storeCallback(session) {
  const result = await AppSession.updateOne(
    {
      shop: session.shop,
    },
    {
      ...session,
    },
    {
      upsert: true,
    }
  );

  if (result) {
    return true;
  } else {
    return false;
  }
}

async function loadCallback(sessionId) {
  const result = await AppSession.findOne({ id: sessionId });
  return result?._doc;
}

async function deleteCallback(id) {
  try {
    await AppSession.deleteOne({ id });
    return true;
  } catch (err) {
    throw new Error(err);
  }
}

const customSessionStorage = new Shopify.Session.CustomSessionStorage(
  storeCallback,
  loadCallback,
  deleteCallback
);

export default customSessionStorage;
