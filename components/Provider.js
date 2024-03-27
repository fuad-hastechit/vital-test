import React, { useCallback, useState } from "react";

export const MainContext = React.createContext();

function useInputHandle(init) {
  const [value, setValue] = useState(init);
  return [
    {
      value,
      onChange: setValue,
    },
    setValue,
  ];
}

export default function Provider(props) {
  const [planName, setPlanName] = useState(null);
  const [planPricing, setPlanPricing] = useState(null);
  const [host, setHost] = useState(null);
  const [appInitialDataLoaded, setAppInitialDataLoaded] = useState(false);
  const [shopName, setShopName] = useState(null);
  const [storeDomain, setStoreDomain] = useState(null);
  const [embedBlockStatus, setEmbedBlockStatus] = useState(null);
  const [passwordProtectionStatus, setPasswordProtectionStatus] = useState(
    null
  );
  const [isReviewModalShown, setIsReviewModalShown] = useState(false);
  const [isReviewBannerClosed, setIsReviewBannerClosed] = useState(false);

  // Dashboard schema status

  const [homePageSchemaStatus, setHomePageSchemaStatus] = useState(true);
  const [productPageSchemaStatus, setProductPageSchemaStatus] = useState(true);
  const [collectionPageSchemaStatus, setCollectionPageSchemaStatus] = useState(
    true
  );
  const [articlePageSchemaStatus, setArticlePageSchemaStatus] = useState(true);
  const [blogPageSchemaStatus, setBlogPageSchemaStatus] = useState(true);
  const [faqSchemaStatus, setFAQSchemaStatus] = useState(true);
  const [sitelinksSchemaStatus, setSitelinksSchemaStatus] = useState(true);
  const [carouselSchemaStatus, setCarouselSchemaStatus] = useState(true);

  // Shop Details State
  const [shopBrand, setShopBrand] = useInputHandle("");
  const [shopDescription, setShopDescription] = useInputHandle("");
  const [shopFounders, setShopFounders] = useInputHandle("");
  const [shopFoundingDate, setShopFoundingDate] = useInputHandle("");
  const [shopFoundingLocation, setShopFoundingLocation] = useInputHandle("");
  const [shopKnowsAbout, setShopKnowsAbout] = useInputHandle("");
  const [shopLegalName, setShopLegalName] = useInputHandle("");
  const [leiCode, setLeiCode] = useInputHandle("");
  const [logoUrl, setLogoUrl] = useInputHandle("");
  const [numberOfEmployees, setNumberOfEmployees] = useInputHandle("");
  const [ownershipFundingInfoUrl, setOwnershipFundingInfoUrl] = useInputHandle(
    ""
  );
  const [shopSlogan, setShopSlogan] = useInputHandle("");
  const [awards, setAwards] = useInputHandle("");
  const [tickerSymbol, setTickerSymbol] = useInputHandle("");

  // Social Profiles State
  const [facebookLink, setFacebookLink] = useInputHandle("");
  const [twitterLink, setTwitterLink] = useInputHandle("");
  const [snapchatLink, setSnapchatLink] = useInputHandle("");
  const [instagramLink, setInstagramLink] = useInputHandle("");
  const [youtubeLink, setYoutubeLink] = useInputHandle("");
  const [linkedinLink, setLinkedinLink] = useInputHandle("");
  const [pinterestLink, setPinterestLink] = useInputHandle("");
  const [tiktokLink, setTiktokLink] = useInputHandle("");

  // FAQ data state
  const [faqData, setFaqData] = useState([]);

  const setHomePageDataHandler = useCallback(
    (data) => {
      const { homePageData } = data;

      setHomePageSchemaStatus(data.homePageSchemaStatus);
      setCollectionPageSchemaStatus(data.collectionPageSchemaStatus);
      setProductPageSchemaStatus(data.productPageSchemaStatus);
      setArticlePageSchemaStatus(data.articlePageSchemaStatus);
      setBlogPageSchemaStatus(data.blogPageSchemaStatus);
      setFAQSchemaStatus(data.faqSchemaStatus);
      setSitelinksSchemaStatus(data.sitelinksSchemaStatus);
      setCarouselSchemaStatus(data.carouselSchemaStatus);

      setFaqData(homePageData.faqData || []);

      if (homePageData?.shopBrand) {
        setShopBrand(homePageData.shopBrand);
        setShopDescription(homePageData.shopDescription);
        setShopFounders(homePageData.shopFounders.join(","));
        setShopFoundingDate(homePageData.shopFoundingDate);
        setShopFoundingLocation(homePageData.shopFoundingLocation);
        setShopKnowsAbout(homePageData.shopKnowsAbout);
        setShopLegalName(homePageData.shopLegalName);
        setLeiCode(homePageData.leiCode);
        setLogoUrl(homePageData.logoUrl);
        setNumberOfEmployees(homePageData.numberOfEmployees);
        setOwnershipFundingInfoUrl(homePageData.ownershipFundingInfoUrl);
        setShopSlogan(homePageData.shopSlogan);
        setAwards(homePageData.awards);
        setTickerSymbol(homePageData.tickerSymbol.join(","));
        setFacebookLink(homePageData.socialProfiles[0]);
        setTwitterLink(homePageData.socialProfiles[1]);
        setSnapchatLink(homePageData.socialProfiles[2]);
        setInstagramLink(homePageData.socialProfiles[3]);
        setYoutubeLink(homePageData.socialProfiles[4]);
        setLinkedinLink(homePageData.socialProfiles[5]);
        setPinterestLink(homePageData.socialProfiles[6]);
        setTiktokLink(homePageData.socialProfiles[7]);
      }
    },
    [
      setAwards,
      setFacebookLink,
      setInstagramLink,
      setLeiCode,
      setLinkedinLink,
      setLogoUrl,
      setNumberOfEmployees,
      setOwnershipFundingInfoUrl,
      setPinterestLink,
      setShopBrand,
      setShopDescription,
      setShopFounders,
      setShopFoundingDate,
      setShopFoundingLocation,
      setShopKnowsAbout,
      setShopLegalName,
      setShopSlogan,
      setSnapchatLink,
      setTickerSymbol,
      setTwitterLink,
      setYoutubeLink,
      setTiktokLink,
    ]
  );

  return (
    <MainContext.Provider
      value={{
        planName,
        setPlanName,
        planPricing,
        setPlanPricing,
        host,
        setHost,
        appInitialDataLoaded,
        setAppInitialDataLoaded,
        homePageSchemaStatus,
        setHomePageSchemaStatus,
        productPageSchemaStatus,
        setProductPageSchemaStatus,
        collectionPageSchemaStatus,
        setCollectionPageSchemaStatus,
        articlePageSchemaStatus,
        setArticlePageSchemaStatus,
        blogPageSchemaStatus,
        setBlogPageSchemaStatus,
        faqSchemaStatus,
        setFAQSchemaStatus,
        sitelinksSchemaStatus,
        setSitelinksSchemaStatus,
        carouselSchemaStatus,
        setCarouselSchemaStatus,
        shopBrand,
        setShopBrand,
        shopDescription,
        setShopDescription,
        shopFounders,
        setShopFounders,
        shopFoundingDate,
        setShopFoundingDate,
        shopFoundingLocation,
        setShopFoundingLocation,
        shopKnowsAbout,
        setShopKnowsAbout,
        shopLegalName,
        setShopLegalName,
        leiCode,
        setLeiCode,
        logoUrl,
        setLogoUrl,
        numberOfEmployees,
        setNumberOfEmployees,
        ownershipFundingInfoUrl,
        setOwnershipFundingInfoUrl,
        shopSlogan,
        setShopSlogan,
        awards,
        setAwards,
        tickerSymbol,
        setTickerSymbol,
        facebookLink,
        setFacebookLink,
        twitterLink,
        setTwitterLink,
        snapchatLink,
        setSnapchatLink,
        instagramLink,
        setInstagramLink,
        youtubeLink,
        setYoutubeLink,
        linkedinLink,
        setLinkedinLink,
        pinterestLink,
        setPinterestLink,
        tiktokLink,
        setTiktokLink,
        setHomePageDataHandler,
        shopName,
        setShopName,
        storeDomain,
        setStoreDomain,
        embedBlockStatus,
        setEmbedBlockStatus,
        passwordProtectionStatus,
        setPasswordProtectionStatus,
        isReviewModalShown,
        setIsReviewModalShown,
        isReviewBannerClosed,
        setIsReviewBannerClosed,
        faqData,
        setFaqData,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}
