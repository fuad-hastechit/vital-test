import { useContext } from "react";
import { Banner, Button } from "@shopify/polaris";
import { MainContext } from "@components/Provider";

const ProtectedStoreBanner = ({ marginTop = 0, marginBottom = 0 }) => {
  const mainContext = useContext(MainContext);
  const { shopName } = mainContext;
  return (
    <div style={{ marginBottom, marginTop }}>
      <Banner title="Store Under Password Protection" status="warning">
        <div className="grid grid-cols-[1fr,auto]">
          <p>
            Your store is currently password protected,{" "}
            <span className="font-medium">
              which restricts Google from tracking rich snippet data.
            </span>{" "}
            You need to disable password protection to enable rich snippets
            tracking.
          </p>
          <div style={{ color: "rgb(185, 137, 0)" }}>
            <Button
              outline
              monochrome
              external
              url={`https://${shopName}/admin/online_store/preferences?tutorial=unlock`}
            >
              Disable Password
            </Button>
          </div>
        </div>
      </Banner>
    </div>
  );
};

export default ProtectedStoreBanner;
