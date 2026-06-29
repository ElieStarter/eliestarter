import { Link, useNavigate } from "react-router-dom";
import photoshop from "./photoshop.png";
import coding from "./coding.png";
import elie from "./elietest.png";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import persona from "./Persona.png";
import maquette from "./maquette.png";
import illustrator from './illustrator.png';

const highlights = [
  {
    title: "Développement web",
    description:
      "Conception de sites modernes, interfaces React et expériences web interactives.",
    image: coding,
  },
  {
    title: "Retouche photo",
    description:
      "Créations visuelles, montages et retouches réalisées avec Adobe Photoshop.",
    image: photoshop,
  },
  {
    title: "Mockups web",
    description:
      "Maquettes UI pensées sur Figma puis développées en HTML, CSS et React.",
    image: maquette,
  },
];

const works = [
  {
    title: "Projets web",
    description:
      "Retrouvez mes sites, applications et interfaces web réalisés autour du design et de l'expérience utilisateur.",
    image: coding,
    route: "/projets-web",
    label: "Code",
  },
  {
    title: "Projets Photoshop",
    description:
      "Découvrez mes créations graphiques, compositions visuelles et retouches photo.",
    image: photoshop,
    route: "/photoshop",
    label: "Design",
  },
  {
    title: "Projets Illustrator",
    description:
      "Découvrez mes créations vectorielles, logos, compositions graphiques et expérimentations visuelles réalisées avec Adobe Illustrator.",
    image: illustrator,
    route: "/illustrator",
    label: "Vectoriel",
  },
  {
    title: "Mockups",
    description:
      "Explorez mes maquettes web, de l'idée visuelle jusqu'à l'intégration front-end.",
    image: maquette,
    route: "/mockup",
    label: "UI",
    featured: true,
  },
];

const Main = () => {
  const [showPersona, setShowPersona] = useState(false);
  const navigate = useNavigate();

  const togglePersona = () => {
    setShowPersona((prev) => !prev);
  };

  const handleProjectClick = (route) => {
    navigate(route);
  };

  return (
    <>
      <motion.div
        className="min-h-screen bg-[#07111f] text-white"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      >
        <Navbar />

        <main>
          <header className="px-6 py-16 sm:px-12 lg:px-24">
            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#21c7a8]">
                  Portfolio créatif
                </p>

                <h1 className="libre text-6xl font-black italic leading-none sm:text-8xl lg:text-9xl">
                  Elie Levy
                </h1>

                <p className="mt-6 max-w-2xl text-xl leading-8 text-white/70 sm:text-2xl">
                  Développeur front-end, Graphiste et créatif digital
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={togglePersona}
                    className="rounded-full bg-[#21c7a8] px-7 py-4 font-bold text-[#07111f] transition hover:bg-white"
                  >
                    Découvrir mon persona
                  </button>

                  <Link
                    to="/projets-web"
                    className="rounded-full border border-white/15 bg-white/10 px-7 py-4 text-center font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#07111f]"
                  >
                    Voir mes projets
                  </Link>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <img
                  className="w-full max-w-lg object-contain drop-shadow-2xl"
                  src={elie}
                  alt="Elie Levy"
                />
              </div>
            </div>
          </header>

          <section className="border-y border-white/10 bg-white/[0.04] px-6 py-12 sm:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#21c7a8]">
                    À découvrir
                  </p>

                  <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                    Trois univers, une même approche visuelle.
                  </h2>
                </div>

                <p className="max-w-md text-white/60 md:text-right">
                  Développement, design graphique et maquettes UI réunis dans un portfolio clair et interactif.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {highlights.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-7 shadow-xl backdrop-blur-xl"
                  >
                    <div className="mb-6 flex h-20 items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-16 object-contain"
                      />
                    </div>

                    <h3 className="mb-3 text-2xl font-black">
                      {item.title}
                    </h3>

                    <p className="leading-7 text-white/65">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-16 sm:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-12">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#21c7a8]">
                  Mon travail
                </p>

                <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                  Sélection de projets
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {works.map((work) => (
                  <article
                    key={work.title}
                    onClick={() => handleProjectClick(work.route)}
                    className={`
                      group flex h-full cursor-pointer overflow-hidden rounded-[1.5rem]
                      border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl
                      transition duration-300 hover:-translate-y-1 hover:border-[#21c7a8]/70
                      ${work.featured ? "flex-col xl:col-span-3 xl:grid xl:grid-cols-[0.9fr_1.1fr]" : "flex-col"}
                    `}
                  >
                    <div
                      className={`
                        flex items-center justify-center bg-white/[0.04] p-8
                        ${work.featured ? "h-72 xl:h-auto" : "h-64"}
                      `}
                    >
                      <img
                        src={work.image}
                        alt={work.title}
                        className={`
                          object-contain transition duration-500 group-hover:scale-105
                          ${work.featured ? "max-h-56 xl:max-h-72" : "max-h-44"}
                        `}
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-7 xl:p-10">
                      <span className="mb-4 inline-flex w-fit rounded-full bg-[#21c7a8] px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#07111f]">
                        {work.label}
                      </span>

                      <h3
                        className={
                          work.featured
                            ? "mb-4 text-3xl font-black sm:text-5xl"
                            : "mb-3 text-2xl font-black"
                        }
                      >
                        {work.title}
                      </h3>

                      <p className="mb-6 leading-7 text-white/65">
                        {work.description}
                      </p>

                      <Link
                        to={work.route}
                        className={`
                          mt-auto inline-flex items-center justify-center gap-3 rounded-full
                          border border-white/15 bg-white/10 px-5 py-4 font-bold text-white
                          transition hover:bg-white hover:text-[#07111f]
                          ${work.featured ? "w-full sm:w-fit sm:px-8" : "w-full"}
                        `}
                        onClick={(event) => event.stopPropagation()}
                      >
                        Explorer
                        <span className="text-xl leading-none">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </motion.div>

      <AnimatePresence>
        {showPersona && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07111f] p-3 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <button
                onClick={togglePersona}
                className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl font-black text-[#07111f] shadow-lg transition hover:bg-[#21c7a8]"
                aria-label="Fermer le persona"
              >
                ×
              </button>

              <img
                src={persona}
                alt="Persona"
                className="max-h-[86vh] w-full rounded-[1.2rem] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Main;