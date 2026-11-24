import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Navbar from "../main/Navbar";
import Footer from "../main/Footer";
import FreelanceHero from "./FreelanceHero";
import FreelanceAbout from "./FreelanceAbout";
import FreelanceServices from "./FreelanceServices";
import FreelanceProjects from "./FreelanceProjects";
import FreelanceContact from "./FreelanceContact";
import useFreelanceSeo from "./freelanceSeo";

const Freelance = ({ contactEmail = "", siteOrigin } = {}) => {
  useFreelanceSeo(siteOrigin);
  const reduceMotion = useReducedMotion();
  const [selection, setSelection] = useState({ type: "devis", service: "" });

  useEffect(() => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = reduceMotion ? "auto" : "smooth";

    return () => {
      root.style.scrollBehavior = previousBehavior;
    };
  }, [reduceMotion]);

  const requestQuote = (service = "") => setSelection({ type: "devis", service });

  return (
    <div className="min-h-screen bg-[#07111f] text-white" lang="fr">
      <Navbar />

      <main>
        <FreelanceHero onRequestQuote={requestQuote} />
        <FreelanceAbout />
        <FreelanceServices onRequestQuote={requestQuote} />
        <FreelanceProjects />
        <FreelanceContact
          selection={selection}
          setSelection={setSelection}
          contactEmail={contactEmail.trim()}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Freelance;
