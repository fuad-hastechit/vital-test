/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/display-name */
/* eslint-disable no-nested-ternary */
import { useState, useContext, useEffect, useCallback, useRef } from "react";
import {
  Badge,
  Page,
  Card,
  Layout,
  Button,
  DisplayText,
  Stack,
  ExceptionList,
  Icon,
  ButtonGroup,
  Modal,
  TextContainer,
  TextField,
  Form,
  Toast,
  Tag,
  TextStyle,
} from "@shopify/polaris";

import { ToastWrap } from "@components/common";
import axiosAuth from "@utils/axiosAuth";
import { MainContext } from "@components/Provider";
import pricingConfig from "../pricingConfig.json";
import {
  TickMinor,
  CancelSmallMinor,
  DiscountsMajor,
} from "@shopify/polaris-icons";

const PricingPlan = () => {
  const axios = axiosAuth();
  const mainContext = useContext(MainContext);
  const { planName, host } = mainContext;

  const [isYearlyButtonActive, setIsYearlyButtonActive] = useState(
    planName === "yearly" ||
      planName === "free" ||
      planName === null ||
      planName === undefined
  );

  const planDownActiveButton = useRef();
  const [isNew, setIsNew] = useState(false);
  const [toast, setToast] = useState({ error: false, content: false });
  const [activePlanDownModal, setActivePlanDownModal] = useState(false);
  const [isPlanErrorToastActive, setPlanErrorToastActive] = useState(false);

  // Coupon Code State
  const [appliedCouponCode, setAppliedCouponCode] = useState({});
  const [couponCodeValue, setCouponCodeValue] = useState(false);
  const [couponError, setCouponError] = useState(null);
  const [couponApplyButtonLoading, setCouponApplyButtonLoading] = useState(
    false
  );

  const couponCodeValueChangeHandler = useCallback((value) => {
    setCouponCodeValue(value);
  }, []);

  const couponApplyClickHandler = useCallback(() => {
    if (!couponCodeValue) {
      setCouponError("Coupon code is required!");
      return;
    }
    setCouponError(null);
    setCouponApplyButtonLoading(true);
    axios
      .post("/api/coupon_code_check", {
        couponCode: couponCodeValue,
      })
      .then(({ data }) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCouponCodeValue(null);
        setAppliedCouponCode(data.appliedCouponCode);
        setToast({
          content: `Congratulations! You have got ${data.appliedCouponCode.discountPercentage}% discount.`,
          error: false,
        });
      })
      .catch((err) => {
        console.log("err.response", err.response);

        setToast({ content: err.response.data.err, error: true });
        console.log(err);
      })
      .finally(() => {
        setCouponApplyButtonLoading(false);
      });
  }, [axios, couponCodeValue]);

  useEffect(() => {
    const isNewQueryParams =
      // eslint-disable-next-line node/no-unsupported-features/node-builtins
      new URLSearchParams(window.location.search).get("is_new") === "true";
    setIsNew(isNewQueryParams);
  }, []);

  const togglePlanErrorToastActivation = useCallback(
    () => setPlanErrorToastActive((active) => !active),
    []
  );

  const handlePlanDownModalChange = useCallback(
    () => setActivePlanDownModal(!activePlanDownModal),
    [activePlanDownModal]
  );

  const handleYearlyButtonClick = useCallback(() => {
    if (isYearlyButtonActive) return;
    setIsYearlyButtonActive(true);
  }, [isYearlyButtonActive]);

  const handleMonthlyButtonClick = useCallback(() => {
    if (!isYearlyButtonActive) return;
    setIsYearlyButtonActive(false);
  }, [isYearlyButtonActive]);

  const [planButtonLoading, setPlanButtonLoading] = useState("");

  const selectPlan = useCallback(
    (subscriptionType) => {
      if (host) {
        setPlanButtonLoading(subscriptionType);
        axios
          .post("/api/subscribe_plan", {
            subscriptionType,
            host,
            appliedCouponCode: appliedCouponCode?.discountCode,
          })
          .then(({ data }) => {
            const { billingResult } = data;

            if (billingResult.appSubscriptionCreate?.confirmationUrl) {
              window.top.window.location =
                billingResult.appSubscriptionCreate.confirmationUrl;
            } else {
              window.top.window.location = billingResult;
            }
          })
          .catch((err) => {
            console.log(err);
            setPlanButtonLoading("");
            togglePlanErrorToastActivation();
          });
      }
    },
    [
      appliedCouponCode.discountCode,
      axios,
      host,
      togglePlanErrorToastActivation,
    ]
  );

  return (
    <>
      <Page>
        {isNew && (
          <>
            <div style={{ marginTop: "30px", marginBottom: "20px" }}>
              <Stack distribution="center">
                <DisplayText size="large">Choose Your Plan</DisplayText>
              </Stack>
            </div>
            <div style={{ borderBottom: "0.1rem solid rgb(211, 219, 226)" }} />
          </>
        )}
        {toast.content && (
          <Toast
            content={toast.content}
            error={toast.error}
            onDismiss={() => setToast({ error: false, content: false })}
          />
        )}

        <div style={{ marginTop: "30px" }}>
          <Layout>
            <Layout.Section oneHalf>
              <div className="pricing-card-wrapper pricing-card-wrapper--free">
                <Card title="Free Plan" sectioned>
                  <div style={{ marginBottom: 90 }}>
                    <DisplayText size="large">$0/Month</DisplayText>
                  </div>
                  <div
                    style={{ marginBottom: 30 }}
                    className="plan-feature-wrapper"
                  >
                    <ExceptionList
                      items={[
                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "Local Business Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "Product Category and Breadcrumb Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "Article Page Schema",
                        },

                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "Blog Page Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={CancelSmallMinor} color="critical" />
                          ),
                          description: "Product Page Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={CancelSmallMinor} color="critical" />
                          ),
                          description: "Sitelinks Search-box Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={CancelSmallMinor} color="critical" />
                          ),
                          description: "FAQ Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={CancelSmallMinor} color="critical" />
                          ),
                          description: "Carousel Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={CancelSmallMinor} color="critical" />
                          ),
                          description: "Priority support",
                        },
                      ]}
                    />
                  </div>
                  {planName === "free" ? (
                    <Button primary fullWidth disabled size="large">
                      Current Plan
                    </Button>
                  ) : planName === "monthly" || planName === "yearly" ? (
                    <div ref={planDownActiveButton}>
                      <Button
                        primary
                        fullWidth
                        size="large"
                        onClick={() => handlePlanDownModalChange()}
                        loading={planButtonLoading === "free"}
                      >
                        Select
                      </Button>
                    </div>
                  ) : (
                    <Button
                      primary
                      fullWidth
                      size="large"
                      onClick={() => selectPlan("free")}
                      loading={planButtonLoading === "free"}
                    >
                      Select
                    </Button>
                  )}
                </Card>
              </div>
            </Layout.Section>

            <Layout.Section oneHalf>
              <div className="pricing-plan-chooser">
                <ButtonGroup segmented>
                  <Button
                    pressed={isYearlyButtonActive}
                    onClick={handleYearlyButtonClick}
                  >
                    Yearly Plan
                  </Button>
                  <Button
                    pressed={!isYearlyButtonActive}
                    onClick={handleMonthlyButtonClick}
                  >
                    Monthly Plan
                  </Button>
                </ButtonGroup>
              </div>
              <div className="pricing-card-wrapper">
                <Card
                  title={
                    isYearlyButtonActive
                      ? pricingConfig.yearly.name
                      : pricingConfig.monthly.name
                  }
                  sectioned
                >
                  <div className="mb-1 h-[100px]">
                    {appliedCouponCode?.discountCode && (
                      <Tag
                        key={appliedCouponCode?.discountCode}
                        onRemove={() => setAppliedCouponCode({})}
                      >
                        <Stack spacing="extraTight">
                          <Icon source={DiscountsMajor} color="base" />
                          <TextStyle variation="strong">
                            {appliedCouponCode?.discountCode?.toUpperCase()}
                          </TextStyle>
                        </Stack>
                      </Tag>
                    )}

                    {appliedCouponCode?.discountPercentage ? (
                      <>
                        <div
                          style={{
                            textDecoration: "line-through",
                            color: "#cbd5e0",
                          }}
                        >
                          <DisplayText size="medium">
                            {isYearlyButtonActive
                              ? `$${(pricingConfig.yearly.price / 12).toFixed(
                                  2
                                )}/Month`
                              : `$${pricingConfig.monthly.price}/Month`}
                          </DisplayText>
                        </div>

                        <DisplayText size="large">
                          {isYearlyButtonActive
                            ? `$${(
                                (pricingConfig.yearly.price -
                                  (appliedCouponCode.discountPercentage / 100) *
                                    pricingConfig.yearly.price) /
                                12
                              ).toFixed(2)}/Month`
                            : `$${(
                                pricingConfig.monthly.price -
                                (appliedCouponCode.discountPercentage / 100) *
                                  pricingConfig.monthly.price
                              ).toFixed(2)}/Month`}
                        </DisplayText>
                      </>
                    ) : (
                      <DisplayText size="large">
                        {isYearlyButtonActive
                          ? `$${(pricingConfig.yearly.price / 12).toFixed(
                              2
                            )}/Month`
                          : `$${pricingConfig.monthly.price}/Month`}
                      </DisplayText>
                    )}

                    {isYearlyButtonActive ? (
                      <>
                        <p style={{ marginTop: 12 }}>
                          Billed at{" "}
                          {appliedCouponCode.discountPercentage ? (
                            <>
                              <b
                                style={{
                                  textDecoration: "line-through",
                                  color: "#717171",
                                  marginRight: 5,
                                }}
                              >
                                ${pricingConfig.yearly.price}
                              </b>
                              <b>
                                $
                                {(
                                  pricingConfig.yearly.price -
                                  (appliedCouponCode.discountPercentage / 100) *
                                    pricingConfig.yearly.price
                                ).toFixed(2)}
                              </b>
                            </>
                          ) : (
                            <b>${pricingConfig.yearly.price}</b>
                          )}{" "}
                          once per year
                        </p>
                        {!appliedCouponCode?.discountPercentage && (
                          <span className="hso-pricing-discount">
                            -
                            {Math.round(
                              ((pricingConfig.monthly.price -
                                pricingConfig.yearly.price / 12) /
                                pricingConfig.monthly.price) *
                                100
                            )}
                            %
                          </span>
                        )}

                        <Badge status="attention">Best Choice</Badge>
                      </>
                    ) : (
                      ""
                    )}

                    {isYearlyButtonActive ? (
                      <p style={{ marginTop: 12 }}>
                        {pricingConfig.yearly.trial_days} days free trial
                      </p>
                    ) : (
                      <p style={{ marginTop: 12 }}>
                        {pricingConfig.monthly.trial_days} days free trial
                      </p>
                    )}
                  </div>

                  <div
                    style={{ marginBottom: 30 }}
                    className="plan-feature-wrapper"
                  >
                    <ExceptionList
                      items={[
                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "Local Business Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "Product Category and Breadcrumb Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "Article Page Schema",
                        },

                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "Blog Page Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "Product Page Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "Sitelinks Search-box Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "FAQ Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "Carousel Schema",
                        },
                        {
                          icon: () => (
                            <Icon source={TickMinor} color="success" />
                          ),
                          description: "Priority support",
                        },
                      ]}
                    />
                  </div>

                  {isYearlyButtonActive ? (
                    planName === "yearly" ? (
                      <Button primary fullWidth disabled size="large">
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        primary
                        fullWidth
                        size="large"
                        onClick={() => selectPlan("yearly")}
                        loading={planButtonLoading === "yearly"}
                      >
                        Select
                      </Button>
                    )
                  ) : planName === "monthly" ? (
                    <Button primary fullWidth disabled size="large">
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      primary
                      fullWidth
                      size="large"
                      onClick={() => selectPlan("monthly")}
                      loading={planButtonLoading === "monthly"}
                    >
                      Select
                    </Button>
                  )}
                </Card>
              </div>
            </Layout.Section>
          </Layout>
        </div>
        <br />
        <br />
        <div className="cupon-code-wrapper">
          <Layout.AnnotatedSection
            title="Do you have Coupon Code?"
            description="Apply coupon code and get a discount!"
          >
            <Card sectioned>
              <Form onSubmit={couponApplyClickHandler}>
                <TextField
                  value={couponCodeValue}
                  onChange={couponCodeValueChangeHandler}
                  error={couponError}
                  connectedRight={
                    <Button primary loading={couponApplyButtonLoading} submit>
                      Apply
                    </Button>
                  }
                />
              </Form>
            </Card>
          </Layout.AnnotatedSection>
        </div>
      </Page>

      <Modal
        open={activePlanDownModal}
        onClose={handlePlanDownModalChange}
        title="Are you sure?"
        secondaryActions={[
          {
            content: "No",
            onAction: handlePlanDownModalChange,
          },
          {
            content: "Yes",
            onAction: () => selectPlan("free"),
            loading: planButtonLoading === "free",
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              You will not be able to access the premium features after
              downgrade.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>

      <ToastWrap
        isActive={isPlanErrorToastActive}
        content="Cannot choose plan. Please try again"
        toggle={togglePlanErrorToastActivation}
        error
      />
    </>
  );
};

export default PricingPlan;
