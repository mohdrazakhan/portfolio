import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

export default function ProjectCard3D({ project, onClick }) {
  const cardRef = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((y - centerY) / centerY) * 12;
    const rY = ((x - centerX) / centerX) * 12;

    setRotX(rX);
    setRotY(rY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick && onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick && onClick(project)}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotX,
        rotateY: rotY,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 0.6,
      }}
      className="group relative cursor-pointer rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-shadow duration-300 overflow-hidden flex flex-col justify-between"
    >
      {/* Dynamic Interactive Glare */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 240px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4), transparent 70%)`,
          opacity: glare.opacity,
        }}
      />

      {/* 3D Depth Content */}
      <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
        {/* Project Image Box with 3D Float */}
        <div
          className="relative h-48 w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800/60 mb-5 shadow-inner"
          style={{ transform: "translateZ(20px)" }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400 font-mono text-xs">
              Preview Available in Case Study
            </div>
          )}

          {/* Quick Click Indicator */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.short || project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {(project.tags || []).slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Action Links */}
      <div
        className="flex items-center justify-between pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60"
        style={{ transform: "translateZ(30px)" }}
      >
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          View Case Study →
        </span>

        <div className="flex items-center gap-2">
          {project.demo && project.demo !== "#" && (
            <a
              href={project.demo}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-600 hover:text-white text-zinc-700 dark:text-zinc-300 transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.repo && project.repo !== "#" && (
            <a
              href={project.repo}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-600 hover:text-white text-zinc-700 dark:text-zinc-300 transition-colors"
              title="Source Code"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
