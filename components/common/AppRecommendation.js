import { Layout, Card } from "@shopify/polaris";

const AppRecommendation = () => {
  return (
    <Layout>
      <Layout.Section>
        <div className="recommend-app-area">
          <Card
            sectioned
            title="Other helpful apps you should consider checking out"
          >
            <div className="recommend-app-wrapper">
              <Card sectioned>
                <div className="single-recommend-app">
                  <div className="single-recommend-app__thumb">
                    <a
                      href="https://apps.shopify.com/analyzely-google-analytics-4?utm_campaign=from-app-recommendation&utm_medium=shopify-app&utm_source=rich_snippets"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.shopify.com/app-store/listing_images/393b3b4bb69acc2f58835a02f4aaa14b/icon/CMu5kdbU3vkCEAE=.png?height=72&width=72"
                        alt="app thumb"
                      />
                    </a>
                  </div>
                  <div className="single-recommend-app__details">
                    <h3 className="Polaris-Heading">
                      <a
                        href="https://apps.shopify.com/analyzely-google-analytics-4?utm_campaign=from-app-recommendation&utm_medium=shopify-app&utm_source=rich_snippets"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Analyzely ‑ Google Analytics 4
                      </a>
                    </h3>
                    <p>
                      Track Visitor and Conversion by Integrating Google
                      Analytics 4
                    </p>
                  </div>
                </div>
              </Card>
              <Card sectioned>
                <div className="single-recommend-app">
                  <div className="single-recommend-app__thumb">
                    <a
                      href="https://apps.shopify.com/gropulse-gtm-data-layer?utm_campaign=from-app-recommendation&utm_medium=shopify-app&utm_source=rich_snippets"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.shopify.com/app-store/listing_images/29ae53b3b51f0c8439bc21cab5c28004/icon/COCkgbTOoPoCEAE=.png?height=72&width=72"
                        alt="app thumb"
                      />
                    </a>
                  </div>
                  <div className="single-recommend-app__details">
                    <h3 className="Polaris-Heading">
                      <a
                        href="https://apps.shopify.com/gropulse-gtm-data-layer?utm_campaign=from-app-recommendation&utm_medium=shopify-app&utm_source=rich_snippets"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GroPulse GTM & Data Layer
                      </a>
                    </h3>
                    <p>Simple Way to Install the Google Tag Manager</p>
                  </div>
                </div>
              </Card>

              <Card sectioned>
                <div className="single-recommend-app">
                  <div className="single-recommend-app__thumb">
                    <a
                      href="https://apps.shopify.com/pixee-multi-facebook-pixels?utm_campaign=from-app-recommendation&utm_medium=shopify-app&utm_source=rich_snippets"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.shopify.com/app-store/listing_images/5ff251f2bb1d9d01bda6b8ac3b4b40db/icon/CPP2nL_Dp_oCEAE=.png?height=72&width=72"
                        alt="app thumb"
                      />
                    </a>
                  </div>
                  <div className="single-recommend-app__details">
                    <h3 className="Polaris-Heading">
                      <a
                        href="https://apps.shopify.com/pixee-multi-facebook-pixels?utm_campaign=from-app-recommendation&utm_medium=shopify-app&utm_source=rich_snippets"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Pixee ‑ Multi Facebook Pixels
                      </a>
                    </h3>
                    <p>
                      Setup Unlimited Facebook Pixels with Conversion API
                      Support
                    </p>
                  </div>
                </div>
              </Card>
              {/* <Card sectioned>
                <div className="single-recommend-app">
                  <div className="single-recommend-app__thumb">
                    <a
                      href="https://apps.shopify.com/adtrack-google-ads-tracking?utm_campaign=from-app-recommendation&utm_medium=shopify-app&utm_source=rich_snippets"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.shopify.com/app-store/listing_images/e2c0de8584abd63168fdbea4f942f859/icon/CPOMncLSlP4CEAE=.png?height=72&width=72"
                        alt="app thumb"
                      />
                    </a>
                  </div>
                  <div className="single-recommend-app__details">
                    <h3 className="Polaris-Heading">
                      <a
                        href="https://apps.shopify.com/adtrack-google-ads-tracking?utm_campaign=from-app-recommendation&utm_medium=shopify-app&utm_source=rich_snippets"
                        target="_blank"
                        rel="noreferrer"
                      >
                        AdTrack ‑ Google Ads Tracking
                      </a>
                    </h3>
                    <p>
                      Simple Way to Track Google Ads Conversion
                    </p>
                  </div>
                </div>
              </Card> */}

              <Card sectioned>
                <div className="single-recommend-app">
                  <div className="single-recommend-app__thumb">
                    <a
                      href="https://apps.shopify.com/gropulse-google-reviews?utm_campaign=from-app-recommendation&utm_medium=shopify-app&utm_source=rich_snippets"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn.shopify.com/app-store/listing_images/749e6bdc6924c8ac0ee0c6ab22566a45/icon/CPH_p_Op_P4CEAE=.png?height=72&width=72"
                        alt="app thumb"
                      />
                    </a>
                  </div>
                  <div className="single-recommend-app__details">
                    <h3 className="Polaris-Heading">
                      <a
                        href="https://apps.shopify.com/gropulse-google-reviews?utm_campaign=from-app-recommendation&utm_medium=shopify-app&utm_source=rich_snippets"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GroPulse Google Reviews
                      </a>
                    </h3>
                    <p>
                      Boost Sales with Authentic Customer Feedback from Google
                      Map
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </Layout.Section>
    </Layout>
  );
};

export default AppRecommendation;
