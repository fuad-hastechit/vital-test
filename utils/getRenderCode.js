export const getHomePageSchemaRender = () => {
  return `{% if content_for_header contains '${process.env.HOST.replace(
    /https:\/\//,
    ""
  )}' %}{% render 'hso-home-page-rich-snippets' %}{% endif %}`;
};

export const getProductPageSchemaRender = () => {
  return `{% if content_for_header contains '${process.env.HOST.replace(
    /https:\/\//,
    ""
  )}' %}{% render 'hso-product-page-rich-snippets' %}{% endif %}`;
};

export const getCollectionPageSchemaRender = () => {
  return `{% if content_for_header contains '${process.env.HOST.replace(
    /https:\/\//,
    ""
  )}' %}{% render 'hso-collection-page-rich-snippets' %}{% endif %}`;
};

export const getArticlePageSchemaRender = () => {
  return `{% if content_for_header contains '${process.env.HOST.replace(
    /https:\/\//,
    ""
  )}' %}{% render 'hso-article-page-rich-snippets' %}{% endif %}`;
};
export const getBlogPageSchemaRender = () => {
  return `{% if content_for_header contains '${process.env.HOST.replace(
    /https:\/\//,
    ""
  )}' %}{% render 'hso-blog-page-rich-snippets' %}{% endif %}`;
};
