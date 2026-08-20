import Reveal from "./Reveal";

/**
 * Shared hero treatment for the light interior pages. Echoes Home's
 * top strip / cross-grid / eyebrow-then-headline rhythm so each page
 * announces itself the same way before its own content takes over.
 */
export default function PageHeader({ eyebrow, title, intro, children }) {
  return (
    <header className="relative w-full bg-bg text-ink overflow-hidden fd-cross border-b border-line">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-36 pb-16 md:pt-44 md:pb-20">
        <Reveal>
          <span className="fd-mono fd-eyebrow text-accent">{eyebrow}</span>
        </Reveal>
        <Reveal delay={80}>
          <h1
            className="fd-display font-semibold leading-[0.95] mt-4"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.6rem)" }}
          >
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={160}>
            <p className="fd-body mt-6 max-w-xl text-ink-soft leading-relaxed text-[15px] md:text-base">
              {intro}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={220} className="mt-8">
            {children}
          </Reveal>
        )}
      </div>
    </header>
  );
}
