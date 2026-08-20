import useCircleReveal from "../hooks/useCircleReveal";

/**
 * Two stacked layers inside one container. `top` is clipped open
 * around the cursor; `bottom` sits underneath and is always fully
 * live — real buttons and links, clickable straight through the hole.
 */
export default function RevealPanel({
  radius = 1000,
  top,
  bottom,
  className = "",
  forceOpen = false,
  showRing = true,
}) {
  const { ref, pos, handlers, clipPath } = useCircleReveal();
  // console.log(pos)
  return (
    <div
      ref={ref}
      className={`reveal-container ${!forceOpen ? "interactive" : ""} ${className}`}
      {...handlers}
    >
      <div className="reveal-layer z-10">
        {bottom}
      </div>
      <div
        className="reveal-layer z-20"
        style={{ clipPath: forceOpen ? "none" : clipPath }}
      >
        {top}
      </div>
      {showRing && !forceOpen && (
        <div
          className="reveal-ring"
          style={{ left: pos.x, top: pos.y, width: radius * 2, height: radius * 2 }}
        />
      )}
    </div>
  );
}
