import { Link } from "react-router-dom";
import { container } from "./freelanceStyles";

const FreelanceProjects = () => {
  return (
    <section id="projets-clients" aria-labelledby="projects-title" className="scroll-mt-28 bg-[#011627] py-14 sm:py-20">
      <div className={container}>
        <div className="border-l-2 border-[#21c7a8] pl-5 sm:pl-8">
          <h2 id="projects-title" className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl">Projets clients</h2>
          {/* La galerie Strapi prendra la place de cet état vide. */}
          <p className="mt-4 max-w-xl leading-7 text-[#c3dbd8]">Je publierai ici les études de cas de mes projets clients, du brief aux créations livrées.</p>
          <Link to="/illustrator" className="mt-5 inline-flex min-h-11 items-center gap-3 font-bold text-[#21c7a8] hover:text-white">
            Voir mes créations Illustrator <i className="fas fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreelanceProjects;
