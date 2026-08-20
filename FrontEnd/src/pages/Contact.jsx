import { useState } from "react";
import { HiOutlineEnvelope, HiOutlineMapPin, HiArrowUpRight } from "react-icons/hi2";
import Reveal from "../components/Reveal";
import PageHeader from "../components/PageHeader";
import Form from "../components/Form";

// TODO: replace with your real contact details and links.
const contactInfo = [
  { label: "Email", value: "nischalruchal90@gmail.com", href: "mailto:nischalruchal90@gmail.com", icon: HiOutlineEnvelope },
  { label: "Location", value: "Based in Pokhara — Remote friendly", href: null, icon: HiOutlineMapPin },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/nischal-code" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/nischal-ruchal-a12957351/" },
  { name: "Twitter / X", href: "https://x.com/NischalRuchal" },
];

export default function Contact() {

  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s build
            <br />
            something <span className="italic">together</span>.
          </>
        }
        intro="Have a project, a role, or just an idea worth talking through? I'd like to hear it."
      />

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16">
        {/* Contact info */}
        <Reveal>
          <span className="fd-mono fd-eyebrow text-ink-soft/70">Get In Touch</span>
          <ul className="mt-6 space-y-6">
            {contactInfo.map(({ label, value, href, icon: Icon }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="mt-0.5 text-accent">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="fd-mono text-[11px] tracking-[0.18em] uppercase text-ink-soft/70">
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="fd-link fd-body text-ink/85 text-[15px]">
                      {value}
                    </a>
                  ) : (
                    <p className="fd-body text-ink/85 text-[15px]">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <p className="fd-mono fd-eyebrow text-ink-soft/70 mt-10">Elsewhere</p>
          <ul className="mt-4 space-y-3">
            {socialLinks.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="fd-link fd-body text-sm text-ink-soft hover:text-ink inline-flex items-center gap-1.5"
                >
                  {s.name} <HiArrowUpRight className="text-xs" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Form */}
        <Reveal delay={100}>
          <Form />
        </Reveal>
      </section>
    </div>
  );
}
