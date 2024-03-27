/* eslint-disable prefer-template */
/* eslint-disable react/jsx-curly-newline */
import {
  Badge,
  Button,
  Card,
  ExceptionList,
  Stack,
  DisplayText,
  Banner,
  Icon,
  Link,
} from "@shopify/polaris";
import { useRouter } from "next/router";
import mediumZoom from "medium-zoom";
import { useContext, useEffect, useRef } from "react";
import { MainContext } from "@components/Provider";
import { TooltipWrap } from "@components/common";
import { LockMajor, InfoMinor } from "@shopify/polaris-icons";

const SchemaSettingCard = ({
  imgSrc,
  imgAlt,
  title,
  description,
  status,
  enableLoading,
  disableLoading,
  onEnable,
  onDisable,
  isButtonDisabled,
  configurePage,
  isProFeature,
  showHomePageInfo,
}) => {
  const router = useRouter();
  const mainContext = useContext(MainContext);
  const { host, shopName } = mainContext;

  const imageRef = useRef(null);

  useEffect(() => {
    const zoom = mediumZoom(imageRef.current, {
      margin: 0,
      background: "rgba(0, 0, 0, 0.6)",
    });
    return () => {
      zoom.detach(); // Cleanup when the component unmounts
    };
  }, []);

  return (
    <Card>
      <div
        className={
          "flex flex-col md:flex-row " +
          (isProFeature ? " md:max-h-[275px]" : " md:max-h-[195px]")
        }
      >
        <div
          className={
            "w-full md:w-[35%] overflow-hidden rounded-t-[0.8rem] md:rounded-l-[0.8rem] md:rounded-tr-none h-auto" +
            (isProFeature ? "md:h-[275px]" : "md:h-[195px]")
          }
        >
          <img
            className="object-cover object-left-top w-full h-full zoomable-image"
            src={`https://raw.githubusercontent.com/fuad-hastechit/vital-test/main/public${imgSrc}`}
            alt={imgAlt}
            loading="lazy"
            ref={imageRef}
          />
        </div>

        <div className="w-full md:w-[65%] px-[20px] py-[18px]">
          {isProFeature && (
            <>
              <Banner status="info" icon={LockMajor}>
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-medium">
                    This feature is available only with the Pro plan
                  </p>
                  {/* <Button outline size="slim">
                Upgrade to Pro
              </Button> */}
                  <div class="Polaris-Banner__PrimaryAction">
                    <button
                      class="Polaris-Banner__Button"
                      type="button"
                      onClick={() =>
                        router.push({
                          pathname: "/plan",
                          query: {
                            shop: shopName,
                            host,
                          },
                        })
                      }
                    >
                      Upgrade to Pro
                    </button>
                  </div>
                </div>
              </Banner>
              <br />
            </>
          )}

          <Stack alignment="leading">
            <Stack.Item fill>
              <DisplayText size="small">
                <span className="font-medium">{title}</span>
              </DisplayText>
            </Stack.Item>
            {status ? (
              <Badge status="success">Enabled</Badge>
            ) : (
              <Badge status="warning">Disabled</Badge>
            )}
          </Stack>
          <div className="mt-3 mb-9 text-gray-500 text-[15px]">
            {description}
            <div className="mt-2" />

            {showHomePageInfo && !isProFeature && (
              <div className="text-gray-500 text-[15px]">
                Please configure{" "}
                <Link
                  onClick={() =>
                    router.push({
                      pathname: "/shop_details",
                      query: {
                        shop: shopName,
                        host,
                      },
                    })
                  }
                >
                  Shop details
                </Link>{" "}
                and{" "}
                <Link
                  onClick={() =>
                    router.push({
                      pathname: "/social_profiles",
                      query: {
                        shop: shopName,
                        host,
                      },
                    })
                  }
                >
                  Social profile
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <TooltipWrap
              active={isProFeature}
              content="This feature is available only with the Pro plan"
            >
              {status ? (
                <Button
                  onClick={onDisable}
                  loading={disableLoading}
                  disabled={isButtonDisabled || isProFeature}
                  destructive
                  outline
                >
                  Disable
                </Button>
              ) : (
                <Button
                  primary
                  onClick={onEnable}
                  loading={enableLoading}
                  disabled={isButtonDisabled || isProFeature}
                >
                  {" "}
                  Enable{" "}
                </Button>
              )}
            </TooltipWrap>

            {configurePage && (
              <TooltipWrap
                active={isProFeature}
                content="This feature is available only with the Pro plan"
              >
                <Button
                  disabled={isProFeature}
                  onClick={() =>
                    router.push({
                      pathname: configurePage,
                      query: {
                        shop: shopName,
                        host,
                      },
                    })
                  }
                >
                  Configure
                </Button>
              </TooltipWrap>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SchemaSettingCard;
