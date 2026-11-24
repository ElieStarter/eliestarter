import { motion, useReducedMotion } from "framer-motion";
import portrait from "../main/portrait-elie.webp";
import { container } from "./freelanceStyles";

const FreelanceAbout = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="qui-suis-je"
      aria-labelledby="freelance-about-title"
      className="scroll-mt-28 border-b border-[#cedbd7] bg-[#fafcfb] py-8 text-[#07111f] sm:py-12 lg:py-14"
    >
      <motion.div
        className={container}
        initial={reduceMotion ? false : { y: 10 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 border-b border-[#cddbd6] pb-4">
          <span aria-hidden="true" className="h-0.5 w-7 shrink-0 bg-[#137c6a]" />
          <h2 id="freelance-about-title" className="text-sm font-bold uppercase text-[#106b5c]">
            Qui suis-je&nbsp;?
          </h2>
        </div>

        <div className="grid items-center gap-6 pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-8 lg:gap-12 lg:pt-8">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-md bg-[#dce6e2] sm:w-24 lg:w-28">
              <img
                src={portrait}
                alt="Portrait d'Elie Levy"
                width={1050}
                height={1200}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full origin-[48%_32%] scale-[1.55] object-cover object-[50%_38%]"
              />
            </div>
            <div className="min-w-0">
              <p className="font-baskerville text-4xl font-bold leading-none sm:text-5xl lg:text-6xl">Elie Levy</p>
              <p className="mt-2 text-sm font-semibold text-[#31524e] sm:text-base">Graphiste freelance</p>
            </div>
          </div>

          <div className="max-w-[58ch] space-y-3 border-l-2 border-[#21c7a8] pl-4 text-base leading-7 text-[#304c49] sm:pl-5 lg:text-lg lg:leading-8">
            <p>
              Hello moi c'est Elie 😎
            </p>
            <p>
              Ayant beaucoup de plaisir à manier des logiciels comme Photoshop et Illustrator, j’ai décidé de créer ma propre petite entreprise pour mettre à profit tout ce que j’ai appris et faire de ma passion une réalité.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FreelanceAbout;
