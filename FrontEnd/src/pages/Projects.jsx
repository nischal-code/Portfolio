import { useState } from "react";
import Reveal from "../components/Reveal";
import PageHeader from "../components/PageHeader";
import { img } from "../assets/assets";

const projects = [
  {
    name: "Sunya Office Management System",
    type: "Management System",
    year: "2026",
    description:
      "It's an office management system that keeps tracks of tasks, Attendence, Activity of the Sunya office and represent the productivity of the company.",
    tech: ["Reactjs","Tailwind" ,"Node.js", "MongoDB"],
    image: img.HRS,
    featured: true,
  },
  {
    name: "Sunya Product Showcase",
    type: "Design System",
    year: "2024",
    description:
      "A website that relays the info about the Sunya company.",
    tech: ["Figma", "React", "Tailwind","NodeJs","MongoDB"],
    image: img.Sunya,
    featured: false,
  },
  {
    name: "HuckUp",
    type: "Web App",
    year: "2025",
    description:
      "A web application designed to help people discover, communicate, collaborate, and build meaningful connections based on shared interests.",
    tech: ["Node.js", "Express", "Redis"],
    image: img.social,
    featured: false,
  },
  {
    name: "Ghumtey",
    type: "Web App",
    year: "2025",
    description:
      "A web application sketched to help the function of a restaurant named ghumtey by keeping track of order and inventory.",
    tech: ["Node.js", "Express", "Redis"],
    image: img.ghumtey,
    featured: false,
  },
  {
    name: "Spotify Clone",
    type: "Web App",
    year: "2024",
    description:
      "A web application that allows users to discover, stream, organize, and enjoy music with personalized playlists and recommendations.",
    tech: ["Html","css","javascript"],
    image: img.spotify,
    featured: false,
  },
];

function ProjectRow({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const reversed = index % 2 === 1;

  return (
    <Reveal
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 md:py-20 border-b border-line ${
        reversed ? "lg:[direction:rtl]" : ""
      }`}
    >
      <div
        className="relative aspect-4/2 overflow-hidden bg-surface border border-line [direction:ltr] group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
  src={project.image}
  alt={project.name}
  className={`absolute inset-0 w-full h-full object-contain ${
    hovered ? "scale-105" : "scale-100"
  } transition-transform duration-700 ease-out`}
/>
        <div
          className={`absolute inset-0 bg-bg/0 transition-colors duration-500 ${
            hovered ? "bg-bg/40" : ""
          }`}
        />
        {/* <span
          className={`fd-mono absolute bottom-4 right-4 text-[11px] tracking-[0.15em] uppercase text-ink bg-bg/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-400 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          View Project <HiArrowUpRight />
        </span> */}
      </div>

      <div className="[direction:ltr]">
        <span className="fd-mono fd-eyebrow text-ink-soft/70">
          {project.type} — {project.year}
        </span>
        <h3
          className="fd-display font-semibold mt-3 leading-tight"
          style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)" }}
        >
          {project.name}
        </h3>
        <p className="fd-body text-ink-soft mt-4 leading-relaxed max-w-md">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tech.map((t) => (
            <span key={t} className="fd-tag inline-block rounded-full px-3 py-1.5">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-6 mt-7 fd-mono text-[12px] tracking-[0.12em] uppercase">
          {/* <a
            href={project.liveUrl}
            className="fd-link flex items-center gap-1.5 text-accent"
          >
            Live Demo <HiArrowUpRight className="text-sm" />
          </a>
          <a
            href={project.sourceUrl}
            className="fd-link flex items-center gap-1.5 text-ink-soft hover:text-ink"
          >
            Source <HiOutlineCodeBracket className="text-sm" />
          </a> */}
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <div>
      <PageHeader
        eyebrow="Selected Work"
        title="Things I've built."
        intro="A mix of client work, side projects, and things I built to learn something new. Each one below is placeholder content — swap in your own projects, images, and links."
      />

      <section className="max-w-6xl mx-auto px-6 md:px-12">
        {projects.map((p, i) => (
          <ProjectRow key={p.name} project={p} index={i} />
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
        <Reveal>
          <p className="fd-body text-ink-mute text-sm">
            Have Some Curiosity.
          </p>
          <button
            onClick={() => window.open("/resume.pdf", "_blank")}
            className="mt-8 text-[12px] tracking-[0.12em] uppercase border border-ink/25 rounded-full px-5 py-2.5 text-ink/80 hover:text-accent hover:border-accent/50 transition-colors duration-200 hover:cursor-pointer"
          >
            check My Resume
          </button>
        </Reveal>
      </section>
    </div>
  );
}
