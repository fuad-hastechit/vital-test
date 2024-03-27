import { Spinner } from "@shopify/polaris";

const SpinnerWrap = () => {
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
      <Spinner accessibilityLabel="Spinner" size="large" color="teal" />
    </div>
  );
};

export default SpinnerWrap;
