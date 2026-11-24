import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { motion, useReducedMotion } from "framer-motion";
import monogram from "../EL_el svg.svg";
import Navbar from "../main/Navbar";
import Footer from "../main/Footer";
import usePortfolioSeo from "../main/usePortfolioSeo";
import Design, { mockups } from "./Design";

const [ironhack, spotify] = mockups;
const metadata = {
  path: "/mockup",
  title: "Mockups & design d’interface | ElieStudio",
  description: "Explorez les maquettes web d’ElieStudio : une landing page Ironhack et une application musicale inspirée de Spotify, réalisées en React.",
  type: "CollectionPage",
  image: ironhack.image,
  imageAlt: ironhack.imageAlt,
  items: mockups.map((project) => ({ ...project, kind: "CreativeWork" })),
};

const Mockup = () => {
  usePortfolioSeo(metadata);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = reduceMotion ? "auto" : "smooth";
    return () => {
      root.style.scrollBehavior = previousBehavior;
    };
  }, [reduceMotion]);

  return (
    <div className="min-h-screen bg-[#07111f] text-white" lang="fr">
      <Navbar />

      <main>
        <header aria-labelledby="mockups-title" className="relative isolate overflow-hidden border-b border-white/15 bg-[#0a1521]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
            <div className="absolute -right-48 top-4 w-[76%] min-w-[36rem] max-w-[70rem] -rotate-6 sm:-right-28 sm:top-0 lg:-right-16 xl:-right-8">
              <img
                src={ironhack.image}
                alt=""
                width={1280}
                height={800}
                fetchPriority="high"
                className="aspect-[16/9] w-full object-cover object-top"
              />
              <img
                src={spotify.image}
                alt=""
                width={1280}
                height={800}
                className="ml-[16%] w-[70%] border-t-4 border-[#07111f]"
              />
            </div>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#07111f_0%,#07111ff0_37%,#07111f80_100%),linear-gradient(0deg,#07111fd9_0%,#07111f00_64%)] lg:bg-[linear-gradient(90deg,#07111f_0%,#07111f_27%,#07111ff0_38%,#07111f38_74%),linear-gradient(0deg,#07111f9e_0%,#07111f00_63%)]" />

          <div className="mx-auto flex min-h-[23rem] max-w-7xl items-center px-5 py-9 sm:min-h-[26rem] sm:px-8 sm:py-12 xl:px-10">
            <motion.div
              className="max-w-xl"
              initial={reduceMotion ? false : { y: 14 }}
              animate={{ y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
            >
              <div className="mb-4 flex items-center gap-3 sm:gap-4">
                <svg viewBox="388 94 504 504" className="h-14 w-14 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]" aria-hidden="true">
                  <image href={monogram} width="1280" height="800" className="brightness-0 invert" />
                </svg>
                <p className="border-l border-[#21c7a8]/70 pl-3 text-sm font-bold text-[#8be8d6] sm:pl-4">Design d&rsquo;interface</p>
              </div>

              <h1 id="mockups-title" className="font-baskerville text-[3.25rem] font-bold leading-none sm:text-7xl lg:text-8xl">
                Mockups
              </h1>
              <p className="mt-4 max-w-md text-lg font-semibold leading-relaxed text-[#edf4f6] sm:text-xl">
                De la landing page pour une &eacute;cole tech &agrave; l&rsquo;interface d&rsquo;une application musicale.
              </p>
              <a
                href="#maquettes"
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#21c7a8] px-5 py-3 font-bold text-[#07111f] transition-colors hover:bg-[#77e8d3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#21c7a8]"
              >
                <FontAwesomeIcon icon={faLayerGroup} aria-hidden="true" />
                Voir les maquettes
              </a>
            </motion.div>
          </div>
        </header>

        <Design />
      </main>

      <Footer />
    </div>
  );
};

export default Mockup;
