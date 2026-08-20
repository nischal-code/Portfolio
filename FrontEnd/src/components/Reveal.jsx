import useReveal from "../hooks/useReveal";

/**
 * Fade + rise scroll reveal. Wrap any block of content:
 *   <Reveal delay={80}><h2>Title</h2></Reveal>
 * Keeps the "text/cards ease into place while scrolling" behaviour
 * consistent everywhere instead of re-implementing it per page.
 */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const { ref, visible } = useReveal();
  return (
    <Tag
      ref={ref}
      className={`fd-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
