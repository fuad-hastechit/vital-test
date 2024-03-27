import { useState, useContext } from "react";
import { Banner, Button, ButtonGroup } from "@shopify/polaris";
import {
  ThumbsUpMinor,
  ThumbsDownMinor,
  FavoriteMajor,
} from "@shopify/polaris-icons";

import { MainContext } from "@components/Provider";

import { useShopMetadataMutation } from "@hooks/index";

const ReviewBanner = () => {
  const mainContext = useContext(MainContext);
  const { shopName, setIsReviewBannerClosed } = mainContext;

  const [showReviewBanner, setShowReviewBanner] = useState(true);

  const { mutateAsync: updateReviewBannerStatus } = useShopMetadataMutation();

  const handleDismiss = async () => {
    setShowReviewBanner(false);
    setIsReviewBannerClosed(true);
    await updateReviewBannerStatus({ isReviewBannerClosed: true });
  };

  return showReviewBanner ? (
    <div className="review-banner-wrapper mt-[15px] mb-[15px]">
      <Banner
        title="Share Your Feedback with Us!"
        status="warning"
        icon={FavoriteMajor}
        onDismiss={handleDismiss}
      >
        <p>
          We truly care about your experience with our app. Help us improve and
          make it even better for you!
        </p>
        <ButtonGroup>
          <div style={{ color: "var(--p-action-primary)" }}>
            <Button
              outline
              monochrome
              icon={ThumbsUpMinor}
              external
              url="https://apps.shopify.com/gropulse-rich-snippets-for-seo#modal-show=ReviewListingModal"
            >
              Good
            </Button>
          </div>
          <div style={{ color: "rgb(185, 137, 0)" }}>
            <Button
              outline
              monochrome
              icon={ThumbsDownMinor}
              external
              url={`https://gropulse.com/contact${
                shopName ? `?store_name=${encodeURIComponent(shopName)}` : ""
              }`}
            >
              Bad
            </Button>
          </div>
        </ButtonGroup>
      </Banner>
    </div>
  ) : null;
};

export default ReviewBanner;
