// import { Link, useNavigate } from "react-router-dom";
// import photoshop from "./photoshop.png";
// import coding from "./coding.png";
// import elie from "./elietest.png";
// import { useState } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { motion, AnimatePresence } from "framer-motion";
// import persona from "./Persona.png";
// import maquette from "./maquette.png";
// import illustrator from './illustrator.png';

// const highlights = [
//   {
//     title: "Développement web",
//     description:
//       "Conception de sites modernes, interfaces React et expériences web interactives.",
//     image: coding,
//   },
//   {
//     title: "Retouche photo",
//     description:
//       "Créations visuelles, montages et retouches réalisées avec Adobe Photoshop.",
//     image: photoshop,
//   },
//   {
//     title: "Mockups web",
//     description:
//       "Maquettes UI pensées sur Figma puis développées en HTML, CSS et React.",
//     image: maquette,
//   },
// ];

// const works = [
//   {
//     title: "Projets web",
//     description:
//       "Retrouvez mes sites, applications et interfaces web réalisés autour du design et de l'expérience utilisateur.",
//     image: coding,
//     route: "/projets-web",
//     label: "Code",
//   },
//   {
//     title: "Projets Photoshop",
//     description:
//       "Découvrez mes créations graphiques, compositions visuelles et retouches photo.",
//     image: photoshop,
//     route: "/photoshop",
//     label: "Design",
//   },
//   {
//     title: "Projets Illustrator",
//     description:
//       "Découvrez mes créations vectorielles, logos, compositions graphiques et expérimentations visuelles réalisées avec Adobe Illustrator.",
//     image: illustrator,
//     route: "/illustrator",
//     label: "Vectoriel",
//   },
//   {
//     title: "Mockups",
//     description:
//       "Explorez mes maquettes web, de l'idée visuelle jusqu'à l'intégration front-end.",
//     image: maquette,
//     route: "/mockup",
//     label: "UI",
//     featured: true,
//   },
// ];

// const Main = () => {
//   const [showPersona, setShowPersona] = useState(false);
//   const navigate = useNavigate();

//   const togglePersona = () => {
//     setShowPersona((prev) => !prev);
//   };

//   const handleProjectClick = (route) => {
//     navigate(route);
//   };

//   return (
//     <>
//       <motion.div
//         className="min-h-screen bg-[#07111f] text-white"
//         initial={{ opacity: 0, x: 80 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -80 }}
//         transition={{ duration: 0.55, ease: "easeInOut" }}
//       >
//         <Navbar />

//         <main>
//           <header className="px-6 py-16 sm:px-12 lg:px-24">
//             <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
//               <div>
//                 <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#21c7a8]">
//                   Portfolio
//                 </p>

//                 <h1 className="libre text-6xl font-black italic leading-none sm:text-8xl lg:text-9xl">
//                   Elie Levy
//                 </h1>

//                 <p className="mt-6 max-w-2xl text-xl leading-8 text-white/70 sm:text-2xl">
//                   Développeur front-end, Graphiste et créatif digital
//                 </p>

//                 <div className="mt-8 flex flex-col gap-4 sm:flex-row">
//                   {/* <button
//                     onClick={togglePersona}
//                     className="rounded-full bg-[#21c7a8] px-7 py-4 font-bold text-[#07111f] transition hover:bg-white"
//                   >
//                     Découvrir mon persona
//                   </button> */}

//                   <Link
//                     to="/illustrator"
//                     className="rounded-full bg-[#21c7a8] px-7 py-4 font-bold text-[#07111f] transition hover:bg-white"
//                   >
//                     Voir mes projets Logos
//                   </Link>

//                   <Link
//                     to="/projets-web"
//                     className="rounded-full border border-white/15 bg-white/10 px-7 py-4 text-center font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#07111f]"
//                   >
//                     Voir mes projets web
//                   </Link>
//                 </div>
//               </div>

//               <div className="flex justify-center lg:justify-end">
//                 <img
//                   className="w-full max-w-lg object-contain drop-shadow-2xl"
//                   src={elie}
//                   alt="Elie Levy"
//                 />
//               </div>
//             </div>
//           </header>

//           <section className="border-y border-white/10 bg-white/[0.04] px-6 py-12 sm:px-12 lg:px-24">
//             <div className="mx-auto max-w-7xl">
//               <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
//                 <div>
//                   <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#21c7a8]">
//                     À découvrir
//                   </p>

//                   <h2 className="text-3xl font-black leading-tight sm:text-5xl">
//                     Quand les mondes de la créativité s'entremêlent
//                   </h2>
//                 </div>

//                 <p className="max-w-md text-white/60 md:text-right">
//                   Développement, logo, montages photos et mockups.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//                 {highlights.map((item) => (
//                   <article
//                     key={item.title}
//                     className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-7 shadow-xl backdrop-blur-xl"
//                   >
//                     <div className="mb-6 flex h-20 items-center">
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="max-h-16 object-contain"
//                       />
//                     </div>

//                     <h3 className="mb-3 text-2xl font-black">
//                       {item.title}
//                     </h3>

//                     <p className="leading-7 text-white/65">
//                       {item.description}
//                     </p>
//                   </article>
//                 ))}
//               </div>
//             </div>
//           </section>

//           <section className="px-6 py-16 sm:px-12 lg:px-24">
//             <div className="mx-auto max-w-7xl">
//               <div className="mb-12">
//                 <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#21c7a8]">
//                   Mon travail
//                 </p>

//                 <h2 className="text-3xl font-black leading-tight sm:text-5xl">
//                   Sélection de projets
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
//                 {works.map((work) => (
//                   <article
//                     key={work.title}
//                     onClick={() => handleProjectClick(work.route)}
//                     className={`
//                       group flex h-full cursor-pointer overflow-hidden rounded-[1.5rem]
//                       border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl
//                       transition duration-300 hover:-translate-y-1 hover:border-[#21c7a8]/70
//                       ${work.featured ? "flex-col xl:col-span-3 xl:grid xl:grid-cols-[0.9fr_1.1fr]" : "flex-col"}
//                     `}
//                   >
//                     <div
//                       className={`
//                         flex items-center justify-center bg-white/[0.04] p-8
//                         ${work.featured ? "h-72 xl:h-auto" : "h-64"}
//                       `}
//                     >
//                       <img
//                         src={work.image}
//                         alt={work.title}
//                         className={`
//                           object-contain transition duration-500 group-hover:scale-105
//                           ${work.featured ? "max-h-56 xl:max-h-72" : "max-h-44"}
//                         `}
//                       />
//                     </div>

//                     <div className="flex flex-1 flex-col p-7 xl:p-10">
//                       <span className="mb-4 inline-flex w-fit rounded-full bg-[#21c7a8] px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#07111f]">
//                         {work.label}
//                       </span>

//                       <h3
//                         className={
//                           work.featured
//                             ? "mb-4 text-3xl font-black sm:text-5xl"
//                             : "mb-3 text-2xl font-black"
//                         }
//                       >
//                         {work.title}
//                       </h3>

//                       <p className="mb-6 leading-7 text-white/65">
//                         {work.description}
//                       </p>

//                       <Link
//                         to={work.route}
//                         className={`
//                           mt-auto inline-flex items-center justify-center gap-3 rounded-full
//                           border border-white/15 bg-white/10 px-5 py-4 font-bold text-white
//                           transition hover:bg-white hover:text-[#07111f]
//                           ${work.featured ? "w-full sm:w-fit sm:px-8" : "w-full"}
//                         `}
//                         onClick={(event) => event.stopPropagation()}
//                       >
//                         Explorer
//                         <span className="text-xl leading-none">→</span>
//                       </Link>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </main>

//         <Footer />
//       </motion.div>

//       <AnimatePresence>
//         {showPersona && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07111f] p-3 shadow-2xl"
//               initial={{ opacity: 0, scale: 0.9, y: 24 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 24 }}
//               transition={{ duration: 0.25, ease: "easeOut" }}
//             >
//               <button
//                 onClick={togglePersona}
//                 className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl font-black text-[#07111f] shadow-lg transition hover:bg-[#21c7a8]"
//                 aria-label="Fermer le persona"
//               >
//                 ×
//               </button>

//               <img
//                 src={persona}
//                 alt="Persona"
//                 className="max-h-[86vh] w-full rounded-[1.2rem] object-contain"
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Main;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight, faEnvelope, faPenNib, faXmark } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Footer from "./Footer";
import usePortfolioSeo from "./usePortfolioSeo";
import monogram from "../EL_el svg.svg";
import elieStudioWordmark from "../eliestudio.svg";
import portrait from "./portrait-elie.webp";
import blogup from "./apercu-blogup.webp";
import retouche from "./apercu-photoshop.webp";
import photoshop from "./photoshop.png";
import illustrator from "./illustrator.png";
import maquettes from "./apercu-maquettes.webp";
import atelier from "../freelance/atelier-eliestudio.jpg";

const metadata = {
  path: "/",
  title: "Elie Levy | Graphiste freelance et développeur front-end",
  description: "Portfolio d’Elie Levy, graphiste freelance et développeur front-end. Création de logos, identités visuelles, retouche photo et interfaces React.",
  type: "ProfilePage",
  image: portrait,
  imageAlt: "Portrait d’Elie Levy",
};

const container = "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12";
const primary = "inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-[#21c7a8] px-5 py-3 text-center font-bold text-[#07111f] transition-colors hover:bg-[#71e5d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#21c7a8]";
const works = [
  {
    title: "Projets web",
    description: "Des sites et applications, du premier prototype à l’interface React.",
    image: blogup,
    alt: "Aperçu de BlogUp, un projet web d’Elie Levy",
    route: "/projets-web",
  },
  {
    title: "Retouche photo",
    description: "Détourage, montages et compositions visuelles avec Adobe Photoshop.",
    image: retouche,
    alt: "Exemple de détourage d’un photographe sous Photoshop",
    toolIcon: photoshop,
    route: "/photoshop",
  },
  {
    title: "Logos & identités",
    description: "Logos clients et recherches personnelles réalisés avec Adobe Illustrator.",
    toolIcon: illustrator,
    route: "/illustrator",
  },
  {
    title: "Maquettes web",
    description: "Des pistes d’interface, de la maquette à l’intégration front-end.",
    image: maquettes,
    alt: "Présentation d’une maquette sur ordinateur et mobile",
    route: "/mockup",
    wide: true,
  },
];

const WhiteMark = ({ className }) => (
  <svg viewBox="388 94 504 504" className={className} aria-hidden="true">
    <image href={monogram} width="1280" height="800" className="brightness-0 invert" />
  </svg>
);

const ProjectCard = ({ work, index, reduceMotion }) => (
  <motion.article
    initial={reduceMotion ? false : { opacity: 0.9, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : (index % 3) * 0.06 }}
    className={"group flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#cedbd7] bg-white transition-colors hover:border-[#137c6a] focus-within:border-[#137c6a] " + (work.wide ? "sm:col-span-2 md:grid md:grid-cols-2 lg:col-span-3" : "")}
  >
    <div
      className={"relative isolate grid aspect-[16/10] place-items-center overflow-hidden " + (work.wide ? "bg-[#d8e8e2] md:aspect-[2/1]" : !work.image ? "bg-[#102b36]" : work.toolIcon ? "bg-[#d8e9e3]" : "bg-[#e1e9e6]")}
    >
      {work.image ? (
        <img
          src={work.image}
          alt={work.alt}
          loading="lazy"
          decoding="async"
          className={"h-full min-h-0 w-full object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.035] " + (work.toolIcon ? "object-bottom" : work.wide ? "p-5" : "p-3")}
        />
      ) : (
        <WhiteMark className="h-28 w-28 sm:h-36 sm:w-36" />
      )}
      {work.toolIcon && (
        <img
          src={work.toolIcon}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute left-3 top-3 h-12 w-12 object-contain"
        />
      )}
    </div>

    <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-7">
      <h3 className="font-baskerville text-xl font-bold leading-snug sm:text-2xl">{work.title}</h3>
      <p className="mb-6 mt-3 text-sm leading-6 text-[#355452]">{work.description}</p>
      <Link
        to={work.route}
        aria-label={"Explorer : " + work.title}
        className="mt-auto inline-flex min-h-11 items-center justify-between gap-3 border-t border-[#d5e3de] pt-3 text-sm font-bold text-[#106b5c] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#137c6a]"
      >
        Explorer <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
      </Link>
    </div>
  </motion.article>
);

const invitationStorageKey = "eliestudio-freelance-invitation-dismissed";

const FreelanceInvitation = ({ reduceMotion }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(invitationStorageKey)) return undefined;
    } catch {
      // The invitation still works when browser storage is unavailable.
    }

    const timer = window.setTimeout(() => setVisible(true), 6500);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(invitationStorageKey, "1");
    } catch {
      // The local state keeps the invitation closed on this visit.
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          aria-labelledby="freelance-invitation-title"
          initial={reduceMotion ? false : { opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: 14 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-40 w-[min(17rem,calc(100%_-_2rem))] rounded-lg border border-[#395b57] bg-[#102631] py-4 pl-4 pr-12 text-white shadow-[0_12px_28px_#07111f55] sm:bottom-6 sm:right-6"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Fermer l’invitation freelance"
            className="absolute right-1 top-1 grid h-10 w-10 place-items-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#21c7a8]"
          >
            <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
          </button>
          <p id="freelance-invitation-title" className="font-bold">Un logo à créer ?</p>
          <Link
            to="/el-freelance"
            onClick={dismiss}
            className="mt-1 inline-flex min-h-9 items-center gap-2 text-sm font-bold text-[#75dfc9] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#21c7a8]"
          >
            Découvrir mes prestations <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </Link>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

const Main = () => {
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
        <header aria-labelledby="home-title" className="relative isolate overflow-hidden border-b border-white/10">
          <img
            src={portrait}
            alt="Portrait d’Elie Levy"
            width={1050}
            height={1200}
            fetchPriority="high"
            className="absolute right-0 top-0 -z-20 h-[22rem] w-[80%] max-w-[1080px] object-cover object-[38%_28%] sm:h-full sm:w-[57%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#07111f_0%,#07111fe6_32%,#07111f35_100%),linear-gradient(0deg,#07111f_18%,#07111f00_82%)] sm:bg-[linear-gradient(90deg,#07111f_0%,#07111f_42%,#07111fc7_54%,#07111f12_77%),linear-gradient(0deg,#07111f9c_0%,#07111f00_40%)]"
          />

          <div className={container + " flex min-h-[min(33rem,calc(100svh_-_9rem))] items-center py-9 sm:min-h-[29rem] sm:py-12 lg:min-h-[min(37rem,calc(100svh_-_11rem))]"}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0.86, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
              className="max-w-xl"
            >
              <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-5">
                <WhiteMark className="h-20 w-20 shrink-0 sm:h-24 sm:w-24 lg:h-28 lg:w-28" />
                <span aria-hidden="true" className="h-8 w-px shrink-0 bg-[#21c7a8]/65" />
                <img
                  src={elieStudioWordmark}
                  alt="ElieStudio"
                  width={1008}
                  height={271}
                  className="h-auto w-36 brightness-0 invert sm:w-44 lg:w-52"
                />
              </div>
              <h1 id="home-title" className="font-baskerville text-[3.25rem] font-bold leading-[1.06] sm:text-7xl lg:text-[6rem]">
                Elie Levy
              </h1>
              <p className="mt-4 max-w-md text-xl font-semibold leading-snug text-white sm:text-2xl">
                Graphiste freelance et développeur front-end
              </p>
              <p className="mt-3 max-w-md leading-7 text-[#d4e5e2] sm:text-lg sm:leading-8">
                Je conçois des logos, des identités visuelles et des interfaces web pour donner une image claire et reconnaissable à vos projets.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link to="/contact" className={primary}>
                  Parlons de votre projet <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                </Link>
                <a href="#realisations" className="inline-flex min-h-11 items-center gap-2 font-bold text-white underline decoration-[#21c7a8] underline-offset-4 hover:text-[#75dfc9]">
                  Voir mes réalisations <FontAwesomeIcon icon={faArrowDown} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </header>

        <section
          id="realisations"
          aria-labelledby="realisations-title"
          tabIndex={-1}
          className="scroll-mt-28 bg-[#eff5f2] py-9 text-[#07111f] focus:outline-none sm:py-16"
        >
          <div className={container}>
            <div className="flex flex-col gap-3 border-b border-[#b9cec5] pb-6 md:flex-row md:items-end md:justify-between md:gap-8">
              <h2 id="realisations-title" className="font-baskerville text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Sélection de projets
              </h2>
              <p className="max-w-xs leading-7 text-[#355452]">Identités visuelles, compositions et interfaces web.</p>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {works.map((work, index) => (
                <ProjectCard key={work.route} work={work} index={index} reduceMotion={reduceMotion} />
              ))}
            </div>
          </div>
        </section>

        <section id="freelance" aria-labelledby="home-freelance-title" className="relative isolate overflow-hidden bg-[#011627] py-14 sm:py-20">
          <img
            src={atelier}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute right-0 top-0 -z-20 h-full w-full max-w-[1120px] object-cover object-[65%_center] sm:w-4/5"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#011627]/80 sm:bg-transparent sm:bg-[linear-gradient(90deg,#011627_2%,#011627fa_44%,#01162744_100%)]" />
          <div className={container}>
            <div className="max-w-xl">
              <p className="mb-3 inline-flex items-center gap-3 font-bold text-[#75dfc9]">
                <FontAwesomeIcon icon={faPenNib} aria-hidden="true" /> Graphisme freelance
              </p>
              <h2 id="home-freelance-title" className="font-baskerville text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Une identité à votre image
              </h2>
              <p className="mt-4 max-w-md leading-7 text-[#d4e5e2]">
                Vous lancez une activité ou vous faites évoluer votre marque ? Je vous accompagne du premier échange jusqu’aux fichiers prêts à utiliser.
              </p>
              <ul className="my-6 flex max-w-lg flex-wrap gap-x-4 gap-y-2 border-y border-white/20 py-3 text-sm font-semibold text-white">
                <li>Logo et déclinaisons</li>
                <li>Charte graphique</li>
                <li>Supports imprimés et numériques</li>
              </ul>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link to="/el-freelance" className={primary}>
                  Explorer mes prestations <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                </Link>
                <Link to="/contact?demande=devis" className="inline-flex min-h-11 items-center font-bold text-white underline decoration-[#21c7a8] underline-offset-4 hover:text-[#75dfc9]">
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="home-contact-title" className="bg-[#eff5f2] py-10 text-[#07111f] sm:py-14">
          <div className={container}>
            <motion.div
              className="border-y border-[#b9cec5] py-6 sm:py-8 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-8"
              initial={reduceMotion ? false : { y: 8 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            >
              <div>
                <h2 id="home-contact-title" className="font-baskerville text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  Parlons de votre projet
                </h2>
                <p className="mt-3 max-w-xl leading-7 text-[#355452]">
                  Un logo, une identité visuelle ou un site web ? Écrivez-moi pour en discuter.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 md:mt-0 md:justify-end">
                <Link to="/contact" className={primary}>
                  <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /> Me contacter
                </Link>
                <Link
                  to="/contact?demande=devis"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#106b5c] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#137c6a]"
                >
                  Demander un devis <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <FreelanceInvitation reduceMotion={reduceMotion} />
    </div>
  );
};

export default Main;
