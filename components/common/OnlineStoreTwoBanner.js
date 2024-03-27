import { useContext } from "react";
import { Banner, Button, Icon } from "@shopify/polaris";
import { ExternalMinor } from "@shopify/polaris-icons";
import { MainContext } from "@components/Provider";

const OnlineStoreTwoBanner = () => {
  const mainContext = useContext(MainContext);
  const { embedBlockStatus, shopName } = mainContext;
  return (
    <div className="activation-banner mb-[15px]">
      {embedBlockStatus?.isHeadCodeEnabled ? (
        <Banner title="App Activation Status: Activated" status="success">
          <p>
            As we&apos;re using the Shopify theme app extension feature, you can
            deactivate this app from the theme customizer.
          </p>
          <div className="dash-info-button-wrap" style={{ marginTop: 20 }}>
            <div style={{ color: "#bf0711", display: "inline-block" }}>
              <Button
                monochrome
                outline
                external
                // eslint-disable-next-line no-undef
                url={`https://${shopName}/admin/themes/current/editor?context=apps&appEmbed=${EXTENSION_UUID}/gropulse-rich-snippets`} // change name here
              >
                Deactivate <Icon source={ExternalMinor} color="base" />
              </Button>
            </div>
          </div>
        </Banner>
      ) : (
        <Banner title="App Activation Status:  Deactivated" status="info">
          <p>
            As we&apos;re using the Shopify theme app extension feature, you
            need to activate this app from the theme customizer.
          </p>
          <div className="dash-info-button-wrap" style={{ marginTop: 20 }}>
            <div style={{ color: "rgb(0, 128, 96)", display: "inline-block" }}>
              <Button
                outline
                external
                monochrome
                // eslint-disable-next-line no-undef
                url={`https://${shopName}/admin/themes/current/editor?context=apps&template=index&activateAppId=${EXTENSION_UUID}/gropulse-rich-snippets`} // change name here
              >
                Activate <Icon source={ExternalMinor} color="base" />
              </Button>
            </div>
          </div>
        </Banner>
      )}
    </div>
  );
};

export default OnlineStoreTwoBanner;
