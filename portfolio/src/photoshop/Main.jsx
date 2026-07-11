import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../main/Navbar";
import peter from "./peter 1 nobackground.png";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../main/Footer";
import logo from "./pngwing.com.png";

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

    const directKeys = [
      "data",
      "attributes",
      "photoshop",
      "media",
      "photo",
      "image",
      "file",
    ];

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

const getPhotoUrl = (item) => {
  const media =
    getField(item, "photoshop") ??
    getField(item, "photo") ??
    getField(item, "image") ??
    getField(item, "media");

  return normalizeMediaUrl(findMediaUrl(media));
};

const getPhotoTitle = (photo, index) => {
  return getPlainText(
    getField(photo, "Title") ?? getField(photo, "title") ?? getField(photo, "text"),
    `Photo ${index + 1}`,
  );
};

const getPublishedDate = (photo) => {
  return (
    getField(photo, "publishedAt") ??
    getField(photo, "updatedAt") ??
    getField(photo, "createdAt") ??
    ""
  );
};

const Photo = () => {
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/photos?populate=*&sort=publishedAt:desc`,
        );

        if (!res.ok) {
          throw new Error(`Erreur HTTP ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data?.data)) {
          setPhotos(data.data);
        }
      } catch (error) {
        console.error("Erreur de chargement des photos :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const sortedPhotos = useMemo(() => {
    return [...photos].sort((a, b) => {
      return new Date(getPublishedDate(b)) - new Date(getPublishedDate(a));
    });
  }, [photos]);

  const carouselPhotos = useMemo(() => {
    return sortedPhotos.slice(0, 3);
  }, [sortedPhotos]);

  useEffect(() => {
    if (carouselPhotos.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselPhotos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselPhotos.length]);

  useEffect(() => {
    if (index >= carouselPhotos.length) {
      setIndex(0);
    }
  }, [carouselPhotos.length, index]);

  const prevSlide = () => {
    if (carouselPhotos.length <= 1) return;
    setIndex((prev) => (prev - 1 + carouselPhotos.length) % carouselPhotos.length);
  };

  const nextSlide = () => {
    if (carouselPhotos.length <= 1) return;
    setIndex((prev) => (prev + 1) % carouselPhotos.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07111f] text-white">
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-[#21c7a8]" />
            <p className="text-lg text-white/80">
              Chargement des cr&eacute;ations...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (sortedPhotos.length === 0) {
    return (
      <div className="min-h-screen bg-[#07111f] text-white">
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center px-6 text-center">
          <p className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-lg text-red-300">
            Aucune photo disponible pour le moment.
          </p>
        </div>
      </div>
    );
  }

  const current = carouselPhotos[index] ?? carouselPhotos[0];
  const currentTitle = getPhotoTitle(current, index);
  const currentImage = getPhotoUrl(current);

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
        <section className="relative overflow-hidden px-6 py-16 sm:px-12 lg:px-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#21c7a8]">
                Adobe Photoshop
              </p>

              <h1 className="libre max-w-4xl text-5xl font-black italic leading-none sm:text-7xl lg:text-8xl">
                Photoshop
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                Une s&eacute;lection de retouches photo, compositions visuelles
                et cr&eacute;ations graphiques r&eacute;alis&eacute;es avec
                Adobe Photoshop.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                src={peter}
                alt=""
                className="w-full max-w-md object-contain drop-shadow-2xl lg:max-w-xl"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.04] px-6 py-10 sm:px-12 lg:px-24">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#21c7a8]">
                Retouche photo
              </p>
              <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                D&eacute;couvrez mes cr&eacute;ations r&eacute;alis&eacute;es
                avec Adobe Photoshop
              </h2>
            </div>

            <img
              src={logo}
              alt="Adobe Photoshop"
              className="w-36 object-contain sm:w-44 md:w-56"
            />
          </div>
        </section>

        <section className="px-4 py-10 sm:px-8 lg:px-16">
          <div className="mx-auto mb-8 max-w-7xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#21c7a8]">
              Derni&egrave;res publications
            </p>
            <h2 className="text-3xl font-black leading-tight sm:text-5xl">
              Les 3 derni&egrave;res photos publi&eacute;es
            </h2>
          </div>

          <div className="relative mx-auto h-[75vh] max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
            <AnimatePresence mode="wait">
              {currentImage && (
                <motion.img
                  key={current?.id || index}
                  src={currentImage}
                  alt={currentTitle}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-black/45" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8 lg:p-10">
              <div className="max-w-2xl rounded-2xl border border-white/15 bg-[#07111f]/75 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#21c7a8]">
                  Photo {index + 1} / {carouselPhotos.length}
                </p>

                <h2 className="mb-6 text-3xl font-black leading-tight text-white sm:text-5xl">
                  {currentTitle}
                </h2>

                {currentImage && (
                  <a
                    href={currentImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#21c7a8] px-6 py-3 text-base font-bold text-[#07111f] transition hover:bg-white"
                  >
                    Voir l'image
                  </a>
                )}
              </div>
            </div>

            {carouselPhotos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Photo precedente"
                  className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/15 text-3xl text-white backdrop-blur-md transition hover:bg-white hover:text-[#07111f] sm:left-6"
                >
                  &lsaquo;
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Photo suivante"
                  className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/15 text-3xl text-white backdrop-blur-md transition hover:bg-white hover:text-[#07111f] sm:right-6"
                >
                  &rsaquo;
                </button>

                <div className="absolute left-1/2 top-6 z-20 flex -translate-x-1/2 gap-2">
                  {carouselPhotos.map((photo, photoIndex) => (
                    <button
                      key={photo.id || photoIndex}
                      type="button"
                      onClick={() => setIndex(photoIndex)}
                      aria-label={`Aller a la photo ${photoIndex + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        photoIndex === index
                          ? "w-8 bg-[#21c7a8]"
                          : "w-2.5 bg-white/50 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="px-6 py-16 sm:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#21c7a8]">
                  Galerie compl&egrave;te
                </p>
                <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                  Toutes mes cr&eacute;ations Photoshop
                </h2>
              </div>

              <p className="max-w-md text-white/60 md:text-right">
                Toutes les photos publi&eacute;es depuis Strapi, avec un acc&egrave;s
                direct au visuel original.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {sortedPhotos.map((photo, photoIndex) => {
                const photoTitle = getPhotoTitle(photo, photoIndex);
                const photoImage = getPhotoUrl(photo);
                const descriptionBlocks = getTextBlocks(
                  getField(photo, "description") ?? getField(photo, "Description"),
                  "",
                ).filter(Boolean);

                return (
                  <article
                    key={photo.id || photoTitle}
                    className="group flex min-h-[540px] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#21c7a8]/70"
                  >
                    <div className="flex h-72 items-center justify-center bg-black/30">
                      {photoImage ? (
                        <img
                          src={photoImage}
                          alt={photoTitle}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-36 w-36 items-center justify-center rounded-full border border-[#21c7a8]/40 bg-[#21c7a8]/10 text-4xl font-black text-[#21c7a8]">
                          Ps
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <span className="mb-4 inline-flex w-fit rounded-full bg-[#21c7a8] px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#07111f]">
                        Photo {photoIndex + 1}
                      </span>

                      <h3 className="mb-3 text-2xl font-black leading-tight">
                        {photoTitle}
                      </h3>

                      {descriptionBlocks.length > 0 && (
                        <div className="mb-7 space-y-3 leading-7 text-white/65">
                          {descriptionBlocks.map((paragraph, paragraphIndex) => (
                            <p key={`${photo.id || photoTitle}-${paragraphIndex}`}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}

                      {photoImage && (
                        <a
                          href={photoImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-4 font-bold text-white transition hover:bg-white hover:text-[#07111f]"
                        >
                          Voir l'image
                          <span className="text-xl leading-none">&rarr;</span>
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Photo;
