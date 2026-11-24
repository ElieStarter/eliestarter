import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import monogram from "../EL_el svg.svg";
import elieStarterLogo from "./eliestudio.svg";

const Logo = ({ className = "" }) => {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 sm:gap-3" aria-hidden="true">
      <svg viewBox="388 94 504 504" className="h-14 w-14 shrink-0 sm:h-16 sm:w-16 lg:h-20 lg:w-20">
        <image href={monogram} width="1280" height="800" className="brightness-0 invert" />
      </svg>
      <span
        className={`block shrink-0 bg-current transition-colors duration-300 ${className}`}
        style={{
          aspectRatio: "1008.46 / 318.99",
          WebkitMaskImage: `url(${elieStarterLogo})`,
          maskImage: `url(${elieStarterLogo})`,
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </span>
  );
};

const navLinks = [
  {
    label: "Contact",
    route: "/contact",
    icon: "fas fa-envelope",
  },
  {
    label: "Freelance",
    route: "/el-freelance",
    icon: "fas fa-briefcase",
  },
  {
    label: "Illustrator",
    route: "/illustrator",
    icon: "fas fa-pen-nib",
  },
  {
    label: "Photoshop",
    route: "/photoshop",
    icon: "fas fa-image",
  },
  {
    label: "Projets web",
    route: "/projets-web",
    icon: "fas fa-laptop-code",
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

const getNavLinkClass = ({ isActive }) =>
  [
    "group relative inline-flex items-center gap-2 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-bold uppercase tracking-[0.12em] transition xl:px-3",
    isActive
      ? "bg-[#21c7a8] text-[#07111f]"
      : "text-white/75 hover:bg-white/10 hover:text-[#21c7a8]",
  ].join(" ");

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return undefined;

    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-[#07111f]/85 backdrop-blur-xl">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-5 py-3 md:px-8 xl:px-10 2xl:max-w-screen-2xl"
          aria-label="Navigation principale"
        >
          <Link
            to="/"
            className="inline-flex items-center text-white transition-colors duration-300 hover:text-[#21c7a8]"
            aria-label="Retour a l'accueil"
            onClick={closeMenu}
          >
            <Logo className="h-auto w-40 min-[360px]:w-44 sm:w-52 xl:w-56 2xl:w-60" />
          </Link>

          <ul className="hidden items-center gap-2 xl:flex">
            {navLinks.map((link) => (
              <li key={link.route}>
                <NavLink to={link.route} className={getNavLinkClass}>
                  <i className={`${link.icon} text-sm`} aria-hidden="true" />
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 2xl:flex">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#21c7a8]/70 hover:bg-[#21c7a8] hover:text-[#07111f]"
                aria-label={link.label}
              >
                <i className={link.icon} aria-hidden="true" />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-[#21c7a8] transition hover:bg-white hover:text-[#07111f] xl:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <i className="fas fa-bars" aria-hidden="true" />
          </button>
        </nav>
      </header>

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
        id="mobile-navigation"
        className={`fixed right-0 top-0 z-[120] flex h-dvh w-[86%] max-w-sm flex-col overflow-y-auto overscroll-contain border-l border-white/10 bg-[#07111f] shadow-2xl transition-[transform,visibility] duration-300 ease-out xl:hidden ${
          menuOpen ? "visible translate-x-0" : "invisible translate-x-full pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
        aria-label="Navigation mobile"
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-5 py-5">
          <Link
            to="/"
            aria-label="Retour a l'accueil"
            className="inline-flex text-white transition-colors duration-300 hover:text-[#21c7a8]"
            onClick={closeMenu}
          >
            <Logo className="h-auto w-28 min-[360px]:w-36 sm:w-44" />
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl text-[#07111f] transition hover:bg-[#21c7a8]"
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
          <div className="mb-5 flex justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-[#21c7a8] transition hover:bg-[#21c7a8] hover:text-[#07111f]"
                aria-label={link.label}
              >
                <i className={link.icon} aria-hidden="true" />
              </a>
            ))}
          </div>

          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Portfolio
          </p>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
