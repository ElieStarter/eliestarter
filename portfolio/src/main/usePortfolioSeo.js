import { useEffect } from "react";
import portrait from "./portrait-elie.webp";

const usePortfolioSeo = ({ path, title, description, type, image, imageAlt, items }) => {
  useEffect(() => {
    const siteUrl = new URL("/", window.location.origin).href;
    const pageUrl = new URL(path, siteUrl).href;
    const imageUrl = new URL(image, siteUrl).href;
    const previousTitle = document.title;
    document.title = title;

    const fields = [
      ["meta", "name", "description", "content", description],
      ["link", "rel", "canonical", "href", pageUrl],
      ["meta", "property", "og:type", "content", "website"],
      ["meta", "property", "og:site_name", "content", "ElieStudio"],
      ["meta", "property", "og:locale", "content", "fr_FR"],
      ["meta", "property", "og:title", "content", title],
      ["meta", "property", "og:description", "content", description],
      ["meta", "property", "og:url", "content", pageUrl],
      ["meta", "property", "og:image", "content", imageUrl],
      ["meta", "property", "og:image:alt", "content", imageAlt],
      ["meta", "name", "twitter:card", "content", type === "CollectionPage" ? "summary_large_image" : "summary"],
      ["meta", "name", "twitter:title", "content", title],
      ["meta", "name", "twitter:description", "content", description],
      ["meta", "name", "twitter:image", "content", imageUrl],
      ["meta", "name", "twitter:image:alt", "content", imageAlt],
    ];

    const restore = fields.map(([tag, attribute, key, field, value]) => {
      const existing = document.head.querySelector(tag + "[" + attribute + '="' + key + '"]');
      const node = existing || document.createElement(tag);
      const previousValue = node.getAttribute(field);
      node.setAttribute(attribute, key);
      node.setAttribute(field, value);
      if (!existing) document.head.appendChild(node);

      return () => {
        if (!existing) node.remove();
        else if (previousValue === null) node.removeAttribute(field);
        else node.setAttribute(field, previousValue);
      };
    });

    const personId = siteUrl + "#elie-levy";
    const siteId = siteUrl + "#website";
    const collection = items?.length ? {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map(({ id, name, description: summary, image: cover, kind }, index) => {
        const mediaUrl = cover ? new URL(cover, siteUrl).href : undefined;
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": kind,
            name,
            description: summary || undefined,
            url: pageUrl + "#" + id,
            creator: { "@id": personId },
            ...(kind === "ImageObject" ? { contentUrl: mediaUrl } : { image: mediaUrl }),
          },
        };
      }),
    } : undefined;
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": personId,
          name: "Elie Levy",
          alternateName: "ElieStudio",
          jobTitle: ["Graphiste freelance", "Développeur front-end"],
          url: siteUrl,
          image: new URL(portrait, siteUrl).href,
          sameAs: ["https://linkedin.com/in/elie-levy-65b3653a3"],
        },
        {
          "@type": "WebSite",
          "@id": siteId,
          name: "ElieStudio",
          url: siteUrl,
          inLanguage: "fr",
          publisher: { "@id": personId },
        },
        {
          "@type": type,
          "@id": pageUrl + "#webpage",
          url: pageUrl,
          name: title,
          description,
          inLanguage: "fr",
          isPartOf: { "@id": siteId },
          about: type === "CollectionPage" ? { "@id": personId } : undefined,
          mainEntity: type === "CollectionPage" ? collection : { "@id": personId },
        },
      ],
    });
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      restore.forEach((restoreField) => restoreField());
      schema.remove();
    };
  }, [path, title, description, type, image, imageAlt, items]);
};

export default usePortfolioSeo;
