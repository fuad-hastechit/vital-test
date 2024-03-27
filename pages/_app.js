import { useEffect, useContext, useState, useCallback, useRef } from "react";
import {onCLS, onFID, onLCP} from 'web-vitals';
import App from "next/app";
import {
  AppProvider,
  Spinner,
  Frame,
  Tabs,
  Icon,
  Stack,
  Button,
} from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import { Base64 } from "js-base64";
import { useRouter } from "next/router";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import useSWR from "swr";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";

import { History } from "@shopify/app-bridge/actions";

import FooterWrap from "@components/FooterWrap";

import {
  HomeMajor,
  ProfileMajor,
  StoreMinor,
  CashDollarMajor,
  QuestionMarkMajor,
  AutomationMajor,
} from "@shopify/polaris-icons";

import "css/styles.css";
import "scss/styles.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ContextProvider, { MainContext } from "@components/Provider";

import axiosAuth from "@utils/axiosAuth";

import { useShopMetadataQuery } from "@hooks/index";

import Plan from "./plan";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function VerifyWrapper(props) {
  const tawkMessengerRef = useRef();
  const router = useRouter();
  const app = useAppBridge();
  const history = History.create(app);
  const axios = axiosAuth();
  const [isNew, setIsNew] = useState(true);
  const mainContext = useContext(MainContext);
  const {
    planName,
    setPlanName,
    setPlanPricing,
    appInitialDataLoaded,
    setAppInitialDataLoaded,
    setHost,
    setHomePageDataHandler,
    shopName,
    setShopName,
    setStoreDomain,
    embedBlockStatus,
    setEmbedBlockStatus,
    setPasswordProtectionStatus,
    setIsReviewModalShown,
    setIsReviewBannerClosed,
  } = mainContext;
  const { Component, host } = props;

  const [selectedTab, setSelectedTab] = useState(0);
  const [urlPathName, setUrlPathName] = useState(null);

  const tabsData = [
    {
      id: "id0",
      href: "/",
      content: (
        <Stack spacing="tight">
          <Icon source={HomeMajor} color="base" />
          <span>Dashboard</span>
        </Stack>
      ),
    },
    {
      id: "id1",
      href: "/shop_details",
      content: (
        <Stack spacing="tight">
          <Icon source={StoreMinor} color="base" />
          <span>Shop Details</span>
        </Stack>
      ),
    },
    {
      id: "id2",
      href: "/social_profiles",
      content: (
        <Stack spacing="tight">
          <Icon source={ProfileMajor} color="base" />
          <span>Social Profiles</span>
        </Stack>
      ),
    },
    {
      id: "id3",
      href: "/test_schema",
      content: (
        <Stack spacing="tight">
          <Icon source={AutomationMajor} color="base" />
          <span>Test Schema</span>
        </Stack>
      ),
    },
    {
      id: "id4",
      href: "/plan",
      content: (
        <Stack spacing="tight">
          <Icon source={CashDollarMajor} color="base" />
          <span>Pricing Plan</span>
        </Stack>
      ),
    },
    {
      id: "id5",
      href: "/help",
      content: (
        <Stack spacing="tight">
          <Icon source={QuestionMarkMajor} color="base" />
          <span>Help</span>
        </Stack>
      ),
    },
  ];

  const tawkOnLoad = useCallback(() => {
    const tawkCustomAttribute = {
      "App Name": "8ta-8d331m",
      "Store URL": "gtyorpj6ie",
      Plan: "s4m5uhqwq4",
    };

    tawkMessengerRef.current.setAttributes({
      [tawkCustomAttribute["App Name"]]: "Rich Snippets for SEO",
      [tawkCustomAttribute["Store URL"]]: shopName,
      [tawkCustomAttribute.Plan]: planName,
    });
  }, [planName, shopName]);

  const handleTabChange = useCallback(
    (selectedTabIndex) => {
      router.push({
        pathname: tabsData[selectedTabIndex].href,
        query: {
          shop: shopName,
          host,
        },
      });
      setSelectedTab(selectedTabIndex);
    },
    [router, tabsData, shopName, host]
  );

  useEffect(() => {
    const isNewQueryParams =
      // eslint-disable-next-line node/no-unsupported-features/node-builtins
      new URLSearchParams(window.location.search).get("is_new") === "true";
    setIsNew(isNewQueryParams);
  }, []);

  useEffect(() => {
    if (urlPathName !== window.location.pathname) {
      setUrlPathName(window.location.pathname);
      const matchedTabIndex = tabsData.findIndex(
        (singleTab) => singleTab.href === window.location.pathname
      );
      if (matchedTabIndex !== -1) setSelectedTab(matchedTabIndex);
    }
  }, [tabsData, urlPathName]);

  useEffect(() => {
    history.dispatch(History.Action.REPLACE, window.location.pathname);
  }, [history]);

  useEffect(() => {
    if (host) {
      setHost(host);
    }
  }, [host, setHost]);

  useEffect(() => {
    if (!appInitialDataLoaded) {
      (async function () {
        try {
          const [
            { data: planData },
            { data: homePageData },
          ] = await Promise.all([
            axios.get("/api/get_plan_details"),
            axios.get("/api/get_home_page_data"),
          ]);
          setAppInitialDataLoaded(true);
          setHomePageDataHandler(homePageData);
          const {
            planName: planNameRes,
            activeChargePrice,
            shopName: shopNameRes,
          } = planData;

          setPlanPricing(activeChargePrice);
          setShopName(shopNameRes);
          setPlanName(planNameRes);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [
    appInitialDataLoaded,
    axios,
    setAppInitialDataLoaded,
    setHomePageDataHandler,
    setPlanName,
    setPlanPricing,
    setShopName,
  ]);

  const { data: responseData } = useSWR(
    ["check_app_embedded_status", "check_store_password_protection"],
    async () => {
      const [
        embeddedStatusResponse,
        passwordProtectionResponse,
      ] = await Promise.all([
        axios.get("/api/check_app_embedded_status"),
        axios.get("/api/check_store_password_protection"),
      ]);

      return {
        embedBlockStatus: embeddedStatusResponse.data.embedBlockStatus,
        passwordProtectionStatus:
          passwordProtectionResponse.data.isPasswordProtected,
        storeDomain: passwordProtectionResponse.data.domain,
      };
    }
  );

  useEffect(() => {
    if (responseData) {
      setEmbedBlockStatus(responseData.embedBlockStatus);
      setPasswordProtectionStatus(responseData.passwordProtectionStatus);
      setStoreDomain(responseData.storeDomain);
    }
  }, [
    responseData,
    setEmbedBlockStatus,
    setPasswordProtectionStatus,
    setStoreDomain,
  ]);

  const {
    data: shopMetadata,
    isLoading: isShopMetadataLoading,
  } = useShopMetadataQuery();

  if (!appInitialDataLoaded || !embedBlockStatus || isShopMetadataLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner
          accessibilityLabel="Spinner example"
          size="large"
          color="teal"
        />
      </div>
    );
  }

  setIsReviewModalShown(shopMetadata?.isReviewModalShown ?? false);
  setIsReviewBannerClosed(shopMetadata?.isReviewBannerClosed ?? false);

  return (
    <>
      {!isNew && (
        <>
          <div style={{ position: "relative" }}>
            <Tabs
              tabs={tabsData}
              selected={selectedTab}
              onSelect={handleTabChange}
            />
            <div className="support-button">
              <a
                style={{ textDecoration: "auto" }}
                href={`https://gropulse.com/contact?app_name=${encodeURIComponent(
                  "Rich Snippets"
                )}&store_name=${encodeURIComponent(shopName)}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button primary>
                  Contact Support{" "}
                  <span role="img" aria-label="blessed">
                    😊
                  </span>
                </Button>
              </a>
            </div>
          </div>
          <br />
        </>
      )}
      <TawkMessengerReact
        propertyId="647470fa74285f0ec46e3096"
        widgetId="1h1jg1m2u"
        ref={tawkMessengerRef}
        onLoad={tawkOnLoad}
      />

      {planName ? <Component {...props} /> : <Plan {...props} />}

      {/* footer help */}
      <FooterWrap shopName={shopName} />
    </>
  );
}

function MiddleComponents({ Component, host, pageProps }) {
  const mainContext = useContext(MainContext);
  const { setHost, host: providerHost } = mainContext;

  useEffect(() => {
    if (host) {
      setHost(host);
    }
  }, [host, setHost]);

  return (
    <Provider
      config={{
        // eslint-disable-next-line no-undef
        apiKey: API_KEY,
        host: host || providerHost,
        forceRedirect: true,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Frame>
          <VerifyWrapper
            Component={Component}
            host={host || providerHost}
            {...pageProps}
          />
        </Frame>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

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
          <MiddleComponents
            Component={Component}
            pageProps={pageProps}
            host={host}
          />
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
