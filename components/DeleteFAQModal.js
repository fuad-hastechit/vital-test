/* eslint-disable no-shadow */
import React, { useState, useCallback, useContext, useEffect } from "react";
import { Modal, TextContainer } from "@shopify/polaris";

import axiosAuth from "@utils/axiosAuth";

import { MainContext } from "@components/Provider";

const DeleteFAQModal = ({ handleModalChange, faqObject, setToast }) => {
  const axios = axiosAuth();

  const mainContext = useContext(MainContext);
  const { faqData, setFaqData } = mainContext;

  const [loading, setLoading] = useState(false);

  const handleDeleteFAQ = useCallback(() => {
    setLoading(true);
    const faqSchemaData = [...faqData];
    faqSchemaData.splice(faqObject.index, 1);

    axios
      .post("/api/save_faq_schema_data", faqSchemaData)
      .then((res) => {
        setToast({
          error: false,
          content: "FAQ Schema Deleted Successfully!",
        });
        setFaqData(faqSchemaData);
        setLoading(false);
        handleModalChange();
      })
      .catch((err) => {
        setToast({
          error: true,
          content: "Something went wrong. Please try again.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axios, faqData, faqObject, handleModalChange, setFaqData, setToast]);

  return (
    <Modal
      open
      onClose={handleModalChange}
      title="Delete FAQ Schema"
      primaryAction={{
        content: "Delete",
        destructive: true,
        onAction: handleDeleteFAQ,
        loading,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleModalChange,
        },
      ]}
      preventCloseOnBgClick
    >
      <Modal.Section>
        <TextContainer>
          <div className="text-[17px]">
            Are you sure you want to delete this FAQ Schema? This action cannot
            be undone.
          </div>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};

export default DeleteFAQModal;
