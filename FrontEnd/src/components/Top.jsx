import { useRef, useEffect, useState } from "react";
import { img } from "../assets/assets";

/**
 * Hero / home section for Nischal Ruchal's portfolio.
 * This is the resting "top" layer of the cursor-reveal panel — a
 * quiet, flat charcoal surface. Moving the cursor clips it away to
 * reveal the warmer, elevated Bottom layer underneath (see Bottom.jsx).
 * No external animation library required (drop-in replacement
 * for the gsap version — swap the interval logic back to gsap
 * timelines in your own project if you prefer).
 */
export default function Top({ revealed = true, setRevealed }) {
    const greetings = [
        "Hello",
        "Namaste",
        "Hola",
        "Bonjour",
        "Ciao",
        "こんにちは",
        "안녕하세요",
        "你好",
        "مرحبا",
        "Hallo",
    ];

    const skills = ["Web Developer", "Frontend Developer", "Backend Developer", "Designer"];

    const [greetIndex, setGreetIndex] = useState(0);
    const [greetVisible, setGreetVisible] = useState(true);
    const [skillIndex, setSkillIndex] = useState(0);
    const [skillVisible, setSkillVisible] = useState(true);
    const [mounted, setMounted] = useState(false);

    const greetTimer = useRef(null);
    const skillTimer = useRef(null);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 60);
        if (typeof setRevealed === "function") setRevealed(true);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Greeting rotation
    useEffect(() => {
        greetTimer.current = setInterval(() => {
            setGreetVisible(false);
            setTimeout(() => {
                setGreetIndex((i) => (i + 1) % greetings.length);
                setGreetVisible(true);
            }, 380);
        }, 2800);
        return () => clearInterval(greetTimer.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Role rotation
    useEffect(() => {
        skillTimer.current = setInterval(() => {
            setSkillVisible(false);
            setTimeout(() => {
                setSkillIndex((i) => (i + 1) % skills.length);
                setSkillVisible(true);
            }, 380);
        }, 3200);
        return () => clearInterval(skillTimer.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-bg text-ink overflow-hidden select-none">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,600;1,9..144,440&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap');

        .fd-display { font-family: 'Fraunces', serif; }
        .fd-mono { font-family: 'JetBrains Mono', monospace; }
        .fd-body { font-family: 'Inter', sans-serif; }

        .fd-cross {
          background-image:
            linear-gradient(to right, rgba(241,238,231,0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(241,238,231,0.045) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        @keyframes fdFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fd-in { animation: fdFadeUp 0.9s cubic-bezier(.19,1,.22,1) both; }

        @keyframes fdBlink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        .fd-cursor { animation: fdBlink 1.1s steps(1) infinite; }

        @keyframes fdCornerH {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fdCornerV {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        .fd-corner-h { animation: fdCornerH 0.7s cubic-bezier(.19,1,.22,1) both; }
        .fd-corner-v { animation: fdCornerV 0.7s cubic-bezier(.19,1,.22,1) both; }

        .fd-fade { transition: opacity 0.38s ease, transform 0.38s ease; }
        .fd-fade-hidden { opacity: 0; transform: translateY(10px); }
        .fd-fade-visible { opacity: 1; transform: translateY(0); }

        .fd-link { position: relative; }
        .fd-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -3px;
          width: 100%; height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(.19,1,.22,1);
        }
        .fd-link:hover::after { transform: scaleX(1); transform-origin: left; }

        @media (prefers-reduced-motion: reduce) {
          .fd-in, .fd-corner-h, .fd-corner-v, .fd-cursor { animation: none !important; }
          .fd-fade { transition: none !important; }
        }
      `}</style>

            {/* top strip */}
            <div
                className={`fd-mono fd-in flex items-center justify-between px-6 md:px-12 py-5 border-b border-ink/10 text-[11px] tracking-[0.25em] uppercase text-ink/45`}
                style={{ animationDelay: "0.05s" }}
            >
                <span>Nischal Ruchal</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] min-h-[calc(100vh-64px-64px)]">
                <div className="flex flex-col justify-center px-6 md:px-12 py-16 lg:py-0 border-r border-ink/10">
                    <div
                        className="fd-in fd-display italic text-2xl md:text-3xl text-ink/60 h-10 overflow-hidden"
                        style={{ animationDelay: "0.15s" }}
                    >
                        <div
                            className={`fd-fade ${greetVisible ? "fd-fade-visible" : "fd-fade-hidden"}`}
                        >
                            {greetings[greetIndex]},
                        </div>
                    </div>
                    <h1
                        className="fd-in fd-display font-semibold leading-[0.95] mt-2"
                        style={{
                            fontSize: "clamp(2.6rem, 6.4vw, 5.6rem)",
                            animationDelay: "0.28s",
                        }}
                    >
                        I&rsquo;m Nischal
                        <br />
                        Ruchal.
                    </h1>
                    <div
                        className="fd-in fd-mono mt-7 flex items-center gap-3 text-base md:text-lg text-ink/80 h-8 overflow-hidden"
                        style={{ animationDelay: "0.42s" }}
                    >
                        <span className="text-ink/35">&gt;</span>
                        <span
                            className={`fd-fade ${skillVisible ? "fd-fade-visible" : "fd-fade-hidden"}`}
                        >
                            {skills[skillIndex]}
                        </span>
                        <span className="fd-cursor text-ink/60">_</span>
                    </div>
                    <p
                        className="fd-in fd-body mt-8 max-w-md text-ink-soft leading-relaxed text-[15px] md:text-base"
                        style={{ animationDelay: "0.55s" }}
                    >
                        I build interfaces end to end — from layout and interaction
                        design down to the systems that serve them. Clean code,
                        considered detail, nothing left unfinished.
                    </p>
                    <div
                        className="fd-in fd-mono mt-10 flex items-center gap-8 text-[13px] tracking-[0.12em] uppercase"
                        style={{ animationDelay: "0.68s" }}
                    >
                        <a href="/projects" className="fd-link text-ink py-2 px-3 bg-accent rounded-3xl">
                            View Work
                        </a>
                        <a href="/contact" className="fd-link text-ink/55 hover:text-ink">
                            Say Hello ↗
                        </a>
                    </div>
                </div>

                {/* RIGHT — image slot */}
                <div className="relative flex items-center justify-center p-8 md:p-14 min-h-105 lg:min-h-0 fd-cross">
                    <div
                        className="fd-in relative w-full max-w-85 aspect-3/4 border border-ink/15 bg-ink/[0.02] overflow-hidden"
                        style={{ animationDelay: "0.35s" }}
                    >
                        <img
                            src={img.sketch}
                            alt="Nischal Ruchal"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* corner brackets stay exactly as they are */}
                        <span className="fd-corner-h absolute -top-px -left-px w-8 h-[2px] bg-ink/70 origin-left" style={{ animationDelay: "0.9s" }} />
                        {/* ...rest of the bracket spans... */}
                    </div>

                    <span className="fd-mono absolute bottom-4 right-8 md:right-14 text-[10px] tracking-[0.25em] text-ink/25">
                        IMG — 3:4
                    </span>
                </div>
            </div>
            <div
                className="fd-mono fd-in flex items-center justify-between px-6 md:px-12 py-5 border-t border-ink/10 text-[11px] tracking-[0.25em] uppercase text-ink/40"
                style={{ animationDelay: "0.8s" }}
            >
            </div>
        </div>
    );
}