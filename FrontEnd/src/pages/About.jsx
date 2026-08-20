import { useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import CornerFrame from "../components/CornerFrame";
import { img } from "../assets/assets";

// TODO: swap this narrative copy for your own — it's written generic
// on purpose so it's obvious what to personalize.
const whatIDo = [
  {
    title: "UI / UX Design",
    body: "Turning a rough idea into a layout that holds together — hierarchy, spacing, and flow before a single line of code.",
  },
  {
    title: "Frontend Development",
    body: "Building the interface itself: responsive, accessible, and animated with intent rather than for its own sake.",
  },
  {
    title: "Backend & APIs",
    body: "The systems behind the screen — data models, endpoints, and the plumbing that keeps an interface honest.",
  },
  {
    title: "Product Thinking",
    body: "Asking why a feature exists before deciding how it should look, so the final product earns its complexity.",
  },
];

const approach = [
  {
    title: "Understand",
    body: "Start with the problem, not the code.",
  },
  {
    title: "Design",
    body: "Create interfaces that are clear and purposeful.",
  },
  {
    title: "Build",
    body: "Turn ideas into fast, responsive experiences.",
  },
  {
    title: "Refine",
    body: "Test, optimize, and obsess over the details.",
  },
];

// Placeholder skill tags — replace with your actual stack.
const skills = [
  "HTML",
  "CSS",
  "JavaScript / TypeScript",
  "React",
  "Express",
  "Node.js",
  "Nextjs",
  "Tailwind CSS",
  "REST APIs",
  "PHP",
  "Git",
];
const frontEnd = [
  "HTML",
  "CSS",
  "JS/TS",
  "ReactJs",
  "NextJs",
  "Tailwind CSS"
]
const backEnd = [
  "NodeJs",
  "ExpressJs",
  "PHP",
]
const database = [
  "MongoDB",
  "SQL"
]


// Clearly-placeholder interests — replace with your own.
const languages = ["JavaScript", "Python", "PHP", "Java","C#","C"];

export default function About() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="relative w-full bg-bg text-ink overflow-hidden fd-cross border-b border-line">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20 md:pt-40 md:pb-28 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
          <div>
            <Reveal>
              <span className="fd-mono fd-eyebrow text-accent">About</span>
            </Reveal>
            <Reveal delay={80}>
              <h1
                className="fd-display font-semibold leading-[0.95] mt-4"
                style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)" }}
              >
                I build the
                <br />
                <span className="italic">whole</span> interface.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="fd-body mt-7 max-w-md text-ink-soft leading-relaxed text-[15px] md:text-base">
                I'm a developer and designer who likes working across the
                whole stack — from the first sketch of a layout to the
                system that keeps it running. I care about interfaces that
                feel considered, not just functional.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-9 flex items-center gap-4 flex-wrap">
              <button
                onClick={() => navigate("/projects")}
                className="fd-btn-primary px-5 py-2.5 rounded-full fd-mono text-[12px] tracking-[0.12em] uppercase font-medium cursor-pointer"
              >
                View Projects
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="fd-btn-ghost px-5 py-2.5 rounded-full fd-mono text-[12px] tracking-[0.12em] uppercase border cursor-pointer"
              >
                Contact Me
              </button>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative flex justify-center lg:justify-end">
            <CornerFrame src={img.about} alt="Portrait" className="w-full max-w-80" />
          </Reveal>
        </div>
      </section>

      {/* Who I Am */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[0.6fr_1fr] gap-10">
        <Reveal>
          <span className="fd-mono fd-eyebrow text-ink-soft/70">Who I Am</span>
        </Reveal>
        <Reveal delay={100}>
          <p className="fd-display text-xl md:text-2xl leading-snug text-ink/90">
            {/* TODO: replace with your own bio paragraph. */}
            As a web developer, I’m someone who blends creative design with solid engineering, equally comfortable refining a color palette, crafting smooth user experiences, and debugging complex technical problems. I enjoy building web experiences where design, performance, and functionality work seamlessly together.
          </p>
        </Reveal>
      </section>

      {/* My Journey */}
      <section className="bg-bg-soft border-y border-line">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[0.6fr_1fr] gap-10">
          <Reveal>
            <span className="fd-mono fd-eyebrow text-ink-soft/70">My Journey</span>
          </Reveal>
          <Reveal delay={100}>
            <p className="fd-body text-base md:text-lg leading-relaxed text-ink-soft max-w-2xl">
              {/* TODO: replace with your own journey / background. */}
              What started as curiosity about how websites work turned
              into a deliberate pursuit of the craft — learning to design,
              build, and ship products end to end. Every project since
              has been a chance to get a little more precise about how
              things look, feel, and hold together under the hood.
              A detailed timeline of roles and milestones lives on the{" "}
              <span
                onClick={() => navigate("/experience")}
                className="fd-link text-accent cursor-pointer"
              >
                Experience page
              </span>
              .
            </p>
          </Reveal>
        </div>
      </section>
      {/* Languages */}
      <section className="bg-bg-soft border-t border-line">
        <div className="md:text-3xl font-bold text-ink-soft/90 text-center mt-3">My Tech Skills</div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-5">
          <Reveal>
            <span className="fd-mono fd-eyebrow text-ink-soft/70">Languages</span>
          </Reveal>
          <div className="flex flex-wrap gap-3 mt-6">
            {languages.map((language, i) => (
              <Reveal key={language} delay={i * 50}>
                <span className="fd-tag inline-block rounded-full px-4 py-2">{language}</span>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-5">
          <Reveal>
            <span className="fd-mono fd-eyebrow text-ink-soft/70">Front-End</span>
          </Reveal>
          <div className="flex flex-wrap gap-3 mt-6">
            {frontEnd.map((f, i) => (
              <Reveal key={f} delay={i * 50}>
                <span className="fd-tag inline-block rounded-full px-4 py-2">{f}</span>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-5">
          <Reveal>
            <span className="fd-mono fd-eyebrow text-ink-soft/70">Back-End</span>
          </Reveal>
          <div className="flex flex-wrap gap-3 mt-6">
            {backEnd.map((b, i) => (
              <Reveal key={b} delay={i * 50}>
                <span className="fd-tag inline-block rounded-full px-4 py-2">{b}</span>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-5">
          <Reveal>
            <span className="fd-mono fd-eyebrow text-ink-soft/70">Databases</span>
          </Reveal>
          <div className="flex flex-wrap gap-3 mt-6">
            {database.map((d, i) => (
              <Reveal key={d} delay={i * 50}>
                <span className="fd-tag inline-block rounded-full px-4 py-2">{d}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* My Approach */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-18 md:py-22">
        <Reveal>
          <span className="fd-mono fd-eyebrow text-ink-soft/70">My Approach</span>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          {approach.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="border-t-2 border-accent pt-5">
                <h3 className="fd-display text-lg md:text-xl">{item.title}</h3>
                <p className="fd-body text-ink-soft text-sm leading-relaxed mt-3">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
