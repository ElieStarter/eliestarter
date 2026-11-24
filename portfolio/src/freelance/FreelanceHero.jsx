import { motion, useReducedMotion } from "framer-motion";
import monogram from "../EL_el svg.svg";
import freelanceWordmark from "../eliestudiofreelance.svg";
import heroImage from "./atelier-eliestudio.jpg";
import { container, primaryButton } from "./freelanceStyles";

const FreelanceHero = ({ onRequestQuote }) => {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="freelance-title" className="relative isolate flex min-h-[430px] items-center overflow-hidden sm:min-h-[500px] lg:min-h-[min(37rem,calc(100svh-10rem))]">
      <img src={heroImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_center] lg:object-center" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#07111f]/80 sm:bg-[#07111f]/65 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#07111f] lg:via-[#07111f]/80 lg:to-transparent" />

      <div className={`${container} py-8 sm:py-12`}>
        <motion.div
          className="max-w-xl"
          initial={reduceMotion ? false : { y: 14, opacity: 0.85 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
        >
          <div className="mb-4 flex items-center gap-3 sm:gap-4">
            <svg viewBox="388 94 504 504" className="h-16 w-16 shrink-0 sm:h-20 sm:w-20 lg:h-24 lg:w-24" aria-hidden="true">
              <image href={monogram} width="1280" height="800" className="brightness-0 invert" />
            </svg>
            <span className="h-8 w-px shrink-0 bg-[#21c7a8]/65" aria-hidden="true" />
            <img
              src={freelanceWordmark}
              alt="ElieStudio Freelance"
              width={1008}
              height={335}
              className="h-auto w-40 min-w-0 brightness-0 invert sm:w-52 lg:w-64"
            />
          </div>
          <h1 id="freelance-title" className="font-playfair text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">
            Graphiste <span className="block">freelance</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-[#e0ebe8] sm:text-lg sm:leading-8">
            Je crée votre logo et votre identité visuelle pour donner forme à votre vision.
            Si vous avez des doutes quant a l'idée, je peux vous y aider 😊
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
            <a href="#contact" className={primaryButton} onClick={() => onRequestQuote()}>
              Demander un devis <i className="fas fa-arrow-right" aria-hidden="true" />
            </a>
            <a href="#prestations" className="font-semibold text-white underline decoration-[#21c7a8] underline-offset-8 hover:text-[#21c7a8]">Voir les prestations</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreelanceHero;
