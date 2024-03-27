import { Toast } from "@shopify/polaris";

const ToastWrap = ({ isActive, content, toggle, error }) => {
  if (isActive) {
    return (
      <Toast
        content={content}
        onDismiss={toggle}
        duration={3000}
        error={error}
      />
    );
  }
  return null;
};

export default ToastWrap;
