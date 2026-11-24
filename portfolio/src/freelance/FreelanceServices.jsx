import { motion, useReducedMotion } from "framer-motion";
import { services } from "./freelanceContent";
import { container } from "./freelanceStyles";
import "./freelanceServices.css";

const FreelanceServices = ({ onRequestQuote }) => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="prestations" aria-labelledby="services-title" tabIndex={-1} className="scroll-mt-28 bg-[#eff5f2] py-10 text-[#07111f] focus:outline-none sm:py-16">
      <div className={container}>
        <h2 id="services-title" className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl">Prestations de graphisme</h2>
        <p className="mt-4 max-w-2xl leading-7 text-[#355452]">
          Je vous accompagne de la première piste graphique aux fichiers prêts à utiliser, qu’il s’agisse de créer votre marque ou de décliner une identité existante.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <motion.article
              key={service.id}
              initial={reduceMotion ? false : { y: 10, opacity: 0.85 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="flex min-w-0 flex-col rounded-lg border border-[#cedbd7] bg-white p-5 transition-colors hover:border-[#137c6a] sm:p-6"
            >
              <span className="mb-5 grid h-11 w-11 place-items-center rounded-lg bg-[#def4ee] text-lg text-[#106b5c]">
                <i className={service.icon} aria-hidden="true" />
              </span>
              <h3 className="freelance-service-title text-lg font-normal leading-[1.85] sm:text-xl sm:leading-[1.85]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#355452]">{service.description}</p>
              <ul className="mb-6 mt-5 list-disc space-y-2 pl-4 text-sm leading-5 marker:text-[#137c6a]">
                {service.deliverables.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href="#contact" onClick={() => onRequestQuote(service.id)} className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 border-t border-[#cedbd7] pt-3 text-sm font-bold text-[#106b5c] hover:underline" aria-label={`Demander un devis pour ${service.title.toLowerCase()}`}>
                Demander un devis <i className="fas fa-arrow-right" aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreelanceServices;
