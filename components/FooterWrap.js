import { Icon, Link } from "@shopify/polaris";
import { InfoMinor } from "@shopify/polaris-icons";

export default function FooterWrap({ shopName }) {
  return (
    <footer className="flex justify-center my-[35px]">
      <div className="flex items-start border-[2px] border-[#ddd] border-solid rounded-[32px] p-[18px] text-[15px]">
        <Icon source={InfoMinor} color="highlight" />
        <div className="ml-[10px] mr-2 font-medium">Need help?</div>{" "}
        <a
          style={{ textDecoration: "auto" }}
          href={`https://gropulse.com/contact?app_name=${encodeURIComponent(
            "Rich Snippets"
          )}&store_name=${encodeURIComponent(shopName)}`}
          target="_blank"
          rel="noreferrer"
        >
          Contact Support
        </a>
      </div>
    </footer>
  );
}
