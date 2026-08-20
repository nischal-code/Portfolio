import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Work", path: "/projects" },
    { name: "Experience", path: "/experience" },
  ];

  const close = () => setMenuOpen(false);

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`w-[90%] xl:w-[80%] mx-auto sticky top-4 border rounded-2xl px-6 py-4 font-['JetBrains_Mono',monospace] z-50 transition-all duration-300 ${
        scrolled
          ? "mt-0 bg-[rgba(21,21,19,0.82)] backdrop-blur-md border-ink/12 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
          : "mt-4 bg-[rgba(21,21,19,0.6)] backdrop-blur-md border-ink/12 shadow-none"
      }`}
    >
      {/* Google font import — Tailwind utilities alone can't add this */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,600;1,9..144,440&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>

      {/* Desktop Navbar */}
      <div className="hidden xl:flex justify-between items-center">
        <span
          onClick={() => navigate("/")}
          className="font-['Fraunces',serif] text-xl font-semibold tracking-tight text-ink cursor-pointer"
        >
          Nischal Ruchal
        </span>

        <ul className="flex gap-2 text-[13px] tracking-[0.12em] uppercase">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={`relative px-3 py-1 cursor-pointer transition-colors duration-200 hover:text-accent after:content-[''] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-px after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                isActive(item.path)
                  ? "text-accent after:scale-x-100"
                  : "text-ink-soft"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/contact")}
          className="text-[12px] tracking-[0.12em] uppercase border border-ink/25 rounded-full px-5 py-2 text-ink/80 hover:text-accent hover:border-accent/50 transition-colors duration-200"
        >
          Let's Talk
        </button>
      </div>

      {/* Mobile Navbar */}
      <div className="flex xl:hidden justify-between items-center">
        <span
          onClick={() => navigate("/")}
          className="font-['Fraunces',serif] text-lg font-semibold tracking-tight text-ink cursor-pointer"
        >
          Nischal Ruchal
        </span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="text-ink"
        >
          <span
            className={`inline-block transition-transform duration-300 ${
              menuOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-96 opacity-100 mt-4 pt-4 border-t border-ink/10"
            : "max-h-0 opacity-0 mt-0 pt-0 border-t-0"
        }`}
      >
        <ul className="flex flex-col gap-4 text-[13px] tracking-[0.12em] uppercase">
          {menuItems.map((item, index) => (
            <li
              key={item.name}
              onClick={() => goTo(item.path)}
              aria-current={isActive(item.path) ? "page" : undefined}
              style={{
                transitionDelay: menuOpen ? `${index * 40}ms` : "0ms",
              }}
              className={`cursor-pointer w-fit transition-all duration-300 ease-out ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              } ${
                isActive(item.path)
                  ? "text-accent underline underline-offset-4"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className="mt-5" onClick={close}>
          <button
            onClick={() => navigate("/contact")}
            className="w-full text-[12px] tracking-[0.12em] uppercase border border-ink/25 rounded-full px-5 py-2.5 text-ink/80 hover:text-accent hover:border-accent/50 transition-colors duration-200"
          >
            Let's Talk
          </button>
        </div>
      </div>
    </nav>
  );
}