import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { linkedIn, services } from "./freelanceContent";
import { container, primaryButton } from "./freelanceStyles";

const requestTypes = [
  { value: "devis", label: "Devis", icon: "fas fa-file-alt" },
  { value: "facture", label: "Facture", icon: "fas fa-file-invoice" },
  { value: "message", label: "Message", icon: "fas fa-envelope" },
];

const apiBase = (process.env.REACT_APP_STRAPI_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:1337" : "https://api.eliestudio.com")).trim().replace(/\/+$/, "");
const defaultContactEmail = "el.contact.freelance@gmail.com";

const fieldClass = "mt-2 min-h-12 w-full min-w-0 rounded-md border border-[#b9cdc6] bg-[#f6faf8] px-3.5 py-3 text-[#07111f] motion-safe:transition-colors hover:border-[#79988e] focus:border-[#137c6a] focus:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#137c6a]";
const fieldLabelClass = "block min-w-0 text-sm font-semibold text-[#18352f] focus-within:text-[#106b5c]";

export const ContactForm = ({ selection, setSelection, contactEmail }) => {
  const reduceMotion = useReducedMotion();
  const [feedback, setFeedback] = useState(null);
  const [reference, setReference] = useState("");
  const inFlight = useRef(false);
  const sending = feedback?.status === "sending";
  const isQuote = selection.type === "devis";
  const isInvoice = selection.type === "facture";
  const activeRequestIndex = requestTypes.findIndex(({ value }) => value === selection.type);
  const requestFieldMotion = {
    initial: reduceMotion ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.23, ease: "easeOut" },
  };
  const layoutMotion = {
    layout: reduceMotion ? false : "position",
    layoutDependency: selection.type,
    transition: { layout: { duration: 0.24, ease: "easeOut" } },
  };

  const sendRequest = async (event) => {
    event.preventDefault();
    if (inFlight.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (key) => String(data.get(key) ?? "").trim();
    const request = {
      requestType: selection.type,
      name: field("name"),
      email: field("email"),
      message: field("message"),
      reference: field("reference"),
      service: field("service"),
      website: field("website"),
    };

    if (!request.name || !request.email || !request.message || (isInvoice && !request.reference) || (isQuote && !request.service)) {
      setFeedback({ status: "error", text: "Vérifiez que tous les champs obligatoires sont renseignés." });
      return;
    }

    inFlight.current = true;
    setFeedback({ status: "sending", text: "Envoi en cours…" });
    try {
      const response = await fetch(`${apiBase}/api/freelance-contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(45000),
      });

      if (response.status === 503) {
        setFeedback({
          status: "error",
          text: "L’envoi par formulaire est momentanément indisponible. Votre message a été conservé.",
        });
        return;
      }
      if (response.status === 429) {
        setFeedback({ status: "error", text: "Trop de tentatives. Réessayez dans quelques minutes." });
        return;
      }
      if (response.status === 400) {
        setFeedback({ status: "error", text: "Vérifiez votre adresse e-mail et les champs de votre demande." });
        return;
      }
      if (!response.ok || (await response.json())?.sent !== true) throw new Error("Delivery not confirmed");

      form.reset();
      setReference("");
      setSelection((current) => current === selection ? { ...current, service: "" } : current);
      setFeedback({ status: "sent", text: "Votre demande a bien été envoyée. Merci !" });
    } catch {
      setFeedback({
        status: "error",
        text: "Impossible de confirmer l’envoi. Votre message est toujours dans le formulaire.",
      });
    } finally {
      inFlight.current = false;
    }
  };

  return (
    <form onSubmit={sendRequest} onChange={() => { if (!inFlight.current) setFeedback(null); }} className="min-w-0 space-y-5 rounded-lg border border-[#cedbd7] bg-white p-5 shadow-[0_12px_36px_#07111f0d] sm:p-8">
      <fieldset disabled={sending} className="min-w-0 border-b border-[#dce8e3] pb-5 disabled:opacity-70">
        <legend className="mb-5 font-playfair text-3xl font-bold leading-tight sm:text-4xl">Votre demande</legend>
        <div className="rounded-lg border border-[#cfdfd8] bg-[#eaf4f0] p-1.5">
          <div className="relative isolate grid grid-cols-3">
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 rounded-md bg-[#07111f] shadow-sm"
              initial={false}
              animate={{ x: `${activeRequestIndex * 100}%` }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 38 }}
            />
            {requestTypes.map(({ value, label, icon }) => (
              <label key={value} className="min-w-0 cursor-pointer">
                <input
                  className="peer sr-only"
                  type="radio"
                  name="requestType"
                  value={value}
                  checked={selection.type === value}
                  onChange={() => setSelection({ ...selection, type: value })}
                />
                <span className="relative flex min-h-12 items-center justify-center gap-2 rounded-md px-1 text-center text-sm font-bold text-[#355452] motion-safe:transition-colors peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#137c6a]">
                  <i className={`${icon} hidden min-[440px]:inline-block`} aria-hidden="true" />
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={fieldLabelClass}>
          Nom complet
          <input className={fieldClass} name="name" autoComplete="name" maxLength={100} disabled={sending} required />
        </label>
        <label className={fieldLabelClass}>
          Adresse e-mail
          <input className={fieldClass} name="email" type="email" autoComplete="email" maxLength={254} disabled={sending} required />
        </label>
      </div>

      {(isQuote || isInvoice) && (
        <motion.div key={selection.type} {...requestFieldMotion}>
          {isQuote ? (
            <label className={fieldLabelClass}>
              Prestation souhaitée
              <select
                className={fieldClass}
                name="service"
                value={selection.service}
                onChange={(event) => setSelection({ ...selection, service: event.target.value })}
                disabled={sending}
                required
              >
                <option value="" disabled>Choisissez une prestation</option>
                {services.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}
                <option value="autre">Autre projet</option>
              </select>
            </label>
          ) : (
            <label className={fieldLabelClass}>
              Nom ou référence du projet
              <input
                className={fieldClass}
                name="reference"
                value={reference}
                onChange={(event) => setReference(event.target.value)}
                maxLength={120}
                disabled={sending}
                required
              />
            </label>
          )}
        </motion.div>
      )}

      <motion.label className={fieldLabelClass} {...layoutMotion}>
        <motion.span key={selection.type} className="block" {...requestFieldMotion}>
          {isQuote ? "Décrivez votre projet" : "Votre message"}
        </motion.span>
        <textarea className={`${fieldClass} resize-y leading-6`} name="message" rows={5} maxLength={1500} disabled={sending} required />
      </motion.label>

      <div hidden>
        <label>
          Site web
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <motion.div className="border-t border-[#dce8e3] pt-5" {...layoutMotion}>
        <button className={`${primaryButton} w-full disabled:cursor-wait disabled:opacity-70`} type="submit" disabled={sending}>
          Envoyer ma demande <i className="fas fa-paper-plane" aria-hidden="true" />
        </button>
      </motion.div>

      <p
        role="status"
        aria-atomic="true"
        className={feedback ? `text-sm font-semibold ${feedback.status === "error" ? "text-[#9e2f27]" : "text-[#106b5c]"}` : "sr-only"}
      >
        {feedback?.text}
      </p>
      {feedback?.status === "error" && (
        <a className="inline-block text-sm font-bold text-[#106b5c] underline underline-offset-4" href={`mailto:${contactEmail || defaultContactEmail}`}>
          Écrire directement à ElieStudio
        </a>
      )}
    </form>
  );
};

const FreelanceContact = ({ selection, setSelection, contactEmail }) => {
  return (
    <section id="contact" aria-labelledby="contact-title" tabIndex={-1} className="scroll-mt-28 bg-[#eff5f2] py-14 text-[#07111f] focus:outline-none sm:py-20">
      <div className={`${container} grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16`}>
        <div>
          <h2 id="contact-title" className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl">Parlons de votre projet</h2>
          <p className="mt-4 max-w-md leading-7 text-[#355452]">
            Décrivez votre activité, les supports dont vous avez besoin et votre échéance. Pour une facture, indiquez le nom ou la référence d’un projet déjà réalisé ensemble.
          </p>
          <a href={linkedIn} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-3 font-bold text-[#106b5c] hover:underline">
            <i className="fab fa-linkedin" aria-hidden="true" /> Me contacter sur LinkedIn
          </a>
        </div>

        <ContactForm selection={selection} setSelection={setSelection} contactEmail={contactEmail} />
      </div>
    </section>
  );
};

export default FreelanceContact;
