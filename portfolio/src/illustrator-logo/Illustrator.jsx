import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../main/Navbar";
import Footer from "../main/Footer";
import PresentationBrand from "../main/PresentationBrand";
import illustratorLogo from "./illustratorpng.png";

// const API_URL = "http://localhost:1337";
const API_URL = "https://api.eliestudio.com";

const pageTitle = "Logos et identités visuelles | ÉlieStudio";
const pageDescription = "Découvrez les logos clients et les créations personnelles d’ElieStudio, une galerie de design de logos et d’identités visuelles réalisés avec Adobe Illustrator.";
const container = "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12";
const contactEmail = "el.contact.freelance@gmail.com";

const galleries = [
  {
    category: "client",
    id: "logos-clients",
    title: "Logos clients",
    description: "Des logos conçus pour donner aux marques et aux entreprises une identité reconnaissable.",
    empty: "Les premiers logos clients seront publiés ici.",
  },
  {
    category: "personnel",
    id: "creations-personnelles",
    title: "Créations personnelles",
    description: "Mes explorations graphiques autour des formes, des symboles et de la typographie.",
    empty: "Aucune création personnelle publiée pour le moment.",
  },
];

const getField = (item, fieldName) => {
  return item?.[fieldName] ?? item?.attributes?.[fieldName];
};

const getPlainText = (value, fallback = "") => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);

  if (Array.isArray(value)) {
    const text = value
      .map((item) => getPlainText(item, ""))
      .filter(Boolean)
      .join(" ")
      .trim();

    return text || fallback;
  }

  if (typeof value === "object") {
    if (typeof value.text === "string") return value.text;
    if (typeof value.value === "string") return value.value;

    if (Array.isArray(value.children)) {
      const text = value.children
        .map((child) => getPlainText(child, ""))
        .join("")
        .trim();

      return text || fallback;
    }
  }

  return fallback;
};

const getTextBlocks = (value) =>
  (Array.isArray(value) ? value : [value])
    .map((block) => getPlainText(block).trim())
    .filter(Boolean);

const normalizeMediaUrl = (url) => {
  if (!url || typeof url !== "string") return null;
  return url.startsWith("http") ? url : `${API_URL}${url}`;
};

const findMediaUrl = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findMediaUrl(item);
      if (found) return found;
    }

    return null;
  }

  if (typeof value === "object") {
    if (typeof value.url === "string") return value.url;

    const directKeys = ["data", "attributes", "media", "file", "image"];

    for (const key of directKeys) {
      const found = findMediaUrl(value[key]);
      if (found) return found;
    }

    if (value.formats) {
      const preferredFormats = [
        value.formats.large,
        value.formats.medium,
        value.formats.small,
        value.formats.thumbnail,
      ];

      for (const format of preferredFormats) {
        const found = findMediaUrl(format);
        if (found) return found;
      }
    }
  }

  return null;
};

const getMediaUrl = (item) => {
  const media = getField(item, "media") ?? getField(item, "logo");
  return normalizeMediaUrl(findMediaUrl(media));
};

const fetchLogos = async (signal) => {
  const endpoint = new URL("/api/logos", API_URL);
  endpoint.searchParams.set("populate", "*");
  endpoint.searchParams.set("sort", "id:asc");
  endpoint.searchParams.set("pagination[pageSize]", "50");

  const logos = [];
  let pageCount = 1;

  for (let page = 1; page <= pageCount; page += 1) {
    endpoint.searchParams.set("pagination[page]", String(page));
    const response = await fetch(endpoint, { signal });
    if (!response.ok) throw new Error(`Strapi HTTP ${response.status}`);

    const payload = await response.json();
    if (!Array.isArray(payload?.data)) throw new Error("Réponse Strapi inattendue.");

    logos.push(...payload.data);
    pageCount = payload.meta?.pagination?.pageCount ?? 1;
  }

  return logos;
};

const useIllustratorSeo = () => {
  useEffect(() => {
    const pageUrl = new URL("/illustrator", window.location.origin).href;
    const previousTitle = document.title;
    document.title = pageTitle;

    const fields = [
      ["meta", "name", "description", "content", pageDescription],
      ["link", "rel", "canonical", "href", pageUrl],
      ["meta", "property", "og:type", "content", "website"],
      ["meta", "property", "og:site_name", "content", "ÉlieStudio"],
      ["meta", "property", "og:title", "content", pageTitle],
      ["meta", "property", "og:description", "content", pageDescription],
      ["meta", "property", "og:url", "content", pageUrl],
    ];

    const restore = fields.map(([tag, attribute, key, target, value]) => {
      const existing = document.head.querySelector(`${tag}[${attribute}="${key}"]`);
      const node = existing || document.createElement(tag);
      const previousValue = node.getAttribute(target);
      node.setAttribute(attribute, key);
      node.setAttribute(target, value);
      if (!existing) document.head.appendChild(node);

      return () => {
        if (!existing) node.remove();
        else if (previousValue === null) node.removeAttribute(target);
        else node.setAttribute(target, previousValue);
      };
    });

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: pageTitle,
      description: pageDescription,
      url: pageUrl,
      inLanguage: "fr",
    });
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      restore.forEach((restoreField) => restoreField());
      schema.remove();
    };
  }, []);
};

const LogoCard = ({ logo, light, reduceMotion, index }) => {
  const title = getPlainText(getField(logo, "title") ?? getField(logo, "text")).trim() || "Logo sans titre";
  const descriptionBlocks = getTextBlocks(getField(logo, "description"));
  const imageUrl = getMediaUrl(logo);
  const [failedImage, setFailedImage] = useState(null);
  const showImage = imageUrl && failedImage !== imageUrl;

  return (
    <motion.article
      initial={reduceMotion ? false : { y: 18, opacity: 0.88 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : (index % 3) * 0.06, ease: "easeOut" }}
      className={`group flex min-w-0 flex-col overflow-hidden rounded-lg border transition-[border-color,box-shadow] duration-300 hover:border-[#21c7a8] hover:shadow-[0_12px_30px_#07111f26] focus-within:border-[#21c7a8] ${
        light ? "border-[#cfddd7] bg-white shadow-[0_4px_14px_#07111f0a]" : "border-white/15 bg-[#0b2231]"
      }`}
    >
      <div className="relative isolate grid aspect-[4/3] place-items-center overflow-hidden border-b border-[#d4e2dd] bg-[#f1f6f3] p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#173c3212_1px,transparent_1px),linear-gradient(to_bottom,#173c3212_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(135deg,black,transparent_75%)]"
        />
        {showImage ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            onError={() => setFailedImage(imageUrl)}
            className="relative h-full min-h-0 w-full object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.06]"
          />
        ) : (
          <span className="text-sm font-medium text-[#355452]">Visuel indisponible</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <h3 className="break-words font-playfair text-2xl font-bold leading-snug sm:text-3xl">{title}</h3>

        {descriptionBlocks.length > 0 && (
          <div className={`mt-3 space-y-2 whitespace-pre-line break-words text-sm leading-6 ${light ? "text-[#355452]" : "text-[#c3dbd8]"}`}>
            {descriptionBlocks.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        )}

        {imageUrl && (
          <div className="mt-auto pt-6">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Voir le logo ${title} (nouvel onglet)`}
              className={`group/link flex min-h-12 w-full items-center justify-between gap-3 rounded-md px-4 py-2.5 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21c7a8] ${
                light ? "bg-[#07111f] text-white hover:bg-[#17483d]" : "bg-[#21c7a8] text-[#07111f] hover:bg-[#6ce0c9]"
              }`}
            >
              Voir le logo
              <i className="fas fa-external-link-alt shrink-0 motion-safe:transition-transform motion-safe:group-hover/link:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
};

const LogoGallery = ({ gallery, logos, status, reduceMotion }) => {
  const light = gallery.category === "client";
  const secondaryText = light ? "text-[#355452]" : "text-[#c3dbd8]";

  return (
    <section
      id={gallery.id}
      aria-labelledby={`${gallery.id}-title`}
      tabIndex={-1}
      className={`scroll-mt-28 py-10 focus:outline-none sm:py-16 ${light ? "bg-[#eff5f2] text-[#07111f]" : "bg-[#011627] text-white"}`}
    >
      <div className={container}>
        <motion.div
          initial={reduceMotion ? false : { y: 14, opacity: 0.85 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
        >
          <h2 id={`${gallery.id}-title`} className="font-playfair text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {gallery.title}
          </h2>
          <p className={`mt-3 max-w-2xl leading-7 ${secondaryText}`}>{gallery.description}</p>
        </motion.div>

        {status === "loading" && (
          <p role="status" className={`mt-7 border-t border-current/20 pt-5 text-sm ${secondaryText}`}>
            Chargement des logos…
          </p>
        )}

        {status === "ready" && (logos.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {logos.map((logo, index) => (
              <LogoCard key={logo.documentId ?? logo.id} logo={logo} light={light} reduceMotion={reduceMotion} index={index} />
            ))}
          </div>
        ) : (
          <p className={`mt-7 border-t border-current/20 pt-5 text-sm ${secondaryText}`}>{gallery.empty}</p>
        ))}
      </div>
    </section>
  );
};

const IllustratorContact = ({ reduceMotion }) => (
  <section
    id="contact-illustrator"
    aria-labelledby="contact-illustrator-title"
    tabIndex={-1}
    className="scroll-mt-28 border-t border-[#e0c4b9] bg-[#eff5f2] py-9 text-[#07111f] focus:outline-none sm:py-12"
  >
    <motion.div
      className={`${container} grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-12`}
      initial={reduceMotion ? false : { y: 14, opacity: 0.85 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
    >
      <div>
        <h2 id="contact-illustrator-title" className="font-playfair text-3xl font-bold leading-tight sm:text-4xl">
          Parlons de votre projet
        </h2>
        <p className="mt-3 max-w-md leading-7 text-[#59423e]">
          Un logo à créer ou une identité visuelle à faire évoluer ? Parlez-moi de votre idée.
        </p>
      </div>

      <div className="min-w-0 rounded-lg border border-white/15 bg-[#0b2231] p-4 text-white transition-[border-color,box-shadow] duration-300 hover:border-[#21c7a8] hover:shadow-[0_12px_30px_#07111f26] focus-within:border-[#21c7a8] sm:p-5">
        <address className="border-b border-white/15 pb-4 not-italic">
          <a
            href={`mailto:${contactEmail}`}
            className="group flex min-h-11 items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#21c7a8]"
          >
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white/10 text-[#21c7a8]">
              <i className="fas fa-envelope" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-[#c3dbd8]">E-mail</span>
              <span className="block font-bold [overflow-wrap:anywhere] group-hover:text-[#21c7a8] group-hover:underline">{contactEmail}</span>
            </span>
          </a>
        </address>

        <Link
          to="/contact"
          className="mt-4 flex min-h-12 w-full items-center justify-between gap-3 rounded-md bg-[#21c7a8] px-4 py-2.5 text-sm font-bold text-[#07111f] transition-colors hover:bg-[#6ce0c9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21c7a8]"
        >
          Accéder à la page Contact
          <i className="fas fa-arrow-right shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  </section>
);

const Illustrator = () => {
  useIllustratorSeo();
  const reduceMotion = useReducedMotion();
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const logoOffset = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const [result, setResult] = useState({ status: "loading", logos: [] });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = reduceMotion ? "auto" : "smooth";

    return () => {
      root.style.scrollBehavior = previousBehavior;
    };
  }, [reduceMotion]);

  useEffect(() => {
    const controller = new AbortController();

    fetchLogos(controller.signal)
      .then((logos) => {
        if (!controller.signal.aborted) setResult({ status: "ready", logos });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Erreur de chargement des logos :", error);
        setResult({ status: "error", logos: [] });
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = () => {
    setResult({ status: "loading", logos: [] });
    setAttempt((previous) => previous + 1);
  };

  const byCategory = { client: [], personnel: [] };
  for (const logo of result.logos) {
    const category = getField(logo, "categorie") === "client" ? "client" : "personnel";
    byCategory[category].push(logo);
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-white" lang="fr">
      <Navbar />

      <main>
        <header ref={headerRef} className="overflow-hidden border-b border-white/10">
          <div className={`${container} relative py-10 sm:py-14 lg:py-20`}>
            <motion.div
              className="relative sm:max-w-[63%] xl:max-w-[68%]"
              initial={reduceMotion ? false : { y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
            >
              <motion.div className="mb-4" style={reduceMotion ? undefined : { y: logoOffset }}>
                <PresentationBrand toolLogo={illustratorLogo} toolName="Adobe Illustrator" />
              </motion.div>
              <h1 className="font-playfair text-4xl font-bold leading-none sm:text-5xl lg:text-7xl">
                Logos &amp; identités visuelles
              </h1>
              <p className="mt-5 max-w-xl leading-7 text-[#c3dbd8] sm:text-lg">
                Des logos réalisés pour mes clients et des créations personnelles.
              </p>

              <nav aria-label="Sections de la galerie Illustrator" className="mt-6 flex flex-wrap gap-3">
                {galleries.map((gallery) => (
                  <a
                    key={gallery.id}
                    href={`#${gallery.id}`}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#21c7a8] ${
                      gallery.category === "client"
                        ? "border-[#21c7a8] bg-[#21c7a8] text-[#07111f] hover:bg-[#6ce0c9]"
                        : "border-white/25 text-white hover:border-[#21c7a8] hover:text-[#21c7a8]"
                    }`}
                  >
                    {gallery.title} <i className="fas fa-arrow-down" aria-hidden="true" />
                  </a>
                ))}
                <a
                  href="#contact-illustrator"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-[#21c7a8] hover:text-[#21c7a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#21c7a8]"
                >
                  Contact <i className="fas fa-envelope" aria-hidden="true" />
                </a>
              </nav>
            </motion.div>
          </div>
        </header>

        {result.status === "error" && (
          <div className={`${container} flex flex-wrap items-center gap-4 py-5`}>
            <p role="alert" className="text-white/80">La galerie n’a pas pu être chargée.</p>
            <button type="button" onClick={retry} className="min-h-11 rounded-lg border border-white/25 px-4 font-bold text-[#21c7a8] hover:border-[#21c7a8]">
              Réessayer
            </button>
          </div>
        )}

        {galleries.map((gallery) => (
          <LogoGallery
            key={gallery.id}
            gallery={gallery}
            logos={byCategory[gallery.category]}
            status={result.status}
            reduceMotion={reduceMotion}
          />
        ))}

        <IllustratorContact reduceMotion={reduceMotion} />
      </main>

      <Footer />
    </div>
  );
};

export default Illustrator;
