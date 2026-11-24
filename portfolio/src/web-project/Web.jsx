import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faPlay } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../main/Navbar";
import Footer from "../main/Footer";
import monogram from "../EL_el svg.svg";
import usePortfolioSeo from "../main/usePortfolioSeo";
import blogup from "./blogup.mp4";
import spotify from "./spotify.mp4";
import puissance4 from "./puissance4.mp4";
import chezjenny from "./chezjenny.mp4";
import gamingfantasy from "./gamingfantasy.mp4";
import blogupPoster from "../main/apercu-blogup.webp";
import spotifyPoster from "./apercu-spotify.webp";
import gamingPoster from "./apercu-gaming-fantasy.webp";
import gamePoster from "./apercu-puissance-4.webp";
import jennyPoster from "./apercu-chez-jenny.webp";

const projects = [
  {
    id: "blog-up",
    title: "Blog Up",
    video: blogup,
    poster: blogupPoster,
    category: "Blog tech",
    description: "Un blog consacré aux jeux vidéo et à la tech. Astro et Strapi servent à afficher et à gérer les articles.",
    tags: ["Astro", "Strapi"],
    accent: "emerald",
  },
  {
    id: "spotify-explorer",
    title: "Spotify Explorer",
    video: spotify,
    poster: spotifyPoster,
    category: "Interface musicale",
    description: "Une interface React pour rechercher des artistes et des albums et explorer le catalogue de Spotify via son API.",
    tags: ["React", "Spotify API", "Tailwind CSS"],
    accent: "lime",
  },
  {
    id: "gaming-fantasy",
    title: "Gaming Fantasy",
    video: gamingfantasy,
    poster: gamingPoster,
    category: "Site éditorial",
    description: "La suite de Blog Up, recentrée sur l’actualité du jeu vidéo.",
    tags: ["Astro", "Strapi", "UX"],
    accent: "cyan",
  },
  {
    id: "puissance-4",
    title: "Puissance 4",
    video: puissance4,
    poster: gamePoster,
    category: "Jeu web",
    description: "Le jeu de Puissance 4 dans le navigateur, réalisé en JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    accent: "cyan",
  },
  {
    id: "chez-jenny",
    title: "Chez Jenny",
    video: chezjenny,
    poster: jennyPoster,
    category: "Site de recettes",
    description: "Un site consacré aux recettes de cuisine et de pâtisserie, avec un front-end React et des contenus gérés dans Strapi.",
    tags: ["React", "Tailwind CSS", "Strapi", "Express.js"],
    accent: "cyan",
  },
];

const accents = {
  emerald: { badge: "bg-emerald-400", hover: "hover:border-emerald-400/70 focus-within:border-emerald-400/70" },
  lime: { badge: "bg-lime-400", hover: "hover:border-lime-400/70 focus-within:border-lime-400/70" },
  cyan: { badge: "bg-cyan-400", hover: "hover:border-cyan-400/70 focus-within:border-cyan-400/70" },
};

const metadata = {
  path: "/projets-web",
  title: "Projets web d’Elie Levy | Sites, interfaces React et jeux",
  description: "Découvrez Blog Up, Spotify Explorer, Gaming Fantasy, Puissance 4 et Chez Jenny, les projets web d’Elie Levy présentés avec leurs démos et technologies.",
  type: "CollectionPage",
  image: blogupPoster,
  imageAlt: "Interface du blog Blog Up",
  items: projects.map(({ id, title, description, poster }) => ({
    id, name: title, description, image: poster, kind: "CreativeWork",
  })),
};

const container = "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12";

const ProjectCard = ({ project, reversed, reduceMotion }) => {
  const accent = accents[project.accent];
  const player = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) player.current?.focus({ preventScroll: true });
  }, [started]);

  const play = () => {
    const video = player.current;
    video.src = project.video;
    setStarted(true);
    video.play().catch(() => {
      // Native controls remain available if the browser blocks playback.
    });
  };

  return (
    <motion.article
      id={project.id}
      aria-labelledby={project.id + "-title"}
      initial={reduceMotion ? false : { y: 10 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
      className={"group grid min-w-0 scroll-mt-28 overflow-hidden rounded-lg border border-white/15 bg-[#102230] transition-colors lg:items-center " + accent.hover + (reversed ? " lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]" : " lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]")}
    >
      <div className={"relative min-w-0 bg-[#050d15] p-3 sm:p-4 " + (reversed ? "lg:order-2" : "")}>
        <div className="relative aspect-video overflow-hidden rounded-md bg-black">
          <video
            ref={player}
            controls
            playsInline
            preload="none"
            poster={project.poster}
            aria-hidden={!started}
            aria-label={"Démonstration de " + project.title}
            className={"absolute inset-0 h-full w-full object-contain " + (started ? "" : "invisible")}
          >
            Votre navigateur ne prend pas en charge la vidéo.
          </video>
          {!started && (
            <button
              type="button"
              onClick={play}
              aria-label={"Lire la démonstration de " + project.title}
              className="group/play absolute inset-0 grid place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#21c7a8]"
            >
              <img src={project.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
              <span aria-hidden="true" className="relative grid h-12 w-12 place-items-center rounded-full bg-[#07111f] text-white shadow-md transition-colors group-hover/play:bg-[#21c7a8] group-hover/play:text-[#07111f] sm:h-14 sm:w-14">
                <FontAwesomeIcon icon={faPlay} />
              </span>
            </button>
          )}
        </div>
        <span
          className={"pointer-events-none absolute left-5 top-5 rounded-md px-3 py-1.5 text-xs font-bold text-[#07111f] sm:left-6 sm:top-6 " + accent.badge}
        >
          {project.category}
        </span>
      </div>

      <div className="min-w-0 p-5 sm:p-8 lg:p-9">
        <h2 id={project.id + "-title"} className="break-words font-baskerville text-2xl font-bold leading-tight sm:text-3xl">
          {project.title}
        </h2>
        <p className="mt-4 max-w-md leading-7 text-[#c8dcdb]">{project.description}</p>
        <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-[#d4e5e2]">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

const Web = () => {
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

<header aria-labelledby="web-title" className="relative isolate overflow-hidden border-b border-white/10 bg-[#08151f]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
            <div className="absolute -right-36 -top-4 grid w-[85%] min-w-[29rem] max-w-[58rem] -rotate-6 grid-cols-2 gap-2 sm:-right-28 sm:top-5 sm:w-[74%] sm:min-w-[43rem] sm:gap-3 lg:-right-14 2xl:right-0">
              <img src={gamingPoster} alt="" className="col-span-2 aspect-[2/1] w-full rounded-lg object-cover sm:aspect-[3/1] sm:object-top" />
              <img src={blogupPoster} alt="" className="aspect-[2/1] w-full rounded-md object-cover" />
              <img src={jennyPoster} alt="" className="aspect-[2/1] w-full rounded-md object-cover" />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#07111f_0%,#07111ff0_30%,#07111f55_100%),linear-gradient(0deg,#07111f_6%,#07111f00_76%)] lg:bg-[linear-gradient(90deg,#07111f_0%,#07111f_34%,#07111fe6_44%,#07111f18_72%),linear-gradient(0deg,#07111f88_0%,#07111f00_40%)]"
          />

          <div className={container + " flex min-h-[min(30rem,calc(100svh_-_9rem))] items-center py-9 sm:min-h-[28rem] sm:py-12 lg:min-h-[min(32rem,calc(100svh_-_12rem))]"}>
            <motion.div
              className="max-w-xl lg:max-w-[42rem]"
              initial={reduceMotion ? false : { y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
            >
              <div className="mb-4 flex items-center gap-3 sm:gap-4">
                <svg viewBox="388 94 504 504" className="h-16 w-16 shrink-0 sm:h-20 sm:w-20 lg:h-24 lg:w-24" aria-hidden="true">
                  <image href={monogram} width="1280" height="800" className="brightness-0 invert" />
                </svg>
                <p className="border-l border-[#21c7a8]/65 pl-3 text-sm font-bold text-[#75dfc9] sm:pl-4">Développement front-end</p>
              </div>
              <h1 id="web-title" className="font-baskerville text-[3.25rem] font-bold leading-[1.05] sm:text-7xl lg:text-8xl">
                Projets web
              </h1>
              <p className="mt-4 max-w-md text-lg font-semibold leading-7 text-white sm:text-2xl sm:leading-8">
                Sites, interfaces React et jeux web.
              </p>
              <a
                href="#realisations-web"
                className="group mt-6 inline-flex min-h-12 items-center gap-3 rounded-md bg-[#21c7a8] px-5 py-3 font-bold text-[#07111f] transition-colors hover:bg-[#71e5d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#21c7a8]"
              >
                Voir les projets <FontAwesomeIcon icon={faArrowDown} className="motion-safe:transition-transform motion-safe:group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </header>

        <section
          id="realisations-web"
          aria-label="Réalisations web"
          tabIndex={-1}
          className={container + " flex scroll-mt-28 flex-col gap-5 pb-12 pt-5 focus:outline-none sm:gap-7 sm:pb-16 sm:pt-7"}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} reversed={index % 2 === 1} reduceMotion={reduceMotion} />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Web;
