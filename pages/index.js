import { useState, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { Page, Toast } from "@shopify/polaris";

import axiosAuth from "@utils/axiosAuth";
import { appFeature } from "@utils/appFeaturePlan";

import { MainContext } from "@components/Provider";
import {
  AppRecommendation,
  OnlineStoreTwoBanner,
  ReviewBanner,
  ReviewModal,
} from "@components/common";
import SchemaSettingCard from "@components/SchemaSettingCard";
import ProtectedStoreBanner from "@components/common/ProtectedStoreBanner";

// create a constant object for schema image urls
const imageUrls = {
  homePageSchema: "/images/home_page_schema.webp",
  sitelinksSchema: "/images/sitelink_searchbox_schema.webp",
  productPageSchema: "/images/product_page_schema.webp",
  collectionPageSchema: "/images/product_category_breadcrumb.webp",
  articlePageSchema: "/images/article_page_schema.webp",
  blogPageSchema: "/images/blog_page_schema.webp",
  faqSchema: "/images/faq_schema.webp",
  carouselSchema: "/images/carousel_schema.webp",
};

const Index = () => {
  const router = useRouter();
  const axios = axiosAuth();
  const [toast, setToast] = useState({ error: false, content: false });

  const mainContext = useContext(MainContext);

  const {
    shopName,
    host,
    planName,
    homePageSchemaStatus,
    setHomePageSchemaStatus,
    productPageSchemaStatus,
    setProductPageSchemaStatus,
    collectionPageSchemaStatus,
    setCollectionPageSchemaStatus,
    articlePageSchemaStatus,
    setArticlePageSchemaStatus,
    blogPageSchemaStatus,
    setBlogPageSchemaStatus,
    faqSchemaStatus,
    setFAQSchemaStatus,
    sitelinksSchemaStatus,
    setSitelinksSchemaStatus,
    carouselSchemaStatus,
    setCarouselSchemaStatus,
    passwordProtectionStatus,
    isReviewBannerClosed,
    isReviewModalShown,
    faqData,
  } = mainContext;

  const isHomePageSchemaRestricted = appFeature.homePageSchema.isFree
    ? false
    : planName === "free";

  const isSitelinksSchemaRestricted = appFeature.sitelinkSearchboxSchema.isFree
    ? false
    : planName === "free";

  const isProductPageSchemaRestricted = appFeature.productPageSchema.isFree
    ? false
    : planName === "free";

  const isCollectionPageSchemaRestricted = appFeature
    .productCategoryBreadcrumbSchema.isFree
    ? false
    : planName === "free";

  const isArticlePageSchemaRestricted = appFeature.articlePageSchema.isFree
    ? false
    : planName === "free";

  const isBlogPageSchemaRestricted = appFeature.blogPageSchema.isFree
    ? false
    : planName === "free";

  const isFAQSchemaRestricted = appFeature.faqSchema.isFree
    ? false
    : planName === "free";

  const isCarouselSchemaRestricted = appFeature.carouselSchema.isFree
    ? false
    : planName === "free";

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [message, setMessage] = useState("");

  const [
    homePageSchemaEnableLoading,
    setHomePageSchemaEnableLoading,
  ] = useState(false);
  const [
    homePageSchemaDisableLoading,
    setHomePageSchemaDisableLoading,
  ] = useState(false);
  const [
    productPageSchemaDisableLoading,
    setProductPageSchemaDisableLoading,
  ] = useState(false);
  const [
    productPageSchemaEnableLoading,
    setProductPageSchemaEnableLoading,
  ] = useState(false);
  const [
    collectionPageSchemaEnableLoading,
    setCollectionPageSchemaEnableLoading,
  ] = useState(false);
  const [
    collectionPageSchemaDisableLoading,
    setCollectionPageSchemaDisableLoading,
  ] = useState(false);

  const [
    articlePageSchemaEnableLoading,
    setArticlePageSchemaEnableLoading,
  ] = useState(false);

  const [
    articlePageSchemaDisableLoading,
    setArticlePageSchemaDisableLoading,
  ] = useState(false);

  const [
    blogPageSchemaEnableLoading,
    setBlogPageSchemaEnableLoading,
  ] = useState(false);

  const [
    blogPageSchemaDisableLoading,
    setBlogPageSchemaDisableLoading,
  ] = useState(false);

  const [faqSchemaUpdateLoading, setFAQSchemaUpdateLoading] = useState(false);

  const [
    sitelinksSchemaUpdateLoading,
    setSitelinksSchemaUpdateLoading,
  ] = useState(false);

  const [
    carouselSchemaUpdateLoading,
    setCarouselSchemaUpdateLoading,
  ] = useState(false);

  const showToastOrReviewModal = useCallback(
    (msg) => {
      setMessage(msg);
      if (!isReviewModalShown) {
        setShowReviewModal(true);
      } else {
        setToast({
          error: false,
          content: msg,
        });
      }
    },
    [isReviewModalShown]
  );

  const enableHomePageSchemaHandler = useCallback(() => {
    setHomePageSchemaEnableLoading(true);
    axios
      .post("/api/enable_home_page_schema")
      .then(() => {
        setHomePageSchemaStatus(true);
        showToastOrReviewModal("Home Page Schema Successfully Enabled!");
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => {
        setHomePageSchemaEnableLoading(false);
      });
  }, [axios, setHomePageSchemaStatus, showToastOrReviewModal]);

  const disableHomePageSchemaHandler = useCallback(() => {
    setHomePageSchemaDisableLoading(true);
    axios
      .post("/api/disabled_home_page_schema")
      .then(() => {
        setHomePageSchemaStatus(false);
        showToastOrReviewModal("Home Page Schema Successfully Disabled!");
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => {
        setHomePageSchemaDisableLoading(false);
      });
  }, [axios, setHomePageSchemaStatus, showToastOrReviewModal]);

  const enableProductPageSchemaHandler = useCallback(() => {
    setProductPageSchemaEnableLoading(true);
    axios
      .post("/api/enable_product_page_schema")
      .then(() => {
        setProductPageSchemaStatus(true);
        showToastOrReviewModal("Product Page Schema Successfully Enabled!");
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => {
        setProductPageSchemaEnableLoading(false);
      });
  }, [axios, setProductPageSchemaStatus, showToastOrReviewModal]);

  const disableProductPageSchemaHandler = useCallback(() => {
    setProductPageSchemaDisableLoading(true);
    axios
      .post("/api/disabled_product_page_schema")
      .then(() => {
        setProductPageSchemaStatus(false);
        showToastOrReviewModal("Product Page Schema Successfully Disabled!");
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => {
        setProductPageSchemaDisableLoading(false);
      });
  }, [axios, setProductPageSchemaStatus, showToastOrReviewModal]);

  const enableCollectionPageSchemaHandler = useCallback(() => {
    setCollectionPageSchemaEnableLoading(true);
    axios
      .post("/api/enable_collection_page_schema")
      .then(() => {
        setCollectionPageSchemaStatus(true);
        showToastOrReviewModal(
          "Category Breadcrumb Schema Successfully Enabled!"
        );
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => {
        setCollectionPageSchemaEnableLoading(false);
      });
  }, [axios, setCollectionPageSchemaStatus, showToastOrReviewModal]);

  const disableCollectionPageSchemaHandler = useCallback(() => {
    setCollectionPageSchemaDisableLoading(true);
    axios
      .post("/api/disabled_collection_page_schema")
      .then(() => {
        setCollectionPageSchemaStatus(false);
        showToastOrReviewModal(
          "Category Breadcrumb Schema Successfully Disabled!"
        );
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => {
        setCollectionPageSchemaDisableLoading(false);
      });
  }, [axios, setCollectionPageSchemaStatus, showToastOrReviewModal]);

  const enableArticlePageSchemaHandler = useCallback(() => {
    setArticlePageSchemaEnableLoading(true);
    axios
      .post("/api/enable_article_page_schema")
      .then(() => {
        setArticlePageSchemaStatus(true);
        showToastOrReviewModal("Article Page Schema Successfully Enabled!");
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => {
        setArticlePageSchemaEnableLoading(false);
      });
  }, [axios, setArticlePageSchemaStatus, showToastOrReviewModal]);

  const disableArticlePageSchemaHandler = useCallback(() => {
    setArticlePageSchemaDisableLoading(true);
    axios
      .post("/api/disabled_article_page_schema")
      .then(() => {
        setArticlePageSchemaStatus(false);
        showToastOrReviewModal("Article Page Schema Successfully Disabled!");
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => {
        setArticlePageSchemaDisableLoading(false);
      });
  }, [axios, setArticlePageSchemaStatus, showToastOrReviewModal]);

  const enableBlogPageSchemaHandler = useCallback(() => {
    setBlogPageSchemaEnableLoading(true);
    axios
      .post("/api/enable_blog_page_schema")
      .then(() => {
        setBlogPageSchemaStatus(true);
        showToastOrReviewModal("Blog Page Schema Successfully Enabled!");
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => {
        setBlogPageSchemaEnableLoading(false);
      });
  }, [axios, setBlogPageSchemaStatus, showToastOrReviewModal]);

  const disableBlogPageSchemaHandler = useCallback(() => {
    setBlogPageSchemaDisableLoading(true);
    axios
      .post("/api/disabled_blog_page_schema")
      .then(() => {
        setBlogPageSchemaStatus(false);
        showToastOrReviewModal("Blog Page Schema Successfully Disabled!");
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => {
        setBlogPageSchemaDisableLoading(false);
      });
  }, [axios, setBlogPageSchemaStatus, showToastOrReviewModal]);

  const updateFAQSchemaHandler = useCallback(() => {
    setFAQSchemaUpdateLoading(true);
    axios
      .post("/api/update_faq_schema_status", {
        status: !faqSchemaStatus,
      })
      .then((res) => {
        setFAQSchemaStatus(!faqSchemaStatus);
        showToastOrReviewModal(`
        FAQ Schema Successfully ${faqSchemaStatus ? "Disabled" : "Enabled"}!`);

        if (!faqSchemaStatus && faqData.length === 0) {
          setTimeout(() => {
            router.push({
              pathname: "/faq_schema",
              query: {
                shop: shopName,
                host,
              },
            });
          }, 1000);
        }
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => setFAQSchemaUpdateLoading(false));
  }, [
    axios,
    faqSchemaStatus,
    setFAQSchemaStatus,
    showToastOrReviewModal,
    faqData.length,
    router,
    shopName,
    host,
  ]);

  const updateSitelinksSchemaHandler = useCallback(() => {
    setSitelinksSchemaUpdateLoading(true);
    axios
      .post("/api/update_sitelinks_schema_status", {
        status: !sitelinksSchemaStatus,
      })
      .then((res) => {
        setSitelinksSchemaStatus(!sitelinksSchemaStatus);
        setMessage(
          `Sitelinks Searchbox Schema Successfully ${
            sitelinksSchemaStatus ? "Disabled" : "Enabled"
          }`
        );
        showToastOrReviewModal(
          `Sitelinks Searchbox Schema Successfully ${
            sitelinksSchemaStatus ? "Disabled" : "Enabled"
          }`
        );
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => setSitelinksSchemaUpdateLoading(false));
  }, [
    axios,
    sitelinksSchemaStatus,
    setSitelinksSchemaStatus,
    showToastOrReviewModal,
  ]);

  const updateCarouselSchemaHandler = useCallback(() => {
    setCarouselSchemaUpdateLoading(true);
    axios
      .post("/api/update_carousel_schema_status", {
        status: !carouselSchemaStatus,
      })
      .then((res) => {
        setCarouselSchemaStatus(!carouselSchemaStatus);
        showToastOrReviewModal(`
        Product Carousel Schema Successfully ${
          carouselSchemaStatus ? "Disabled" : "Enabled"
        }!`);
      })
      .catch((err) => {
        setToast({ error: true, content: err.message });
        console.log(err);
      })
      .finally(() => setCarouselSchemaUpdateLoading(false));
  }, [
    axios,
    carouselSchemaStatus,
    setCarouselSchemaStatus,
    showToastOrReviewModal,
  ]);

  return (
    <Page>
      {toast.content && (
        <Toast
          content={toast.content}
          error={toast.error}
          onDismiss={() => setToast({ error: false, content: false })}
        />
      )}
      {showReviewModal && <ReviewModal successMessage={message} />}
      {/* online store 2 banner */}
      <OnlineStoreTwoBanner />

      {/* password protection banner */}
      {passwordProtectionStatus ? (
        <ProtectedStoreBanner marginBottom="15px" />
      ) : (
        !isReviewBannerClosed && <ReviewBanner />
      )}

      <div className="flex flex-col">
        <SchemaSettingCard
          imgSrc={imageUrls.homePageSchema}
          imgAlt="home-page-schema"
          title="Home Page Schema"
          description="Add your shop details like brand name, logo, founders names, social profiles. So Google can provide detailed information about your shop."
          status={homePageSchemaStatus}
          enableLoading={homePageSchemaEnableLoading}
          disableLoading={homePageSchemaDisableLoading}
          onEnable={enableHomePageSchemaHandler}
          onDisable={disableHomePageSchemaHandler}
          isButtonDisabled={false}
          isProFeature={isHomePageSchemaRestricted}
          showHomePageInfo
        />

        <SchemaSettingCard
          imgSrc={imageUrls.sitelinksSchema}
          imgAlt="sitlinks-search-box-schema"
          title="Sitelinks search box Scheama"
          description="Add Google's Sitelinks search box which will improve user experience and navigation on your website. This feature allows visitors to search within your site from Google's results, finding relevant content and exploring your website seamlessly."
          status={sitelinksSchemaStatus}
          enableLoading={sitelinksSchemaUpdateLoading}
          disableLoading={sitelinksSchemaUpdateLoading}
          onEnable={updateSitelinksSchemaHandler}
          onDisable={updateSitelinksSchemaHandler}
          isButtonDisabled={false}
          isProFeature={isSitelinksSchemaRestricted}
        />

        <SchemaSettingCard
          imgSrc={imageUrls.productPageSchema}
          imgAlt="product-page-schema"
          title="Product Page Schema & Breadcrumb"
          description="Add markup to your product pages so Google can provide detailed product information in rich Search results including Google Images. Users can see price, availability, and ratings right on Search results."
          status={productPageSchemaStatus}
          enableLoading={productPageSchemaEnableLoading}
          disableLoading={productPageSchemaDisableLoading}
          onEnable={enableProductPageSchemaHandler}
          onDisable={disableProductPageSchemaHandler}
          isButtonDisabled={false}
          isProFeature={isProductPageSchemaRestricted}
        />

        <SchemaSettingCard
          imgSrc={imageUrls.collectionPageSchema}
          imgAlt="product-category-breadcrumb"
          title="Product Category Breadcrumb"
          description="A breadcrumb trail on a page indicates the page's position in the site hierarchy. Google Search uses breadcrumb markup in the body of a web page to categorize the Information from the page in search results."
          status={collectionPageSchemaStatus}
          enableLoading={collectionPageSchemaEnableLoading}
          disableLoading={collectionPageSchemaDisableLoading}
          onEnable={enableCollectionPageSchemaHandler}
          onDisable={disableCollectionPageSchemaHandler}
          isButtonDisabled={false}
          isProFeature={isCollectionPageSchemaRestricted}
        />
        <SchemaSettingCard
          imgSrc={imageUrls.articlePageSchema}
          imgAlt="article-page-schema"
          title="Article Page Schema"
          description="Add structured data to your article pages so Google can provide detailed information in rich Search results."
          status={articlePageSchemaStatus}
          enableLoading={articlePageSchemaEnableLoading}
          disableLoading={articlePageSchemaDisableLoading}
          onEnable={enableArticlePageSchemaHandler}
          onDisable={disableArticlePageSchemaHandler}
          isButtonDisabled={false}
          isProFeature={isArticlePageSchemaRestricted}
        />
        <SchemaSettingCard
          imgSrc={imageUrls.blogPageSchema}
          imgAlt="blog-page-schema"
          title="Blogs Page Schema"
          description="Add structured data to your blog pages so Google can provide detailed information in rich Search results."
          status={blogPageSchemaStatus}
          enableLoading={blogPageSchemaEnableLoading}
          disableLoading={blogPageSchemaDisableLoading}
          onEnable={enableBlogPageSchemaHandler}
          onDisable={disableBlogPageSchemaHandler}
          isButtonDisabled={false}
          isProFeature={isBlogPageSchemaRestricted}
        />
        <SchemaSettingCard
          imgSrc={imageUrls.faqSchema}
          imgAlt="faq-schema"
          title="FAQ Schema"
          description="Add FAQ structure data to enhance your website's visibility. This will help Google display frequently asked questions and their answers directly in search results, providing valuable information to users at a glance."
          status={faqSchemaStatus}
          enableLoading={faqSchemaUpdateLoading}
          disableLoading={faqSchemaUpdateLoading}
          onEnable={updateFAQSchemaHandler}
          onDisable={updateFAQSchemaHandler}
          isButtonDisabled={false}
          configurePage="/faq_schema"
          isProFeature={isFAQSchemaRestricted}
        />
        <SchemaSettingCard
          imgSrc={imageUrls.carouselSchema}
          imgAlt="carousel-schema"
          title="Product Carousel Schema"
          description="Add carousel schema to your website to display your products in a carousel format in Google search results."
          status={carouselSchemaStatus}
          enableLoading={carouselSchemaUpdateLoading}
          disableLoading={carouselSchemaUpdateLoading}
          onEnable={updateCarouselSchemaHandler}
          onDisable={updateCarouselSchemaHandler}
          isButtonDisabled={false}
          isProFeature={isCarouselSchemaRestricted}
        />
      </div>

      {/* <Layout>
        <Layout.AnnotatedSection
          title="Rich Snippet Schema Status"
          description="You can enable/disable different schemas from here"
        >
          <Layout.Section>
            <div className="schema-card-wrapper">
              <Card title="Home Page Schema" sectioned>
                {homePageSchemaStatus ? (
                  <Badge status="success">Enabled</Badge>
                ) : (
                  <Badge status="warning">Disabled</Badge>
                )}

                <TextStyle variation="subdued">
                  Add your shop details like brand name, logo, founders names,
                  social profiles. So Google can provide detailed information
                  about your shop.
                  <div style={{ marginTop: 20, marginBottom: 15 }}>
                    <Stack distribution="leading">
                      {homePageSchemaStatus ? (
                        <Button
                          onClick={disableHomePageSchemaHandler}
                          loading={homePageSchemaDisableLoading}
                          disabled={
                            homePageSchemaEnableLoading ||
                            productPageSchemaDisableLoading ||
                            productPageSchemaEnableLoading ||
                            collectionPageSchemaDisableLoading ||
                            collectionPageSchemaEnableLoading ||
                            articlePageSchemaDisableLoading ||
                            articlePageSchemaEnableLoading ||
                            blogPageSchemaDisableLoading ||
                            blogPageSchemaEnableLoading
                          }
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          primary
                          onClick={enableHomePageSchemaHandler}
                          loading={homePageSchemaEnableLoading}
                          disabled={
                            homePageSchemaDisableLoading ||
                            productPageSchemaDisableLoading ||
                            productPageSchemaEnableLoading ||
                            collectionPageSchemaDisableLoading ||
                            collectionPageSchemaEnableLoading ||
                            articlePageSchemaDisableLoading ||
                            articlePageSchemaEnableLoading ||
                            blogPageSchemaDisableLoading ||
                            blogPageSchemaEnableLoading
                          }
                        >
                          {" "}
                          Enable{" "}
                        </Button>
                      )}
                    </Stack>
                  </div>
                  {homePageSchemaStatus ? (
                    <Banner status="info">
                      To disable this schema, hit the <b>Disable</b> Button.
                    </Banner>
                  ) : (
                    <Banner status="info">
                      To enable this schema, hit the <b>Enable</b> Button.
                    </Banner>
                  )}
                </TextStyle>
              </Card>
            </div>
          </Layout.Section>
          <Layout.Section>
            <div className="schema-card-wrapper">
              <Card title="Product Page Schema & Breadcrumb" sectioned>
                {productPageSchemaStatus ? (
                  <Badge status="success">Enabled</Badge>
                ) : (
                  <Badge status="warning">Disabled</Badge>
                )}

                <TextStyle variation="subdued">
                  Add markup to your product pages so Google can provide
                  detailed product information in rich Search results including
                  Google Images. Users can see price, availability, and ratings
                  right on Search results.
                  <div style={{ marginTop: 20, marginBottom: 15 }}>
                    <Stack distribution="leading">
                      {productPageSchemaStatus ? (
                        <Button
                          onClick={disableProductPageSchemaHandler}
                          loading={productPageSchemaDisableLoading}
                          disabled={
                            homePageSchemaDisableLoading ||
                            homePageSchemaEnableLoading ||
                            productPageSchemaEnableLoading ||
                            collectionPageSchemaDisableLoading ||
                            collectionPageSchemaEnableLoading ||
                            articlePageSchemaDisableLoading ||
                            articlePageSchemaEnableLoading ||
                            blogPageSchemaDisableLoading ||
                            blogPageSchemaEnableLoading
                          }
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          primary
                          onClick={enableProductPageSchemaHandler}
                          loading={productPageSchemaEnableLoading}
                          disabled={
                            homePageSchemaDisableLoading ||
                            homePageSchemaEnableLoading ||
                            productPageSchemaDisableLoading ||
                            collectionPageSchemaDisableLoading ||
                            collectionPageSchemaEnableLoading ||
                            articlePageSchemaDisableLoading ||
                            articlePageSchemaEnableLoading ||
                            blogPageSchemaDisableLoading ||
                            blogPageSchemaEnableLoading
                          }
                        >
                          Enable
                        </Button>
                      )}
                    </Stack>
                  </div>
                  {productPageSchemaStatus ? (
                    <Banner status="info">
                      To disable this schema, hit the <b>Disable</b> Button.
                    </Banner>
                  ) : (
                    <Banner status="info">
                      To enable this schema, hit the <b>Enable</b> Button.
                    </Banner>
                  )}
                </TextStyle>
              </Card>
            </div>
          </Layout.Section>
          <Layout.Section>
            <div className="schema-card-wrapper">
              <Card title="Product Category Breadcrumb" sectioned>
                {collectionPageSchemaStatus ? (
                  <Badge status="success">Enabled</Badge>
                ) : (
                  <Badge status="warning">Disabled</Badge>
                )}

                <TextStyle variation="subdued">
                  A breadcrumb trail on a page indicates the page's position in
                  the site hierarchy. Google Search uses breadcrumb markup in
                  the body of a web page to categorize the Information from the
                  page in search results.
                  <div style={{ marginTop: 20, marginBottom: 15 }}>
                    <Stack distribution="leading">
                      {collectionPageSchemaStatus ? (
                        <Button
                          onClick={disableCollectionPageSchemaHandler}
                          loading={collectionPageSchemaDisableLoading}
                          disabled={
                            homePageSchemaDisableLoading ||
                            homePageSchemaEnableLoading ||
                            productPageSchemaDisableLoading ||
                            productPageSchemaEnableLoading ||
                            collectionPageSchemaEnableLoading ||
                            articlePageSchemaDisableLoading ||
                            articlePageSchemaEnableLoading ||
                            blogPageSchemaDisableLoading ||
                            blogPageSchemaEnableLoading
                          }
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          primary
                          onClick={enableCollectionPageSchemaHandler}
                          loading={collectionPageSchemaEnableLoading}
                          disabled={
                            homePageSchemaDisableLoading ||
                            homePageSchemaEnableLoading ||
                            productPageSchemaDisableLoading ||
                            productPageSchemaEnableLoading ||
                            collectionPageSchemaDisableLoading ||
                            articlePageSchemaDisableLoading ||
                            articlePageSchemaEnableLoading ||
                            blogPageSchemaDisableLoading ||
                            blogPageSchemaEnableLoading
                          }
                        >
                          Enable
                        </Button>
                      )}
                    </Stack>
                  </div>
                  {collectionPageSchemaStatus ? (
                    <Banner status="info">
                      To disable this schema, hit the <b>Disable</b> Button.
                    </Banner>
                  ) : (
                    <Banner status="info">
                      To enable this schema, hit the <b>Enable</b> Button.
                    </Banner>
                  )}
                </TextStyle>
              </Card>
            </div>
          </Layout.Section>
          <Layout.Section>
            <div className="schema-card-wrapper">
              <Card title="Article Page Schema" sectioned>
                {articlePageSchemaStatus ? (
                  <Badge status="success">Enabled</Badge>
                ) : (
                  <Badge status="warning">Disabled</Badge>
                )}

                <TextStyle variation="subdued">
                  Add structured data to your article pages so Google can
                  provide detailed information in rich Search results.
                  <div style={{ marginTop: 20, marginBottom: 15 }}>
                    <Stack distribution="leading">
                      {articlePageSchemaStatus ? (
                        <Button
                          onClick={disableArticlePageSchemaHandler}
                          loading={articlePageSchemaDisableLoading}
                          disabled={
                            homePageSchemaDisableLoading ||
                            homePageSchemaEnableLoading ||
                            productPageSchemaDisableLoading ||
                            productPageSchemaEnableLoading ||
                            collectionPageSchemaDisableLoading ||
                            collectionPageSchemaEnableLoading ||
                            articlePageSchemaEnableLoading ||
                            blogPageSchemaDisableLoading ||
                            blogPageSchemaEnableLoading
                          }
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          primary
                          onClick={enableArticlePageSchemaHandler}
                          loading={articlePageSchemaEnableLoading}
                          disabled={
                            homePageSchemaDisableLoading ||
                            homePageSchemaEnableLoading ||
                            productPageSchemaDisableLoading ||
                            productPageSchemaEnableLoading ||
                            collectionPageSchemaDisableLoading ||
                            collectionPageSchemaEnableLoading ||
                            articlePageSchemaDisableLoading ||
                            blogPageSchemaDisableLoading ||
                            blogPageSchemaEnableLoading
                          }
                        >
                          Enable
                        </Button>
                      )}
                    </Stack>
                  </div>
                  {articlePageSchemaStatus ? (
                    <Banner status="info">
                      To disable this schema, hit the <b>Disable</b> Button.
                    </Banner>
                  ) : (
                    <Banner status="info">
                      To enable this schema, hit the <b>Enable</b> Button.
                    </Banner>
                  )}
                </TextStyle>
              </Card>
            </div>
          </Layout.Section>
          <Layout.Section>
            <div className="schema-card-wrapper">
              <Card title="Blogs Page Schema" sectioned>
                {blogPageSchemaStatus ? (
                  <Badge status="success">Enabled</Badge>
                ) : (
                  <Badge status="warning">Disabled</Badge>
                )}

                <TextStyle variation="subdued">
                  Add structured data to your blog pages so Google can provide
                  detailed information in rich Search results.
                  <div style={{ marginTop: 20, marginBottom: 15 }}>
                    <Stack distribution="leading">
                      {blogPageSchemaStatus ? (
                        <Button
                          onClick={disableBlogPageSchemaHandler}
                          loading={blogPageSchemaDisableLoading}
                          disabled={
                            homePageSchemaDisableLoading ||
                            homePageSchemaEnableLoading ||
                            productPageSchemaDisableLoading ||
                            productPageSchemaEnableLoading ||
                            collectionPageSchemaDisableLoading ||
                            collectionPageSchemaEnableLoading ||
                            articlePageSchemaDisableLoading ||
                            articlePageSchemaEnableLoading ||
                            blogPageSchemaEnableLoading
                          }
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          primary
                          onClick={enableBlogPageSchemaHandler}
                          loading={blogPageSchemaEnableLoading}
                          disabled={
                            homePageSchemaDisableLoading ||
                            homePageSchemaEnableLoading ||
                            productPageSchemaDisableLoading ||
                            productPageSchemaEnableLoading ||
                            collectionPageSchemaDisableLoading ||
                            collectionPageSchemaEnableLoading ||
                            articlePageSchemaDisableLoading ||
                            articlePageSchemaEnableLoading ||
                            blogPageSchemaDisableLoading
                          }
                        >
                          Enable
                        </Button>
                      )}
                    </Stack>
                  </div>
                  {blogPageSchemaStatus ? (
                    <Banner status="info">
                      To disable this schema, hit the <b>Disable</b> Button.
                    </Banner>
                  ) : (
                    <Banner status="info">
                      To enable this schema, hit the <b>Enable</b> Button.
                    </Banner>
                  )}
                </TextStyle>
              </Card>
            </div>
          </Layout.Section>
        </Layout.AnnotatedSection>
      </Layout> */}

      {/* app recommendation */}
      <AppRecommendation />
    </Page>
  );
};

export default Index;
