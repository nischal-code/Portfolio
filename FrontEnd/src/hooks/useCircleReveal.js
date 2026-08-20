import { useRef, useState, useCallback, useEffect } from "react";

const BIG = 4000; // path bound comfortably larger than any real viewport

function buildClipPath(x, y, r) {
  return (
    `path(evenodd, 'M0,0 H${BIG} V${BIG} H0 Z ` +
    `M${x - r},${y} ` +
    `a${r},${r} 0 1,0 ${r * 2},0 ` +
    `a${r},${r} 0 1,0 ${-r * 2},0 Z')`
  );
}
export default function useCircleReveal(radius = 125) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  const update = useCallback((clientX, clientY) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    
    setPos({ x: clientX - rect.left, y: clientY - rect.top });
  }, []);

  const close = useCallback(() => {
    setPos({ x: -9999, y: -9999 });
  }, []);

  const handlers = {
    onMouseMove: (e) => update(e.clientX, e.clientY),
    onMouseLeave: close,
    onTouchMove: (e) => {
      const t = e.touches[0];
      if (t) update(t.clientX, t.clientY);
    },
    onTouchEnd: close,
    onTouchCancel: close,
  };

  useEffect(() => {
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [close]);

  return { ref, pos, handlers, clipPath: buildClipPath(pos.x, pos.y, radius) };
}