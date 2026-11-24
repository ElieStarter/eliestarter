import { useEffect } from "react";
import heroImage from "./atelier-eliestudio.jpg";
import { linkedIn, services } from "./freelanceContent";

const title = "ÉlieStudio | Graphiste freelance, logos et identité visuelle";
const description =
  "ÉlieStudio, graphiste freelance. Création de logos, identités visuelles, chartes graphiques et supports imprimés ou numériques. Demandez un devis pour votre projet.";

const useFreelanceSeo = (siteOrigin) => {
  useEffect(() => {
    const pageUrl = new URL("/el-freelance", siteOrigin || window.location.origin).href;
    const imageUrl = new URL(heroImage, window.location.origin).href;
    const previousTitle = document.title;
    document.title = title;

    const tags = [
      ["meta", "name", "description", "content", description],
      ["link", "rel", "canonical", "href", pageUrl],
      ["meta", "property", "og:type", "content", "website"],
      ["meta", "property", "og:site_name", "content", "ÉlieStudio"],
      ["meta", "property", "og:title", "content", title],
      ["meta", "property", "og:description", "content", description],
      ["meta", "property", "og:url", "content", pageUrl],
      ["meta", "property", "og:image", "content", imageUrl],
      ["meta", "name", "twitter:card", "content", "summary_large_image"],
      ["meta", "name", "twitter:title", "content", title],
      ["meta", "name", "twitter:description", "content", description],
      ["meta", "name", "twitter:image", "content", imageUrl],
    ];

    const restore = tags.map(([tag, attribute, key, valueAttribute, value]) => {
      const existing = document.head.querySelector(`${tag}[${attribute}="${key}"]`);
      const element = existing || document.createElement(tag);
      const previousValue = element.getAttribute(valueAttribute);

      element.setAttribute(attribute, key);
      element.setAttribute(valueAttribute, value);
      if (!existing) document.head.appendChild(element);

      return () => {
        if (!existing) element.remove();
        else if (previousValue === null) element.removeAttribute(valueAttribute);
        else element.setAttribute(valueAttribute, previousValue);
      };
    });

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: pageUrl,
      inLanguage: "fr",
      mainEntity: {
        "@type": "Service",
        name: "Graphisme freelance",
        serviceType: services.map((service) => service.title),
        provider: {
          "@type": "Person",
          name: "Élie",
          alternateName: "ÉlieStudio",
          jobTitle: "Graphiste freelance",
          sameAs: linkedIn,
        },
        url: pageUrl,
      },
    });
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      restore.forEach((restoreTag) => restoreTag());
      schema.remove();
    };
  }, [siteOrigin]);
};

export default useFreelanceSeo;
