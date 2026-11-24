import { Link, NavLink } from "react-router-dom";
import monogram from "../EL_el svg.svg";
import elieStudioLogo from "./eliestudio.svg";

const footerLinks = [
  { label: "Contact", route: "/contact", icon: "fas fa-envelope" },
  { label: "Freelance", route: "/el-freelance", icon: "fas fa-briefcase" },
  { label: "Illustrator", route: "/illustrator", icon: "fas fa-pen-nib" },
  { label: "Photoshop", route: "/photoshop", icon: "fas fa-image" },
  { label: "Projets web", route: "/projets-web", icon: "fas fa-laptop-code" },
  { label: "Mockups", route: "/mockup", icon: "fas fa-layer-group" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: "fab fa-github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/elie-levy-65b3653a3", icon: "fab fa-linkedin" },
  { label: "Instagram", href: "https://instagram.com", icon: "fab fa-instagram" },
];

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#07111f] text-white">
    <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-11 xl:px-10 2xl:max-w-screen-2xl">
      <div className="flex flex-col items-center gap-6 xl:flex-row xl:justify-between">
        <Link
          to="/"
          aria-label="Retour à l’accueil"
          className="inline-flex shrink-0 items-center gap-2 text-white transition-colors hover:text-[#21c7a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#21c7a8] sm:gap-3"
        >
          <svg viewBox="388 94 504 504" className="h-14 w-14 shrink-0 sm:h-16 sm:w-16 lg:h-20 lg:w-20" aria-hidden="true">
            <image href={monogram} width="1280" height="800" className="brightness-0 invert" />
          </svg>
          <span
            aria-hidden="true"
            className="block w-44 shrink-0 bg-current sm:w-56 xl:w-[300px]"
            style={{
              aspectRatio: "1008.46 / 318.99",
              maskImage: "url(" + elieStudioLogo + ")",
              WebkitMaskImage: "url(" + elieStudioLogo + ")",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
        </Link>

        <nav className="min-w-0" aria-label="Navigation du pied de page">
          <ul className="flex flex-wrap justify-center gap-1 xl:justify-end 2xl:gap-2">
            {footerLinks.map((link) => (
              <li key={link.route}>
                <NavLink
                  to={link.route}
                  className={({ isActive }) =>
                    "inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#21c7a8] " +
                    (isActive ? "bg-[#21c7a8] text-[#07111f]" : "text-white/75 hover:bg-white/10 hover:text-[#21c7a8]")
                  }
                >
                  <i className={link.icon} aria-hidden="true" />
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 border-t border-white/10 pt-5 xl:justify-end">
        <p className="text-sm font-semibold text-white/70">Mes réseaux</p>
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-colors hover:border-[#21c7a8] hover:bg-[#21c7a8] hover:text-[#07111f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21c7a8]"
                aria-label={link.label}
              >
                <i className={link.icon} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
