import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";

const axiosAuth = () => {
  const app = useAppBridge();
  const instance = axios.create();
  instance.interceptors.request.use(function (config) {
    return getSessionToken(app) // requires an App Bridge instance
      .then((token) => {
        // append your request headers with an authenticated token
        config.headers.authorization = `Bearer ${token}`;
        return config;
      });
  });
  return instance;
};

export default axiosAuth;
