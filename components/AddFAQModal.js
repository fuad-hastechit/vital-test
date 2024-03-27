/* eslint-disable no-shadow */
import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  Banner,
  Frame,
  Modal,
  Button,
  Stack,
  TextField,
  Card,
  TextStyle,
} from "@shopify/polaris";

import axiosAuth from "@utils/axiosAuth";

import { MainContext } from "@components/Provider";

function AddFAQModal({ handleModalChange, faqObject, setToast }) {
  const axios = axiosAuth();

  const mainContext = useContext(MainContext);

  const { shopName, storeDomain, faqData, setFaqData } = mainContext;

  // For Toast
  const [isEditing, setIsEditing] = useState(false);

  // For Modal
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);

  // For Form
  const [path, setPath] = useState(faqObject?.path || "");
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  useEffect(() => {
    if (faqObject) {
      setIsEditing(true);
      const faqData = [];

      faqObject.faqs.forEach((faq) => {
        faqData.push({
          question: faq.question,
          answer: faq.answer,
        });
      });
      setFaqs(faqData);
    }
  }, [faqObject]);

  const handleNewFAQ = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleRemoveFAQ = useCallback(
    (index) => {
      const newFaqs = [...faqs];
      newFaqs.splice(index, 1);
      setFaqs(newFaqs);
    },
    [faqs]
  );

  const handleQuestionChange = useCallback(
    (value, index) => {
      const newFaqs = [...faqs];
      newFaqs[index].question = value;
      setFaqs(newFaqs);
    },
    [faqs]
  );

  const handleAnswerChange = useCallback(
    (value, index) => {
      const newFaqs = [...faqs];
      newFaqs[index].answer = value;
      setFaqs(newFaqs);
    },
    [faqs]
  );

  const saveHandler = useCallback(() => {
    setLoading(true);

    let updatePath = path || "/";
    if (
      path &&
      (path[0] === "/" || path.includes(storeDomain) || path.includes(shopName))
    ) {
      updatePath = path
        .replace(storeDomain, "")
        .replace(shopName, "")
        .replace("https://", "")
        .replace(/^\//, "");

      updatePath = !updatePath ? "/" : updatePath;
    }

    const updateFaqs = [];
    faqs.forEach((faq) => {
      updateFaqs.push({
        question: faq.question.replace(/"/g, "'"),
        answer: faq.answer.replace(/"/g, "'"),
      });
    });

    const newFAQ = {
      path: updatePath,
      faqs: updateFaqs,
    };

    let faqSchemaData;
    if (!isEditing) {
      faqSchemaData = !faqData ? [newFAQ] : [...faqData, newFAQ];
    } else {
      faqSchemaData = faqData.map((faq, index) => {
        if (index === faqObject.index) {
          return newFAQ;
        }
        return faq;
      });
    }
    axios
      .post("/api/save_faq_schema_data", faqSchemaData)
      .then((res) => {
        setToast({
          error: false,
          content: "FAQ Schema saved successfully!",
        });

        setFaqData(faqSchemaData);
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
  }, [
    axios,
    faqs,
    handleModalChange,
    path,
    faqData,
    setFaqData,
    isEditing,
    faqObject,
    setToast,
    shopName,
    storeDomain,
  ]);

  return (
    <Modal
      open={active}
      onClose={handleModalChange}
      title={isEditing ? "Edit FAQ" : "Add New FAQ"}
      primaryAction={{
        content: isEditing ? "Update" : "Save",
        onAction: saveHandler,
        disabled:
          faqs.length === 0 || faqs.some((faq) => !faq.question || !faq.answer),
        loading,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleModalChange,
        },
      ]}
    >
      {/* <Modal.Section> */}
      <div className="AddWidgets">
        <Frame>
          <div className="p-8 faq-form">
            <Stack vertical>
              {/* <Layout.AnnotatedSection
                title="FAQ Schema"
                description="Enter the URL of any page of your website where you want to use the FAQ snippet. Preferably, this should be used on your website's actual FAQ Page. Google may choose to display the FAQ snippet along with that page's listing."
              >
                <Layout.Section> */}
              {!isEditing && (
                <Banner
                  title="How to add a FAQ Schema"
                  action={{
                    content: "See Tutorial",
                    external: true,
                    url: "https://www.youtube.com/watch?v=4OQJixcREx8",
                  }}
                  status="info"
                >
                  <p>
                    Enter the URL of any page of your website where you want to
                    use the FAQ snippet. Only the last part of the URL is
                    needed. For example, if your URL is
                    https://gropulse.myshopfy.com/pages/faq, then enter only
                    "pages/faq" in the field below.
                  </p>
                </Banner>
              )}

              <Stack.Item fill>
                <Card sectioned>
                  <TextField
                    id="shop_url"
                    label={<TextStyle variation="strong">URL</TextStyle>}
                    value={`https://${storeDomain}/`}
                    readOnly
                    connectedRight={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <TextField
                        id="url_path"
                        placeholder="enter path"
                        value={path}
                        onChange={setPath}
                      />
                    }
                  />
                </Card>
              </Stack.Item>

              {faqs.map((faq, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Stack.Item fill key={index}>
                  <Card sectioned>
                    <Stack vertical>
                      <TextField
                        id={`${index}`}
                        label={
                          <TextStyle variation="strong">Question</TextStyle>
                        }
                        value={faq.question}
                        onChange={handleQuestionChange}
                        placeholder="Question"
                      />

                      <TextField
                        id={`${index}`}
                        label={<TextStyle variation="strong">Answer</TextStyle>}
                        value={faq.answer}
                        onChange={handleAnswerChange}
                        placeholder="Answer"
                        multiline={2}
                      />

                      <Button
                        destructive
                        outline
                        onClick={() => handleRemoveFAQ(index)}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Card>
                </Stack.Item>
              ))}

              <Button onClick={handleNewFAQ} primary>
                Add another FAQ
              </Button>
              {/* </Layout.Section>
              </Layout.AnnotatedSection> */}
            </Stack>
          </div>
        </Frame>
      </div>
    </Modal>
  );
}

export default AddFAQModal;
