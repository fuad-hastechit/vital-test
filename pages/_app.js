import { onLCP } from "web-vitals";
import App from "next/app";
import { AppProvider } from "@shopify/polaris";
import { Base64 } from "js-base64";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";

import "css/styles.css";
import "scss/styles.scss";

import ContextProvider from "@components/Provider";

class MyApp extends App {
  componentDidMount() {
    function sendToAnalytics(metric) {
      console.log("LCP: ", metric.value / 1000, " seconds");
      console.log("Metric: ", metric);
    }
    onLCP(sendToAnalytics);
  }

  render() {
    const { Component, pageProps, host } = this.props;

    return (
      <AppProvider i18n={translations}>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </AppProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    host:
      // eslint-disable-next-line no-undef
      NODE_ENV === "production"
        ? ctx.query.host
        : // eslint-disable-next-line no-undef
          ctx.query.host || Base64.encode(`${DEV_STORE}/admin`, true),
  };
};

export default MyApp;
