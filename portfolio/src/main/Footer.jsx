import elieStudioLogo from "./eliestudio.svg";
import { Link } from "react-router-dom";

const Logo = ({ className = "" }) => {
  return (
    <span
      className={`block bg-current transition-colors duration-300 ${className}`}
      role="img"
      aria-label="Logo du portfolio"
      style={{
        aspectRatio: "1008.46 / 318.99",
        WebkitMaskImage: `url(${elieStudioLogo})`,
        maskImage: `url(${elieStudioLogo})`,
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
};

const footerLinks = [
  {
    label: "Projets web",
    route: "/projets-web",
    icon: "fas fa-laptop-code",
  },
  {
    label: "Photoshop",
    route: "/photoshop",
    icon: "fas fa-image",
  },
  {
    label: "Illustrator",
    route: "/illustrator",
    icon: "fas fa-pen-nib",
  },
  {
    label: "Mockups",
    route: "/mockup",
    icon: "fas fa-layer-group",
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: "fab fa-github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "fab fa-linkedin",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "fab fa-instagram",
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#011627] px-6 py-14 lg:px-24">
      <div className="flex flex-col items-center gap-y-10 text-center lg:flex-row lg:justify-between lg:text-left">
        <Link
          to="/"
          aria-label="Retour a l'accueil"
          className="inline-flex text-white transition-colors duration-300 hover:text-[#21c7a8]"
        >
          <Logo className="w-[300px] max-w-[80vw]" />
        </Link>

        <nav aria-label="Navigation du pied de page">
          <ul className="flex flex-col gap-4 text-lg font-bold text-[#21c7a8] lg:flex-row lg:gap-5 xl:gap-8">
            {footerLinks.map((link) => (
              <li key={link.route}>
                <Link
                  to={link.route}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
                >
                  <i className={link.icon} aria-hidden="true" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center lg:items-end">
          <h2 className="mb-5 text-2xl font-bold text-white/55">Mes réseaux</h2>

          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-[#21c7a8] transition hover:border-[#21c7a8]/70 hover:bg-[#21c7a8] hover:text-[#011627]"
                aria-label={link.label}
              >
                <i className={link.icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;