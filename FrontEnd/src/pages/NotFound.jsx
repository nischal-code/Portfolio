import { useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[80vh] bg-bg text-ink overflow-hidden fd-cross flex items-center">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-24 text-center">
        <Reveal>
          <span className="fd-mono fd-eyebrow text-accent">404</span>
        </Reveal>
        <Reveal delay={80}>
          <h1
            className="fd-display font-semibold leading-[0.95] mt-4"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.6rem)" }}
          >
            Page not found.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="fd-body mt-6 max-w-md mx-auto text-ink-soft leading-relaxed text-[15px] md:text-base">
            The page you're looking for doesn't exist, or it's moved somewhere else.
          </p>
        </Reveal>
        <Reveal delay={240} className="mt-9 flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="fd-btn-primary px-5 py-2.5 rounded-full fd-mono text-[12px] tracking-[0.12em] uppercase font-medium cursor-pointer"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="fd-btn-ghost px-5 py-2.5 rounded-full fd-mono text-[12px] tracking-[0.12em] uppercase border cursor-pointer"
          >
            Contact Me
          </button>
        </Reveal>
      </div>
    </section>
  );
}
