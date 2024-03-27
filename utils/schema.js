export const homePageSchema = `{% if shop.metafields.hello_rich_snippets.home_page_schema_status == "enabled" and request.page_type == "index" %}
    <script id="hello_rich_snippets_home_page" type="application/ld+json">
    {
        "@context" : "http://schema.org",
        "@type" : "Corporation"
        {%- if shop.metafields.hello_rich_snippets.json_ld.value.shopBrand != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
       	,"brand": "{{shop.metafields.hello_rich_snippets.json_ld.value.shopBrand}}"
        {%- endif -%}
        
        {%- if shop.metafields.hello_rich_snippets.json_ld.value.shopDescription != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"description": "{{shop.metafields.hello_rich_snippets.json_ld.value.shopDescription}}"
        {%- endif -%}
        
        {%- if shop.name != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"name" : "{{shop.name}}"
        {%- endif -%}
        
        {%- assign shopFoundersString = shop.metafields.hello_rich_snippets.json_ld.value.shopFounders | join: '' -%}
        {%- if shopFoundersString != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"founders": {{ shop.metafields.hello_rich_snippets.json_ld.value.shopFounders | json }}
        {%- endif -%}
        
        
        {%- if shop.metafields.hello_rich_snippets.json_ld.value.shopFoundingDate != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"foundingDate": "{{shop.metafields.hello_rich_snippets.json_ld.value.shopFoundingDate}}"
        {%- endif -%}
        
        
        {%- if shop.metafields.hello_rich_snippets.json_ld.value.shopFoundingLocation != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"foundingLocation": "{{shop.metafields.hello_rich_snippets.json_ld.value.shopFoundingLocation}}"
        {%- endif -%}
        
        
        
        {%- if shop.metafields.hello_rich_snippets.json_ld.value.shopKnowsAbout != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"knowsAbout": "{{shop.metafields.hello_rich_snippets.json_ld.value.shopKnowsAbout}}"
        {%- endif -%}
        
        
        
        
        {%- if shop.metafields.hello_rich_snippets.json_ld.value.shopLegalName != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"legalName": "{{shop.metafields.hello_rich_snippets.json_ld.value.shopLegalName}}"
        {%- endif -%}
        
        
        
        {%- if shop.metafields.hello_rich_snippets.json_ld.value.leiCode != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"leiCode": "{{shop.metafields.hello_rich_snippets.json_ld.value.leiCode}}"
        {%- endif -%}
        
        
        {%- if shop.metafields.hello_rich_snippets.json_ld.value.logoUrl != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"logo" : "{{shop.metafields.hello_rich_snippets.json_ld.value.logoUrl}}"
        {%- endif -%}
        
        
        
        {%- if shop.metafields.hello_rich_snippets.json_ld.value.numberOfEmployees != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"numberOfEmployees": "{{shop.metafields.hello_rich_snippets.json_ld.value.numberOfEmployees}}"
        {%- endif -%}
        
        
       
        
        {%- if shop.metafields.hello_rich_snippets.json_ld.value.ownershipFundingInfoUrl != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"ownershipFundingInfo": "{{shop.metafields.hello_rich_snippets.json_ld.value.ownershipFundingInfoUrl}}"
        {%- endif -%}
        
        
        {%- if shop.domain != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"url" : "https://{{shop.domain}}"
        {%- endif -%}
  

        {%- assign socialProfilesString = shop.metafields.hello_rich_snippets.json_ld.value.socialProfiles | join: '' -%}
        {%- if socialProfilesString != blank -%}
          {% capture newLine %}
		  {% endcapture %}
          {% assign socialProfilesArray = '' | split: '' %}
          {%- for singleLink in shop.metafields.hello_rich_snippets.json_ld.value.socialProfiles -%}
              {%- if singleLink != blank -%}
              
              {% assign addCommaSingleLink = singleLink | append : ',' | split: ',' %}
              
                  {% assign socialProfilesArray = socialProfilesArray | concat: addCommaSingleLink %}
              {%- endif -%}
            {%- endfor -%}
          
      	,"sameAs" : {{ socialProfilesArray | json }}
        {%- endif -%}
        
        
        {%- if shop.metafields.hello_rich_snippets.json_ld.value.shopSlogan != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"slogan": "{{shop.metafields.hello_rich_snippets.json_ld.value.shopSlogan}}"
        {%- endif -%}
        
        
        {%- assign tickerSymbolString = shop.metafields.hello_rich_snippets.json_ld.value.tickerSymbol | join: '' -%}
        {%- if tickerSymbolString != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"tickerSymbol": {{ shop.metafields.hello_rich_snippets.json_ld.value.tickerSymbol | json }}
        {%- endif -%}
        
        
        {%- if shop.metafields.hello_rich_snippets.json_ld.value.awards != blank -%}
        	{% capture newLine %}
		  	{% endcapture %}
        ,"awards": "{{shop.metafields.hello_rich_snippets.json_ld.value.awards}}"
        {%- endif -%}
        
        {% capture newLine %}
		{% endcapture %}   
        
    }
    </script>
    <script type="application/ld+json" id="hello_rich_snippets_search_schema">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "{{ shop.url }}",
        "name": {{ shop.name | json }},
        "potentialAction": {
            "@type": "SearchAction",
            "target": "{{ shop.url }}/search?q={query}",
            "query-input": "required name=query"
        }
    }
    </script>
{% endif %}
`;

export const collectionPageSchema = `{% if shop.metafields.hello_rich_snippets.collection_page_schema_status == "enabled" and request.page_type == "collection" %}
<script type="application/ld+json" id="hello_rich_snippets_collection_page">
  {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": {{ shop.url | json }}
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": {{ collection.title | json}},
        "item": {{ shop.url | append: collection.url | json }}
      }
    ]
  }
</script> 
{% endif %}
`;

export const productPageSchema = `{% if shop.metafields.hello_rich_snippets.product_page_schema_status == "enabled" and request.page_type == "product" %}
  {%- assign current_variant = product.selected_or_first_available_variant -%}
	<script id="hello_rich_snippets_product_page" type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "Product",
        "category": "{{product.type}}",
        "url": {{ shop.url | append: product.url | json }},
        "description": {{ product.description | strip_html | json }},
        "name": {{ product.title | json }},
        {%- if product.featured_media -%}
          {%- assign media_size = product.featured_media.preview_image.width | append: 'x' -%}
          "image": [
            {{ product.featured_media | img_url: media_size | prepend: "https:" | json }}
          ],
  	    {%- endif -%}
        "brand": { "@type": "Brand", "name": {{ product.vendor | json }} },
        {%- if current_variant.sku != blank -%}
        "sku": {{ current_variant.sku | json }},
        "mpn": "{{ product.selected_or_first_available_variant.barcode | default: product.selected_or_first_available_variant.sku }}",
        {%- endif -%}
      
      {%- assign __variantPrices = product.variants | map: 'price' -%}
      {%- assign __high_price = __variantPrices.first | divided_by: 100.00 -%}
      {%- assign __low_price = __variantPrices.first | divided_by: 100.00 -%}
      
      {%- for variant_price in __variantPrices -%}
        {%- assign __temp_price = variant_price | divided_by: 100.00 -%}
      
        {%- if __temp_price > __high_price -%}
          {%- assign __high_price = __temp_price -%}
        {%- endif -%}	
        {%- if __temp_price < __low_price  -%}
          {%- assign __low_price = __temp_price -%}
        {%- endif -%}
        
      {%- endfor -%}
        "offers": {
          "@type":"AggregateOffer",
          "availability": "http://schema.org/{% if product.available %}InStock{% else %}OutOfStock{% endif %}",
          "lowPrice": {{ __low_price | json }},
          "highPrice": {{ __high_price | json }},
          "offerCount": {{__variantPrices | size | json}},
          "priceCurrency": {{ cart.currency.iso_code | json }}
       }
        
        {%- assign r_review_value = "" %}
        {%- assign r_review_count = "" %}
        {%- assign r_review_provider = "" %}

        {%- if product.metafields.yotpo.reviews_count and product.metafields.yotpo.reviews_count != "0" -%}
        {%- assign r_review_value = product.metafields.yotpo.reviews_average %}
        {%- assign r_review_count = product.metafields.yotpo.reviews_count %}
        {%- assign r_review_provider = "yotpo" -%}
        {%- endif -%}

        {%- if product.metafields.orankl.reviews_count and product.metafields.orankl.reviews_count != "0" -%}
        {%- assign r_review_value = product.metafields.orankl.rating %}
        {%- assign r_review_count = product.metafields.orankl.reviews_count %}
        {%- assign r_review_provider = "orankl" -%}
        {%- endif -%}

        {%- if product.metafields.loox.num_reviews and product.metafields.loox.num_reviews != "0" -%}
        {%- assign r_review_value = product.metafields.loox.avg_rating %}
        {%- assign r_review_count = product.metafields.loox.num_reviews %}
        {%- assign r_review_provider = "loox" -%}
        {%- endif -%}

        {%- if product.metafields.ssw.count_rate and product.metafields.ssw.count_rate != "0" -%}
        {%- assign r_review_value = product.metafields.ssw.avg_rate %}
        {%- assign r_review_count = product.metafields.ssw.count_rate %}
        {%- assign r_review_provider = "ssw" -%}
        {%- endif -%}

        {%- if product.metafields.vnreviews.reviewCount and product.metafields.vnreviews.reviewCount != "0" -%}
        {%- assign r_review_value = product.metafields.vnreviews.ratingValue %}
        {%- assign r_review_count = product.metafields.vnreviews.reviewCount %}
        {%- assign r_review_provider = "vnreviews" -%}
        {%- endif -%}

        {%- if product.metafields.stamped.reviews_count and product.metafields.stamped.reviews_count != "0" -%}
        {%- assign r_review_value = product.metafields.stamped.reviews_average %}
        {%- assign r_review_count = product.metafields.stamped.reviews_count %}
        {%- assign r_review_provider = "stamped" -%}
        {%- endif -%}

        {%- if product.metafields.spr.reviews and product.metafields.spr.reviews != blank -%}
            {% assign r_review_count = product.metafields.spr.reviews | split: 'reviewCount" content="' | last | split: '"' |first | plus: 0 %}
            {% assign r_review_value = product.metafields.spr.reviews | split: 'ratingValue" content="' | last | split: '"' |first | plus: 0 %}
            {% if r_review_count == 0 and r_review_value == 0 %}
              {% assign r_review_count = product.metafields.spr.reviews | split: 'votes" content="' | last | split: '"' |first | plus: 0 %}
              {% assign r_review_value = product.metafields.spr.reviews | split: 'average" content="' | last | split: '"' |first | plus: 0  %}
            {% endif %}
            {% if r_review_count == 0 and r_review_value == 0 %}
              {% assign r_review_count = product.metafields.spr.reviews | split: 'reviewCount": "' | last | split: '"' |first | plus: 0 %}
              {% assign r_review_value = product.metafields.spr.reviews | split: 'ratingValue": "' | last | split: '"' |first | plus: 0  %}
            {% endif %}
        {%- assign r_review_provider = "Shopify Product Reviews" -%}
        {%- endif -%}

        {%- if product.metafields.judgeme.widget -%}
        {%- assign r_review_value = product.metafields.judgeme.widget | split: "data-average-rating='" | last | split: "'" | first | plus: 0 %}
        {%- assign r_review_count = product.metafields.judgeme.widget | split: "data-number-of-reviews='" | last | split: "'" | first | plus: 0 %}
        {%- assign r_review_provider = "judgeme" -%}
        {%- endif -%}

        {% if r_review_provider != blank and r_review_value != blank and r_review_count != blank and r_review_count != "0" and r_review_count != 0 %},
        "aggregateRating": {
        "@type": "AggregateRating",
        "description": "{{ r_review_provider }}",
        "ratingValue": {{ r_review_value }},
        "ratingCount": {{ r_review_count }}
        },
        "review":{
           "@type":"Review",
           "reviewRating":{
              "@type":"Rating",
              "ratingValue":"5",
              "bestRating":"5"
           },
           "author":{
              "@type":"Person",
              "name": {{ shop.name | json }}
           }
        }
        {% endif %}
	  }

    </script>
  
  	<script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": {{ shop.url | json }}
          },
          {%- if product.collections[0].title != blank -%}
           {
            "@type": "ListItem",
            "position": 2,
            "name": {{product.collections[0].title | json}},
            "item": {{ shop.url | append: product.collections[0].url | json }}
          },
          {%- endif -%}
          {
            "@type": "ListItem",
            "position": {%- if product.collections[0].title != blank -%} 3 {%- else -%} 2 {%- endif -%},
            "name": {{product.title | json}},
            "item": {{ shop.url | append: product.url | json }}
          }

        ]
      }
    </script>
    
{% endif %}
`;

export const articlePageSchema = `
{% if shop.metafields.hello_rich_snippets.article_page_schema_status == "enabled" and request.page_type == "article" %}
  <script type="application/ld+json" id="hello_rich_snippets_article_page">
  {
      "@context": "http://schema.org",
      "@type": "Article",
      "articleBody": {{ article.content | strip_html | json }},
      "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": {{ shop.url | append: page.url | json }}
      },
      "headline": {{ article.title | json }},
      {% if article.excerpt != blank %}
          "description": {{ article.excerpt | strip_html | json }},
      {% endif %}
      {% if article.image %}
          {% assign image_size = article.image.width | append: 'x' %}
          "image": [
              {{ article | img_url: image_size | prepend: "https:" | json }}
          ],
      {% endif %}
      "datePublished": {{ article.published_at | date: '%Y-%m-%dT%H:%M:%SZ' | json }},
      "dateCreated": {{ article.created_at | date: '%Y-%m-%dT%H:%M:%SZ' | json }},
      "author": {
          "@type": "Person",
          "name": {{ article.author | json }},
		      "url": {{ article.url | json }}
      },
      "publisher": {
          "@type": "Organization",
          "name": {{ shop.name | json }}
      }
  }
  </script>
{% endif %}
`;

export const blogPageSchema = `
{% if shop.metafields.hello_rich_snippets.blog_page_schema_status == "enabled" and request.page_type == "blog" %}
<script type="application/ld+json" id="hello_rich_snippets_blog_page">
    {
        "@context": "https://schema.org",
        "@type": "Blog",
        "url": "{{ shop.url | append: blog.url }}"
    {%- if blog.articles != blank %},
        "blogPosts": [
        {%- for article in blog.articles %}
            {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": {{ article.title | strip_html | strip_newlines | strip | escape | json}},
                "mainEntityOfPage": "{{ shop.url | append: article.url }}",
                "image": {
                    "@type": "ImageObject",
                    "url": "{{ article.image.src | img_url: "1024x1024" | prepend: "https:" }}",
                    "width": 1024,
                    "height": 1024
                },
                "url": "{{ shop.url | append: article.url }}",
                "datePublished": "{{ article.published_at }}",
                "dateModified": "{{ article.published_at }}",
                "dateCreated": "{{ article.created_at }}",
            {%- if article.excerpt != blank %}
                "description": {{ article.excerpt | strip_html | truncatewords: 25 | json }},
            {%- endif %}
                "author": {
                    "@type": "Person",
                    "name": "{{ article.author }}",
                    "url": {{ article.url | json }}
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "{{ shop.name }}"
                }
            }{% unless forloop.last %},{% endunless %}
        {%- endfor %}
        ]
    {%- endif %}
    }
</script>
{% endif %}
`;
