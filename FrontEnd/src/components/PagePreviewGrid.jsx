import { Link } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import Reveal from "./Reveal";

/**
 * "Explore" section for Home — a 4-up grid of small page previews
 * (About / Experience / Projects / Contact), each giving a one-line
 * peek at that page's content and linking there via <Link>.
 *
 * Styled as a sibling to About's "What I Do" grid (numbered mono
 * label, fd-display title, fd-body teaser) with a CornerFrame-style
 * accent bracket that draws in on hover — CornerFrame itself expects
 * an <img>, so the bracket motif is reproduced here for text-only
 * cards instead of wrapping a forced placeholder image around it.
 */
const pages = [
  {
    index: "01",
    eyebrow: "About",
    title: "About Me",
    // Pulled loosely from the whatIDo / approach arrays in About.jsx
    teaser: "UI/UX, frontend, backend — how I work.",
    to: "/about",
  },
  {
    index: "02",
    eyebrow: "Experience",
    title: "Experience",
    // Most recent entry from the timeline array in Experience.jsx
    teaser: "Position Title @ Organization Name — 2024 — Present.",
    to: "/experience",
  },
  {
    index: "03",
    eyebrow: "Work",
    title: "Selected Work",
    // First entry in the projects array in Projects.jsx
    teaser: "Project One — Web App.",
    to: "/projects",
  },
  {
    index: "04",
    eyebrow: "Contact",
    title: "Get In Touch",
    teaser: "Got something in mind? Let's talk.",
    to: "/contact",
  },
];

function PreviewCard({ page, delay }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={page.to}
        className="group relative block h-full border border-line bg-surface p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/50 hover:bg-surface-hover"
      >
        {/* corner brackets — CornerFrame's registration-mark motif,
            reproduced for a text card and drawn in on hover */}
        <span className="pointer-events-none absolute -top-px -left-px h-8 w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100" />
        <span className="pointer-events-none absolute -top-px -left-px h-[2px] w-8 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
        <span className="pointer-events-none absolute -bottom-px -right-px h-8 w-[2px] origin-bottom scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100" />
        <span className="pointer-events-none absolute -bottom-px -right-px h-[2px] w-8 origin-right scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />

        <span className="fd-mono fd-eyebrow text-ink-mute transition-colors duration-300 group-hover:text-accent">
          {page.index} — {page.eyebrow.toUpperCase()}
        </span>

        <h3 className="fd-display text-xl md:text-2xl mt-3 text-ink">
          {page.title}
        </h3>

        <p className="fd-body text-ink-soft text-sm leading-relaxed mt-3">
          {page.teaser}
        </p>

        <span className="fd-mono mt-6 flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-ink-soft transition-all duration-300 group-hover:gap-2.5 group-hover:text-accent">
          View page <HiArrowUpRight className="text-sm" />
        </span>
      </Link>
    </Reveal>
  );
}

export default function PagePreviewGrid() {
  return (
    <section className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-16 md:py-24">
      <Reveal>
        <span className="fd-mono fd-eyebrow text-accent">Explore</span>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className="fd-display font-semibold leading-[0.95] mt-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Take a look around.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-10">
        {pages.map((page, i) => (
          <PreviewCard key={page.to} page={page} delay={160 + i * 80} />
        ))}
      </div>
    </section>
  );
}
