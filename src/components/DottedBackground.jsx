// src/components/DottedBackground.jsx
import React, { useRef, useEffect } from "react";

/**
 * DottedBackground
 * - canvas-based dots grid
 * - gentle parallax following mouse
 * - lightweight and performant (requestAnimationFrame + draw simple circles)
 *
 * Props (optional):
 *   spacing: number (px between dots)
 *   dotRadius: number (px base radius)
 *   dotColor: string (rgba or hex)
 *   opacity: number (0-1) overall alpha multiplier
 */
export default function DottedBackground({
  spacing = 56,
  dotRadius = 3,
  dotColor = "99,102,241", // purple-ish (Tailwind indigo-violet)
  opacity = 0.06,
  // extra controls
  baseDarkness = 0.92, // 0..1 darkness for the base backdrop
  spotlightRadius = 440, // px radius of the mouse glow
  spotlightStrength = 0.7, // 0..1 intensity of the mouse glow
  spotlightColor = "99,102,241", // RGB for the glow tint
}) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
    targetX: 0,
    targetY: 0,
    mouseX: 0,
    mouseY: 0,
    spotX: 0,
  spotY: 0,
  isDark: false,
    dots: [],
    raf: null,
    devicePixelRatio: 1,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    s.devicePixelRatio = window.devicePixelRatio || 1;

    // set theme from <html class="dark">
    const setTheme = () => {
      s.isDark = document.documentElement.classList.contains("dark");
    };
    setTheme();

    function resize() {
      const rect = canvas.getBoundingClientRect();
      s.width = Math.max(rect.width, 0);
      s.height = Math.max(rect.height, 0);
      canvas.width = Math.round(s.width * s.devicePixelRatio);
      canvas.height = Math.round(s.height * s.devicePixelRatio);
      canvas.style.width = `${s.width}px`;
      canvas.style.height = `${s.height}px`;
      ctx.setTransform(s.devicePixelRatio, 0, 0, s.devicePixelRatio, 0, 0);

      // regenerate dots grid positions (centered offset)
      s.dots = [];
      const cols = Math.ceil(s.width / spacing) + 2;
      const rows = Math.ceil(s.height / spacing) + 2;
      const startX = -spacing;
      const startY = -spacing;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * spacing + (spacing / 2);
          const y = startY + r * spacing + (spacing / 2);
          // subtle per-dot jitter so grid doesn't feel too regular
          const jitterX = (Math.random() - 0.5) * spacing * 0.12;
          const jitterY = (Math.random() - 0.5) * spacing * 0.12;
          s.dots.push({ x: x + jitterX, y: y + jitterY, r: dotRadius + Math.random() * 1.4 });
        }
      }
    }

    function onMove(e) {
      // store raw mouse position
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;
      // client coords normalized to -1..1 for parallax of dots
      const x = (s.mouseX / Math.max(s.width, 1)) * 2 - 1;
      const y = (s.mouseY / Math.max(s.height, 1)) * 2 - 1;
      // target offset scaled (parallax)
      s.targetX = x * 18; // tweak ~18 px for movement scale
      s.targetY = y * 18;
    }

    function onTouch(e) {
      if (e.touches && e.touches[0]) onMove(e.touches[0]);
    }

    function animate() {
      // smooth lerp of offset (parallax) and spotlight position
      s.offsetX += (s.targetX - s.offsetX) * 0.12;
      s.offsetY += (s.targetY - s.offsetY) * 0.12;
      s.spotX += ((s.mouseX || s.width * 0.5) - s.spotX) * 0.18;
      s.spotY += ((s.mouseY || s.height * 0.6) - s.spotY) * 0.18;

      // clear
      ctx.clearRect(0, 0, s.width, s.height);

      if (s.isDark) {
        // DARK MODE: deep base + soft ambiance + bright spotlight
        const base = ctx.createRadialGradient(
          s.width * 0.85,
          s.height * 0.1,
          Math.max(s.width, s.height) * 0.05,
          s.width * 1.1,
          s.height * 0.2,
          Math.max(s.width, s.height) * 1.2
        );
        base.addColorStop(0, `rgba(12,12,20, ${baseDarkness})`);
        base.addColorStop(0.6, `rgba(10,9,24, ${Math.min(1, baseDarkness + 0.02)})`);
        base.addColorStop(1, `rgba(6,6,12, ${Math.min(1, baseDarkness + 0.04)})`);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = base;
        ctx.fillRect(0, 0, s.width, s.height);

        const ambiance = ctx.createRadialGradient(
          s.width * 0.5 - s.offsetX * 6,
          s.height * 0.6 - s.offsetY * 6,
          0,
          s.width * 0.5,
          s.height * 0.6,
          Math.max(s.width, s.height) * 0.9
        );
        ambiance.addColorStop(0, `rgba(${dotColor}, ${opacity * 0.9})`);
        ambiance.addColorStop(0.25, `rgba(${dotColor}, ${opacity * 0.35})`);
        ambiance.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = ambiance;
        ctx.fillRect(0, 0, s.width, s.height);

        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `rgba(${dotColor}, ${opacity})`;
        s.dots.forEach((d, i) => {
          const px = d.x + s.offsetX * (0.6 + (i % 5) * 0.02);
          const py = d.y + s.offsetY * (0.6 + (i % 7) * 0.015);
          ctx.beginPath();
          ctx.arc(px, py, d.r, 0, Math.PI * 2);
          ctx.fill();
        });

        const cx = s.spotX || s.width * 0.5;
        const cy = s.spotY || s.height * 0.6;
        const r = Math.max(220, spotlightRadius);
        const spot = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        spot.addColorStop(0, `rgba(${spotlightColor}, ${Math.min(1, spotlightStrength)})`);
        spot.addColorStop(0.35, `rgba(${spotlightColor}, ${Math.max(0, spotlightStrength * 0.35)})`);
        spot.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = spot;
        ctx.fillRect(0, 0, s.width, s.height);
      } else {
        // LIGHT MODE: light base + darker dots + dark vignette following mouse
        const base = ctx.createRadialGradient(
          s.width * 0.9,
          s.height * 0.15,
          Math.max(s.width, s.height) * 0.05,
          s.width * 1.2,
          s.height * 0.2,
          Math.max(s.width, s.height) * 1.2
        );
        base.addColorStop(0, "rgba(248,249,252, 0.98)");
        base.addColorStop(0.6, "rgba(245,246,250, 0.98)");
        base.addColorStop(1, "rgba(241,242,244, 0.98)");
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = base;
        ctx.fillRect(0, 0, s.width, s.height);

        // dots a bit darker so they show on light base
        ctx.fillStyle = `rgba(63,63,70, ${Math.min(0.22, opacity * 1.8)})`;
        s.dots.forEach((d, i) => {
          const px = d.x + s.offsetX * (0.6 + (i % 5) * 0.02);
          const py = d.y + s.offsetY * (0.6 + (i % 7) * 0.015);
          ctx.beginPath();
          ctx.arc(px, py, d.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // dark spotlight (multiply) looks better on light background
        const cx = s.spotX || s.width * 0.5;
        const cy = s.spotY || s.height * 0.6;
        const r = Math.max(280, spotlightRadius * 1.1);
        const spot = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        spot.addColorStop(0, "rgba(17,24,39, 0.22)");
        spot.addColorStop(0.45, "rgba(17,24,39, 0.12)");
        spot.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = spot;
        ctx.fillRect(0, 0, s.width, s.height);
      }

      s.raf = requestAnimationFrame(animate);
    }

  // observe theme changes on <html>
  const observer = new MutationObserver(setTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  // initial setup
    resize();
    animate();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", resize);

    // cleanup
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", resize);
    if (s.raf) cancelAnimationFrame(s.raf);
    observer.disconnect();
    };
  }, [spacing, dotRadius, dotColor, opacity, baseDarkness, spotlightRadius, spotlightStrength, spotlightColor]);

  // full-screen positioned canvas behind content
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
  className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
