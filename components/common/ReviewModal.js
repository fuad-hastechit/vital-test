import { useState, useCallback, useContext } from "react";
import { Button, Modal, TextContainer, Icon, Stack } from "@shopify/polaris";
import {
  CircleTickMajor,
  ThumbsDownMinor,
  ThumbsUpMinor,
} from "@shopify/polaris-icons";

import { MainContext } from "@components/Provider";

import { useShopMetadataMutation } from "@hooks/index";

function ReviewModal({ successMessage }) {
  const mainContext = useContext(MainContext);
  const { shopName } = mainContext;
  const [active, setActive] = useState(true);

  const { mutateAsync: updateReviewModalStatus } = useShopMetadataMutation();

  const handleChange = useCallback(async () => {
    await updateReviewModalStatus({ isReviewModalShown: true }).finally(() => {
      setActive(false);
    });
  }, [updateReviewModalStatus]);

  return (
    <Modal titleHidden open={active} onClose={handleChange}>
      <Modal.Section>
        <div className="review-modal-body">
          <div className="p-10">
            <Icon source={CircleTickMajor} color="success" />
          </div>
          <h1 className="text-[22px] text-center mb-5 font-semibold">
            Congratulations!
          </h1>
          <h2 className="text-[18px] text-center font-normal">
            {successMessage ?? `Schema status updated successfully.`}
          </h2>
        </div>
      </Modal.Section>
      <Modal.Section>
        <TextContainer>
          <div className="text-center text-[16px]">
            <h1 className="text-[18px] mb-5 font-medium">
              Are you enjoying our app?{" "}
            </h1>
            <p>
              We genuinely value your opinion and would be thrilled to hear your
              feedback, as it helps us improve and provide you with an even
              better experience.
            </p>
          </div>
        </TextContainer>
      </Modal.Section>
      <div className="Polaris-Modal-Footer">
        <div className="Polaris-Modal-Footer__FooterContent">
          <Stack distribution="trailing">
            <Stack.Item>
              <div style={{ color: "var(--p-action-primary)" }}>
                <Button
                  outline
                  monochrome
                  icon={ThumbsUpMinor}
                  external
                  url="https://apps.shopify.com/gropulse-rich-snippets-for-seo#modal-show=ReviewListingModal"
                  onClick={handleChange}
                >
                  Good
                </Button>
              </div>
            </Stack.Item>
            <Stack.Item>
              <div style={{ color: "rgb(185, 137, 0)" }}>
                <Button
                  outline
                  monochrome
                  icon={ThumbsDownMinor}
                  external
                  url={`https://gropulse.com/contact${
                    shopName
                      ? `?store_name=${encodeURIComponent(shopName)}`
                      : ""
                  }`}
                  onClick={handleChange}
                >
                  Bad
                </Button>
              </div>
            </Stack.Item>
          </Stack>
        </div>
      </div>
    </Modal>
  );
}

export default ReviewModal;
