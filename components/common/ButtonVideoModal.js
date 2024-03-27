import { useState, useCallback, memo } from "react";
import { Button, Modal, Icon } from "@shopify/polaris";
import { PlayCircleMajor } from "@shopify/polaris-icons";

const ButtonVideoModal = ({ source }) => {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = (
    <div className="button-video-modal-wrapper">
      <Button outline monochrome onClick={handleChange}>
        <Icon source={PlayCircleMajor} color="success" />{" "}
        <span className="button-text">See how</span>
      </Button>
    </div>
  );

  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      large
      title={<h1 className="font-medium">Video tutorial</h1>}
    >
      <Modal.Section>
        <div className="video-modal-iframe-wrapper">
          <iframe
            className="w-full h-[300px] md:h[400px] lg:h-[500px]"
            width="560"
            height="315"
            src={source}
            title="YouTube video player"
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Modal.Section>
    </Modal>
  );
};

export default memo(ButtonVideoModal);
