import Navbar from "../main/Navbar";
import blogup from "./blogup.mp4";
import spotify from "./spotify.mp4";
import puissance4 from './puissance4.mp4';
import chezjenny from './chezjenny.mp4';
import gamingfantasy from './gamingfantasy.mp4';
import programming from "./programming.png";
import Footer from "../main/Footer";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Blog Up",
    video: blogup,
    description:
      "Blog Up est un site de blog dédié à l'actualité gaming et technologique. Développé avec Astro et Strapi, il propose une base solide pour publier et gérer du contenu facilement.",
    tags: ["Astro", "Strapi", "Gaming"],
    accent: "emerald",
  },
  {
    title: "Spotify Explorer",
    video: spotify,
    description:
      "Une réplique inspirée de Spotify qui utilise une API publique pour rechercher des artistes et des albums, avec une interface fluide et immersive.",
    tags: ["React", "Spotify API", "Tailwind"],
    accent: "lime",
  },
  {
    title: "Gaming Fantasy",
    video: gamingfantasy,
    description:
      "LA version définitive de blog up ! Cette nouvelle version de blog up, Gaming Fantasy est un site de blog axé sur l'univers du jeux video. Mise en ligne prochainement !",
    tags: ["Astro", "Strapi", "UX"],
    accent: "cyan",
  },
  {
    title: "Puissance 4",
    video: puissance4,
    description:
      "Jeu de puissance 4",
    tags: ["HTML", "CSS", "JS"],
    accent: "cyan",
  },
  {
    title: "Chez Jenny",
    video: chezjenny,
    description:
      "Site de recette de cuisine et de patisserie",
    tags: ["REACTJS", "TAILWIND", "STRAPI", "EXPRESS JS"],
    accent: "cyan",
  },
];

const accentClasses = {
  emerald: {
    badge: "bg-emerald-400 text-[#07111f]",
    border: "group-hover:border-emerald-400/70",
    text: "text-emerald-300",
  },
  lime: {
    badge: "bg-lime-400 text-[#07111f]",
    border: "group-hover:border-lime-400/70",
    text: "text-lime-300",
  },
  cyan: {
    badge: "bg-cyan-400 text-[#07111f]",
    border: "group-hover:border-cyan-400/70",
    text: "text-cyan-300",
  },
};

const Web = () => {
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
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                Portfolio digital
              </p>

              <h1 className="libre max-w-4xl text-5xl font-black italic leading-none sm:text-7xl lg:text-8xl">
                Projets Web
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                Une sélection de sites, interfaces et expériences web conçus autour du design, de la performance et de l'expérience utilisateur.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                src={programming}
                alt="Développement web"
                className="w-full max-w-md object-contain drop-shadow-2xl lg:max-w-lg"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.04] px-6 py-10 sm:px-12 lg:px-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Réalisations
              </p>
              <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
                Tout mes projets web réalisés
              </h2>
            </div>

            <p className="text-white/60 md:max-w-sm md:text-right">
              Chaque projet présente une démo vidéo, les technologies utilisées et l'objectif principal.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-8 lg:px-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-8">
            {projects.map((project, index) => {
              const accent = accentClasses[project.accent];

              return (
                <article
                  key={project.title}
                  className={`group grid overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${accent.border} lg:grid-cols-2`}
                >
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""} bg-black/40 p-4 sm:p-5`}>
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
                      <video
                        controls
                        className="aspect-video w-full object-cover"
                      >
                        <source src={project.video} type="video/mp4" />
                        Votre navigateur ne supporte pas les vidéos HTML5.
                      </video>

                      <div className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] ${accent.badge}`}>
                        Projet {index + 1}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                    <p className={`mb-4 text-sm font-semibold uppercase tracking-[0.25em] ${accent.text}`}>
                      Développement web
                    </p>

                    <h3 className="text-3xl font-black leading-tight sm:text-5xl">
                      {project.title}
                    </h3>

                    <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">
                      {project.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Web;