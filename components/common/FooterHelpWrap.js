import { Link, FooterHelp } from "@shopify/polaris";

const FooterHelpWrap = () => {
  return (
    <FooterHelp>
      {` Need help? Email us `}
      <Link
        onClick={() => {
          window.open("mailto:hi@gropulse.com ", "_blank");
        }}
        removeUnderline
      >
        hi@gropulse.com
      </Link>
    </FooterHelp>
  );
};

export default FooterHelpWrap;
