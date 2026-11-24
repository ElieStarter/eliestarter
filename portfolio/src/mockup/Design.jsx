import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ironhackPreview from "./apercu-ironhack.jpg";
import spotifyPreview from "./apercu-spotify.jpg";

export const mockups = [
  {
    id: "ironhack",
    name: "Ironhack",
    description: "Une page d’accueil autour de la formation tech, de la recherche de cursus à la présentation des programmes.",
    image: ironhackPreview,
    imageAlt: "Page Ironhack avec son bandeau bleu et les cartes de formation",
    type: "Landing page",
    accent: "#a4c6ff",
    route: "/mockup/ironhack",
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "Un concept d’interface musicale qui explore la recherche d’artistes et d’albums.",
    image: spotifyPreview,
    imageAlt: "Interface Spotify avec menu latéral et champs de recherche d’artistes et d’albums",
    type: "Application web",
    accent: "#87e9a8",
    route: "/mockup/spotify",
  },
];

const Design = () => (
  <section
    id="maquettes"
    aria-labelledby="maquettes-title"
    tabIndex={-1}
    className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-14 pt-7 focus:outline-none sm:px-8 sm:pb-20 sm:pt-9 xl:px-10"
  >
    <h2 id="maquettes-title" className="mb-5 font-baskerville text-3xl font-bold leading-tight sm:mb-7 sm:text-4xl">
      Les maquettes
    </h2>

    <div className="grid gap-5 md:grid-cols-2 md:gap-7">
      {mockups.map((project) => (
        <article
          key={project.id}
          id={project.id}
          style={{ "--project-accent": project.accent }}
          className="group flex min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-lg border border-white/15 bg-[#101b24] transition-colors hover:border-[var(--project-accent)] focus-within:border-[var(--project-accent)]"
        >
          <div className="overflow-hidden border-b border-white/10 bg-[#0a131c]">
            <img
              src={project.image}
              alt={project.imageAlt}
              width={1280}
              height={800}
              loading="lazy"
              decoding="async"
              className="aspect-[8/5] w-full object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]"
            />
          </div>

          <div className="flex flex-1 flex-col items-start p-5 sm:p-6">
            <p className="mb-2 text-sm font-bold text-[var(--project-accent)]">{project.type}</p>
            <h3 className="text-3xl font-extrabold leading-tight">{project.name}</h3>
            <p className="mb-6 mt-3 max-w-md leading-relaxed text-[#cfdae0]">{project.description}</p>
            <Link
              to={project.route}
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              aria-label={"Ouvrir la maquette " + project.name}
              className="mt-auto inline-flex min-h-11 max-w-full items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm font-bold transition-colors hover:border-[var(--project-accent)] hover:bg-[var(--project-accent)] hover:text-[#07111f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--project-accent)]"
            >
              <FontAwesomeIcon icon={faLaptopCode} aria-hidden="true" />
              Ouvrir la maquette
            </Link>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Design;
