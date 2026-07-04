import React, { useEffect, useState } from "react";
import Navbar from "../main/Navbar";
import Footer from "../main/Footer";
import illustrator from "./illustratorpng.png";
import { motion } from "framer-motion";

const API_URL = "http://localhost:1337";

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

const getTextBlocks = (value, fallback) => {
  if (value === null || value === undefined) return [fallback];
  if (typeof value === "string") return [value];

  if (Array.isArray(value)) {
    const blocks = value
      .map((item) => getPlainText(item, ""))
      .filter(Boolean);

    return blocks.length > 0 ? blocks : [fallback];
  }

  return [getPlainText(value, fallback)];
};

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

const Illustrator = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/logos?populate=*`);

        if (!res.ok) {
          throw new Error(`Erreur HTTP ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data?.data)) {
          setLogos(data.data);
        }
      } catch (error) {
        console.error("Erreur de chargement des logos :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-[#07111f] text-white"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Navbar />

      <main>
        <section className="px-6 py-16 sm:px-12 lg:px-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.82fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#21c7a8]">
                Adobe Illustrator
              </p>

              <h1 className="libre text-5xl font-black italic leading-none sm:text-7xl lg:text-8xl">
                Créations et conceptions de logos
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                Une galerie d&eacute;di&eacute;e &agrave; mes cr&eacute;ations
                vectorielles, logos, et visuels.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#21c7a8]">
                Collection logo
              </p>

              <p className="text-4xl font-black leading-tight sm:text-5xl">
                Passion et création à l'origine de l'art.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.04] px-6 py-10 sm:px-12 lg:px-24">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#21c7a8]">
                Identit&eacute; visuelle
              </p>

              <h2 className="max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
                D&eacute;couvrez mes logos r&eacute;alis&eacute;s avec Adobe
                Illustrator
              </h2>
            </div>

            <img
              src={illustrator}
              alt="Adobe Illustrator"
              className="w-36 object-contain drop-shadow-2xl sm:w-44 md:w-56"
            />
          </div>
        </section>

        <section className="px-6 py-16 sm:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="flex min-h-[360px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-[#21c7a8]" />
                  <p className="text-lg text-white/70">
                    Chargement des logos...
                  </p>
                </div>
              </div>
            ) : logos.length === 0 ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-10 text-center shadow-2xl backdrop-blur-xl">
                <p className="text-lg text-white/75">
                  Aucun logo disponible pour le moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {logos.map((logo, index) => {
                  const title = getPlainText(
                    getField(logo, "title") ?? getField(logo, "text"),
                    `Logo ${index + 1}`,
                  );
                  const descriptionBlocks = getTextBlocks(
                    getField(logo, "description"),
                    "Creation vectorielle realisee avec Adobe Illustrator.",
                  );
                  const imageUrl = getMediaUrl(logo);

                  return (
                    <article
                      key={logo.id || title}
                      className="group flex min-h-[520px] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#21c7a8]/70"
                    >
                      <div className="flex h-72 items-center justify-center bg-[#f7faf9] p-8">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={title}
                            className="max-h-56 w-full object-contain transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-36 w-36 items-center justify-center rounded-full border border-[#21c7a8]/40 bg-[#21c7a8]/10 text-4xl font-black text-[#21c7a8]">
                            Ai
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-7">
                        <span className="mb-4 inline-flex w-fit rounded-full bg-[#21c7a8] px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#07111f]">
                          Logo {index + 1}
                        </span>

                        <h3 className="mb-3 text-2xl font-black leading-tight">
                          {title}
                        </h3>

                        <div className="mb-7 space-y-3 leading-7 text-white/65">
                          {descriptionBlocks.map((paragraph, paragraphIndex) => (
                            <p key={`${logo.id || title}-${paragraphIndex}`}>
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {imageUrl && (
                          <a
                            href={imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-4 font-bold text-white transition hover:bg-white hover:text-[#07111f]"
                          >
                            Voir le logo
                            <span className="text-xl leading-none">&rarr;</span>
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Illustrator;
