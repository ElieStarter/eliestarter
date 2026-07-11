import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import elieStudioLogo from "../main/eliestudio.svg";

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

const navLinks = [
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
    href: "https://linkedin.com/in/elie-levy-65b3653a3",
    icon: "fab fa-linkedin",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "fab fa-instagram",
  },
];

const Navmockup = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-[#07111f]/85 backdrop-blur-xl"
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-5 md:px-8 lg:px-10"
          aria-label="Navigation mockup"
        >
          <Link
            to="/"
            className="inline-flex text-white transition-colors duration-300 hover:text-[#21c7a8]"
            aria-label="Retour a l'accueil"
            onClick={closeMenu}
          >
            <Logo className="h-auto w-40 sm:w-48 lg:w-56 2xl:w-60" />
          </Link>

          <ul className="hidden items-center gap-2 font-playfair text-2xl font-bold text-white xl:flex 2xl:gap-5 2xl:text-3xl">
            {navLinks.map((link) => (
              <li key={link.route}>
                <NavLink
                  to={link.route}
                  className={({ isActive }) =>
                    [
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 transition",
                      isActive
                        ? "bg-white text-[#07111f]"
                        : "hover:bg-white/10 hover:text-[#21c7a8]",
                    ].join(" ")
                  }
                >
                  <i className={`${link.icon} text-base`} aria-hidden="true" />
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xl text-[#21c7a8] transition hover:bg-white hover:text-[#07111f] xl:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="mockup-mobile-navigation"
          >
            <i className="fas fa-bars" aria-hidden="true" />
          </button>
        </nav>
      </motion.header>

      <div className="h-[88px] sm:h-[96px] lg:h-[108px]" aria-hidden="true" />

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm xl:hidden"
          onClick={closeMenu}
          aria-label="Fermer le menu"
        />
      )}

      <aside
        id="mockup-mobile-navigation"
        className={`fixed right-0 top-0 z-[120] flex h-dvh w-[86%] max-w-sm flex-col border-l border-white/10 bg-[#011627] shadow-2xl transition-transform duration-300 ease-out xl:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Navigation mobile mockup"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <Link
            to="/"
            className="inline-flex text-white transition-colors duration-300 hover:text-[#21c7a8]"
            aria-label="Retour a l'accueil"
            onClick={closeMenu}
          >
            <Logo className="h-auto w-40 sm:w-44" />
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-[#07111f] transition hover:bg-[#21c7a8]"
            aria-label="Fermer le menu"
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <ul className="flex flex-1 flex-col gap-3 px-5 py-8">
          {navLinks.map((link) => (
            <li key={link.route}>
              <NavLink
                to={link.route}
                onClick={closeMenu}
                className={({ isActive }) =>
                  [
                    "flex items-center justify-between rounded-2xl border px-5 py-4 text-lg font-black transition",
                    isActive
                      ? "border-[#21c7a8] bg-[#21c7a8] text-[#07111f]"
                      : "border-white/10 bg-white/[0.06] text-white hover:border-[#21c7a8]/70 hover:text-[#21c7a8]",
                  ].join(" ")
                }
              >
                <span className="flex items-center gap-3">
                  <i className={`${link.icon} text-base`} aria-hidden="true" />
                  {link.label}
                </span>
                <span aria-hidden="true">&rarr;</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="border-t border-white/10 px-5 py-6">
          <div className="mb-5 flex justify-center gap-4 text-xl">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#21c7a8] transition hover:bg-[#21c7a8] hover:text-[#07111f]"
                aria-label={link.label}
              >
                <i className={link.icon} aria-hidden="true" />
              </a>
            ))}
          </div>

          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Mockup Design
          </p>
        </div>
      </aside>
    </>
  );
};

export default Navmockup;
