/**
 * The "registration mark" bracket frame used around Home's portrait,
 * extracted so it can wrap any image on any page without repeating
 * four span elements + animation delays every time.
 */
export default function CornerFrame({ src, alt, dark = false, className = "" }) {
  const accent = "bg-accent";
  const corners = [
    { pos: "-top-px -left-px", h: "origin-left", v: "origin-top", delay: 0.1 },
    { pos: "-top-px -right-px", h: "origin-right", v: "origin-top", delay: 0.18 },
    { pos: "-bottom-px -left-px", h: "origin-left", v: "origin-bottom", delay: 0.26 },
    { pos: "-bottom-px -right-px", h: "origin-right", v: "origin-bottom", delay: 0.34 },
  ];

  return (
    <div
      className={`relative aspect-3/4 overflow-hidden border border-ink/12 bg-ink/[0.02] ${className}`}
    >
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover scale-175" />
      {corners.map((c, i) => (
        <span key={i}>
          <span
            className={`fd-corner-h absolute ${c.pos} w-8 h-[2px] ${accent} ${c.h}`}
            style={{ animationDelay: `${c.delay}s` }}
          />
          <span
            className={`fd-corner-v absolute ${c.pos} w-[2px] h-8 ${accent} ${c.v}`}
            style={{ animationDelay: `${c.delay + 0.04}s` }}
          />
        </span>
      ))}
    </div>
  );
}
