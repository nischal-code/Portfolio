import { useEffect, useRef } from "react";
import PageHeader from "../components/PageHeader";
import useReveal from "../hooks/useReveal";

// TODO: replace with your real roles, education, and certifications.
const timeline = [
  {
    kind: "Experience",
    org: "Sunya Creatives",
    role: "Full Stack Web Developer",
    date: "2025 — Present",
    location: "Remote",
    description:
      "Working as a full stack web developer.",
    points: [
      "Frontend Designs",
      "Database Management",
      "Backend Supervision",
    ],
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    kind: "Internship",
    org: "Learn Nepal",
    role: "Intern",
    date: "2023",
    location: "Remote",
    description:
      "Learned as an Intern",
    points: ["ReactJs and NodeJs", "API handling"],
    tech: ["Npm", "ReactJs","NodeJs","Postman"],
  },
  {
    kind: "Education",
    org: "Fishtail Mountain College",
    role: "BSc Hons Computer Science",
    date: "2025 — Current",
    location: "Mustang Chowk, Pokhara",
    description: "",
    points: [],
    tech: [],
  },
  // {
  //   kind: "Certification",
  //   org: "Issuing Body",
  //   role: "Certification Name",
  //   date: "2023",
  //   location: "",
  //   description: "",
  //   points: [],
  //   tech: [],
  // },
];

function TimelineItem({ item }) {
  const { ref, visible } = useReveal({ threshold: 0.35, rootMargin: "0px 0px -15% 0px" });

  return (
    <div ref={ref} className="relative pl-14 md:pl-20 pb-16 last:pb-0">
      {/* dot */}
      <span
        className={`fd-timeline-dot absolute left-2.25 md:left-4.25 top-1.5 w-3 h-3 rounded-full -translate-x-1/2 ${
          visible ? "bg-accent scale-100" : "bg-ink/20 scale-75"
        }`}
        style={{ boxShadow: visible ? "0 0 0 4px rgba(155,58,53,0.16)" : "none" }}
      />

      <div
        className={`fd-reveal ${visible ? "is-visible" : ""}`}
        style={{ transitionDelay: visible ? "60ms" : "0ms" }}
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="fd-mono fd-eyebrow text-accent">{item.kind}</span>
          <span className="fd-mono text-[11px] text-ink-soft/70">{item.date}</span>
          {item.location && (
            <span className="fd-mono text-[11px] text-ink-mute">· {item.location}</span>
          )}
        </div>
        <h3 className="fd-display text-xl md:text-2xl font-semibold mt-2">{item.role}</h3>
        <p className="fd-body text-ink-soft text-sm mt-0.5">{item.org}</p>

        {item.description && (
          <p className="fd-body text-ink-soft text-sm md:text-[15px] leading-relaxed mt-4 max-w-xl">
            {item.description}
          </p>
        )}

        {item.points.length > 0 && (
          <ul className="mt-4 space-y-2">
            {item.points.map((p) => (
              <li key={p} className="fd-body text-ink-soft text-sm flex gap-2">
                <span className="text-accent mt-0.5">—</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}

        {item.tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.tech.map((t) => (
              <span key={t} className="fd-tag inline-block rounded-full px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  // Scroll-driven fill: scales the accent line from 0 to 1 as the
  // timeline track passes through the viewport.
  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current;
      const fill = fillRef.current;
      if (!track || !fill) return;

      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.5;
      const passed = vh * 0.85 - rect.top;
      const progress = Math.min(1, Math.max(0, passed / total));

      fill.style.transform = `scaleY(${progress})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Experience"
        title="Where I've been."
        intro="Roles, education, and milestones — placeholder entries below, ready to be replaced with your real history."
      />

      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div ref={trackRef} className="relative">
          {/* track + fill */}
          <div className="fd-timeline-line absolute left-2.25 md:left-4.25 top-1.5 bottom-0 w-px" />
          <div
            ref={fillRef}
            className="fd-timeline-fill absolute left-2.25 md:left-4.25 top-1.5 bottom-0 w-px"
            style={{ transform: "scaleY(0)" }}
          />

          {timeline.map((item) => (
            <TimelineItem key={`${item.org}-${item.role}`} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
