import React from "react";
import { Link } from "react-router-dom";
import test from "../main/coding.png";

const mockups = [
  {
    id: 1,
    title: "Ironhack",
    description: "Landing page moderne développée en React",
    image: test,
    duration: "30-45 min",
    route: "/mockup/ironhack",
    type: "Formation",
  },
  {
    id: 2,
    title: "Spotify",
    description: "Interface moderne inspirée de l'univers musical",
    image: test,
    duration: "30-45 min",
    route: "/mockup/spotify",
    type: "Application",
  },
];

const Design = () => {
  return (
    <section className="min-h-screen bg-[#07111f] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#21c7a8]">
              UI / Mockups
            </p>

            <h1 className="font-playfair text-5xl font-black leading-none sm:text-6xl lg:text-7xl">
              Mockup Design
            </h1>
          </div>

          <p className="max-w-xl text-base leading-7 text-white/65 md:text-right">
            Une sélection de maquettes et landing pages pensées pour travailler la hiérarchie visuelle, les couleurs et l'expérience utilisateur.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {mockups.map((mockup, index) => (
            <article
              key={mockup.id}
              className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#21c7a8]/70"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <img
                  src={mockup.image}
                  alt={mockup.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/55 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full bg-[#21c7a8] px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#07111f]">
                  Mockup {index + 1}
                </div>

                <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                  {mockup.duration}
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#21c7a8]">
                    {mockup.type}
                  </p>

                  <h3 className="mb-3 text-3xl font-black leading-tight">
                    {mockup.title}
                  </h3>

                  <p className="mb-6 text-sm leading-6 text-white/75">
                    {mockup.description}
                  </p>

                  <Link
                    to={mockup.route}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#07111f]"
                  >
                    Voir la maquette
                    <span className="text-xl leading-none">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Design;