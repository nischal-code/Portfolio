import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal hook used across About / Projects / Experience / Contact.
 * Attach `ref` to an element; `visible` flips true once it enters the
 * viewport (fires once, then disconnects — no repeated re-triggering
 * on scroll up/down).
 */
export default function useReveal({ threshold = 0.2, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}
