import { useNavigate } from "react-router-dom";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const footerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const btnRef = useRef(null);
  const navColRef = useRef(null);
  const socialColRef = useRef(null);
  const bottomBarRef = useRef(null);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Work", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  // TODO: swap these for your real profile URLs.
  const socials = [
    { name: "GitHub", href: "https://github.com/nischal-code" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/nischal-ruchal-a12957351/" },
    { name: "Email", href: "mailto:nischalruchal90@gmail.com" },
  ];

  const go = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.6,
      })
        .from(
          headingRef.current,
          {
            opacity: 0,
            y: 24,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          paraRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
          },
          "-=0.45"
        )
        .from(
          btnRef.current,
          {
            opacity: 0,
            y: 12,
            scale: 0.96,
            duration: 0.5,
          },
          "-=0.35"
        )
        .from(
          navColRef.current.querySelectorAll("li"),
          {
            opacity: 0,
            y: 14,
            duration: 0.45,
            stagger: 0.06,
          },
          "-=0.5"
        )
        .from(
          socialColRef.current.querySelectorAll("li"),
          {
            opacity: 0,
            y: 14,
            duration: 0.45,
            stagger: 0.06,
          },
          "<"
        )
        .from(
          bottomBarRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.5,
          },
          "-=0.2"
        );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
  ref={footerRef}
  className="fd-cross relative text-ink mt-16 sm:mt-24 mx-3 sm:mx-6 lg:mx-8 mb-3 sm:mb-6 lg:mb-8 rounded-2xl overflow-hidden border border-line"
  style={{
    background: `
      radial-gradient(120% 90% at 85% -10%, rgba(155, 58, 53, 0.14) 0%, transparent 55%),
      radial-gradient(90% 70% at 5% 110%, rgba(155, 58, 53, 0.07) 0%, transparent 55%),
      linear-gradient(160deg, #151513 0%, #1b1a18 45%, #0d0d0c 100%)
    `,
  }}
>
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-12 md:gap-8">
          <div>
            <span
              ref={eyebrowRef}
              className="fd-mono fd-eyebrow text-accent inline-block"
            >
              Let&rsquo;s build something together
            </span>
            <h2
              ref={headingRef}
              className="fd-display font-semibold mt-4"
              style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.4rem)" }}
            >
              <span className="fd-name-gradient">Nischal Ruchal</span>
            </h2>
            <p
              ref={paraRef}
              className="fd-body text-ink-soft mt-4 max-w-sm text-[14px] leading-relaxed"
            >
              Frontend-leaning full-stack developer, currently open to freelance
              work and new opportunities.
            </p>
            <button
              ref={btnRef}
              onClick={() => go("/contact")}
              className="fd-btn-dark inline-block mt-6 px-5 py-2.5 rounded-full fd-mono text-[12px] tracking-[0.12em] uppercase font-medium cursor-pointer"
            >
              Say Hello ↗
            </button>
          </div>

          <div>
            <span className="fd-mono fd-eyebrow text-ink-soft/60">Navigate</span>
            <ul ref={navColRef} className="mt-4 space-y-3">
              {links.map((l) => (
                <li key={l.name}>
                  <span
                    onClick={() => go(l.path)}
                    className="fd-link fd-body text-sm text-ink/80 hover:text-ink cursor-pointer"
                  >
                    {l.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="fd-mono fd-eyebrow text-ink-soft/60">Elsewhere</span>
            <ul ref={socialColRef} className="mt-4 space-y-3">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="fd-link fd-body text-sm text-ink/80 hover:text-ink"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          ref={bottomBarRef}
          className="fd-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-14 pt-6 border-t border-line text-[10px] tracking-[0.2em] uppercase text-ink-soft/50"
        >
          <span>© {year} Nischal Ruchal. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}