import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope, faPenNib, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../main/Navbar";
import Footer from "../main/Footer";
import usePortfolioSeo from "../main/usePortfolioSeo";
import portrait from "../main/portrait-elie.webp";
import monogram from "../EL_el svg.svg";
import elieStudioWordmark from "../eliestudio.svg";
import { ContactForm } from "../freelance/FreelanceContact";
import { linkedIn } from "../freelance/freelanceContent";

const metadata = {
  path: "/contact",
  title: "Contact et devis graphisme | ElieStudio",
  description: "Contactez Elie Levy pour créer un logo, une identité visuelle ou une interface web. Demandez un devis, une facture ou envoyez votre message.",
  type: "ContactPage",
  image: portrait,
  imageAlt: "Portrait d’Elie Levy",
};

const container = "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12";
const contactEmail = (process.env.REACT_APP_CONTACT_EMAIL || "").trim();

const ContactPage = () => {
  usePortfolioSeo(metadata);
  const [params] = useSearchParams();
  const requestedType = params.get("demande");
  const initialType = requestedType === "devis" || requestedType === "facture" ? requestedType : "message";
  const [selection, setSelection] = useState({ type: initialType, service: "" });

  useEffect(() => {
    setSelection((previous) => ({ ...previous, type: initialType }));
  }, [initialType]);

  useEffect(() => {
    if (window.scrollY > 0) window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#07111f] text-white" lang="fr">
      <Navbar />
      <main>
        <header className="border-b border-white/10 py-9 sm:py-12">
          <div className={container}>
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
              <svg viewBox="388 94 504 504" className="h-14 w-14 shrink-0 sm:h-20 sm:w-20" aria-hidden="true">
                <image href={monogram} width="1280" height="800" className="brightness-0 invert" />
              </svg>
              <span className="h-7 w-px shrink-0 bg-[#21c7a8]/65" aria-hidden="true" />
              <img
                src={elieStudioWordmark}
                alt="ElieStudio"
                width={1008}
                height={271}
                className="h-auto w-36 brightness-0 invert sm:w-48"
              />
            </div>
            <h1 className="font-baskerville text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Parlons de votre projet
            </h1>
            <p className="mt-4 max-w-xl leading-7 text-[#d4e5e2]">
              Une idée de logo, un besoin de charte graphique ou un projet web ? Racontez-moi ce que vous souhaitez créer.
            </p>
          </div>
        </header>

        <section className="bg-[#eff5f2] py-9 text-[#07111f] sm:py-14" aria-label="Envoyer une demande à ElieStudio">
          <div className={container + " grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16"}>
            <div className="order-2 lg:order-1">
              <h2 className="font-baskerville text-2xl font-bold leading-tight sm:text-3xl">Contact direct</h2>
              <div className="mt-4 divide-y divide-[#bfd3ca] border-y border-[#bfd3ca]">
                {contactEmail && (
                  <a href={"mailto:" + contactEmail} className="flex min-h-14 items-center justify-between gap-4 py-3 font-bold text-[#106b5c] hover:underline">
                    <span className="min-w-0 break-words">{contactEmail}</span>
                    <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
                  </a>
                )}
                <a href={linkedIn} target="_blank" rel="noreferrer" className="flex min-h-14 items-center justify-between gap-4 py-3 font-bold text-[#106b5c] hover:underline">
                  Écrire sur LinkedIn <FontAwesomeIcon icon={faUpRightFromSquare} aria-hidden="true" />
                </a>
                <Link to="/el-freelance" className="flex min-h-14 items-center justify-between gap-4 py-3 font-bold text-[#106b5c] hover:underline">
                  Voir mes prestations freelance <FontAwesomeIcon icon={faPenNib} aria-hidden="true" />
                </Link>
              </div>
              <Link to="/illustrator" className="mt-5 inline-flex min-h-11 items-center gap-3 font-bold text-[#106b5c] hover:underline">
                Explorer les logos et identités <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
              </Link>
            </div>

            <div className="order-1 min-w-0 lg:order-2">
              <ContactForm selection={selection} setSelection={setSelection} contactEmail={contactEmail} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
