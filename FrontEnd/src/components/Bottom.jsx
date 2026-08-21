import { useState, useEffect, useRef } from "react";
import { img } from "../assets/assets";

export default function Bottom({ revealed, setRevealed }) {
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

    // corner bracket spans, drawn in sequence like crop / registration marks
    const corners = [
        { pos: "-top-px -left-px", h: "origin-left", v: "origin-top", delay: 0.9 },
        { pos: "-top-px -right-px", h: "origin-right", v: "origin-top", delay: 0.98 },
        { pos: "-bottom-px -left-px", h: "origin-left", v: "origin-bottom", delay: 1.06 },
        { pos: "-bottom-px -right-px", h: "origin-right", v: "origin-bottom", delay: 1.14 },
    ];

    return (
        <div
            className={`relative w-full min-h-screen text-black overflow-hidden select-none transition-opacity duration-700 ease-out ${
                mounted ? "opacity-100" : "opacity-0"
            }`}
            style={{
                background:
                    "radial-gradient(120% 90% at 85% -10%, rgba(155,58,53,0.10) 0%, transparent 55%), radial-gradient(90% 70% at 5% 110%, rgba(155,58,53,0.06) 0%, transparent 55%), linear-gradient(160deg, #FDFBF6 0%, #F6F2E9 45%, #EFEAE0 100%)",
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,600;1,9..144,440&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap');

        .fd-display { font-family: 'Fraunces', serif; }
        .fd-mono { font-family: 'JetBrains Mono', monospace; }
        .fd-body { font-family: 'Inter', sans-serif; }

        .fd-cross {
          background-image:
            linear-gradient(to right, rgba(27,26,24,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(27,26,24,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .fd-name-gradient {
          background: linear-gradient(100deg, #9B3A35 0%, #B44A43 45%, #C46158 65%, #9B3A35 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
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
        .fd-corner-h { animation: fdCornerH 0.5s cubic-bezier(.19,1,.22,1) both; }
        .fd-corner-v { animation: fdCornerV 0.5s cubic-bezier(.19,1,.22,1) both; }

        .fd-fade { transition: opacity 0.38s ease, transform 0.38s ease; }
        .fd-fade-hidden { opacity: 0; transform: translateY(10px); }
        .fd-fade-visible { opacity: 1; transform: translateY(0); }

        .fd-link { position: relative; outline-offset: 4px; }
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
        .fd-link:hover::after, .fd-link:focus-visible::after { transform: scaleX(1); transform-origin: left; }
        .fd-link:focus-visible { outline: 1px solid rgba(155,58,53,0.65); border-radius: 1px; }

        .fd-cta-primary {
          position: relative;
          color: #F8F5EE;
          background: #9B3A35;
          transition: filter 0.35s ease, transform 0.35s ease;
        }
        .fd-cta-primary:hover { filter: brightness(1.15); transform: translateY(-1px); }

        .fd-portrait {
          box-shadow: 0 0 0 1px rgba(155,58,53,0.15), 0 30px 60px -25px rgba(60,50,40,0.25);
        }
        .fd-portrait img {
          filter: grayscale(1) contrast(1.03) brightness(1.02);
          transform: scale(1.02);
          transition: filter 0.6s ease, transform 0.6s ease;
        }
        .fd-portrait:hover img {
          filter: grayscale(0.15) contrast(1.01) brightness(1.03);
          transform: scale(1.06);
        }

        @media (prefers-reduced-motion: reduce) {
          .fd-in, .fd-corner-h, .fd-corner-v, .fd-cursor { animation: none !important; }
          .fd-fade, .fd-portrait img, .fd-cta-primary { transition: none !important; }
        }
      `}</style>

            {/* top strip */}
            <div
                className="fd-mono fd-in flex items-center justify-between px-6 md:px-12 py-5 border-b border-ink/10 text-[11px] tracking-[0.25em] uppercase text-ink-soft"
                style={{ animationDelay: "0.05s" }}
            >
                <span>Nischal Ruchal</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] min-h-[calc(100vh-64px-64px)]">
                <div className="flex flex-col justify-center px-6 md:px-12 py-16 lg:py-0 border-r border-ink/10">
                    <div
                        className="fd-in fd-display italic text-2xl md:text-3xl text-accent h-10 overflow-hidden"
                        style={{ animationDelay: "0.15s" }}
                    >
                        <div className={`fd-fade ${greetVisible ? "fd-fade-visible" : "fd-fade-hidden"}`}>
                            {greetings[greetIndex]},
                        </div>
                    </div>
                    <h1
                        className="fd-in fd-display font-semibold leading-[0.95] mt-2"
                        style={{ fontSize: "clamp(2.6rem, 6.4vw, 5.6rem)", animationDelay: "0.28s" }}
                    >
                        I&rsquo;m Nischal
                        <br />
                        <span className="fd-name-gradient">Ruchal.</span>
                    </h1>
                    <div
                        className="fd-in fd-mono mt-7 flex items-center gap-3 text-base md:text-lg text-ink h-8 overflow-hidden"
                    >
                        <span className="text-accent">&gt;</span>
                        <span className={`fd-fade text-accent ${skillVisible ? "fd-fade-visible" : "fd-fade-hidden"}`}>
                            {skills[skillIndex]}
                        </span>
                        <span className="fd-cursor text-accent">_</span>
                    </div>
                    <p
                        className="fd-in fd-body mt-8 max-w-md text-ink-soft leading-relaxed text-[15px] md:text-base text-black"
                        style={{ animationDelay: "0.55s" }}
                    >
                        I build interfaces end to end — from layout and interaction
                        design down to the systems that serve them. Clean code,
                        considered detail, nothing left unfinished.
                    </p>
                    <div
                        className="fd-in fd-mono mt-10 flex items-center gap-4 text-[13px] tracking-[0.12em] uppercase"
                        style={{ animationDelay: "0.68s" }}
                    >
                        <a href="/projects"
                            className="fd-cta-primary px-5 py-2.5 rounded-full font-medium">
                            View Work
                        </a>
                        <a href="/contact" className="fd-link text-ink-soft hover:text-black">
                            Say Hello ↗
                        </a>
                    </div>
                </div>

                {/* RIGHT — image slot */}
                <div className="relative flex items-center justify-center p-8 md:p-14 min-h-105 lg:min-h-0 fd-cross">
                    <div
                        className="fd-portrait fd-in relative w-full max-w-85 aspect-3/4 border border-ink/10 bg-ink/[0.02] overflow-hidden rounded-sm"
                        style={{ animationDelay: "0.35s" }}
                    >
                        <img
                            src={img.mainImg}
                            alt="Nischal Ruchal"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {corners.map((c, i) => (
                            <span key={i}>
                                <span
                                    className={`fd-corner-h absolute ${c.pos} w-8 h-[2px] bg-accent ${c.h}`}
                                    style={{ animationDelay: `${c.delay}s` }}
                                />
                                <span
                                    className={`fd-corner-v absolute ${c.pos} w-[2px] h-8 bg-accent ${c.v}`}
                                    style={{ animationDelay: `${c.delay + 0.04}s` }}
                                />
                            </span>
                        ))}
                    </div>

                    <span className="fd-mono absolute bottom-4 right-8 md:right-14 text-[10px] tracking-[0.25em] text-ink-soft/60">
                        IMG — 3:4
                    </span>
                </div>
            </div>
            <div
                className="fd-mono fd-in flex items-center justify-between px-6 md:px-12 py-5 border-t border-ink/10 text-[11px] tracking-[0.25em] uppercase text-ink-soft/70"
                style={{ animationDelay: "0.8s" }}
            >
            </div>
        </div>
    );
}
