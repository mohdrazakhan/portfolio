import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, skillsList } from "../../data/skills";
import {
  Cpu,
  Layers,
  Code2,
  Smartphone,
  Server,
  Cloud,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

// Interactive 3D Physics Tilt Card
function SkillCard3D({ skill, index, isSelected, onSelect }) {
  const cardRef = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((y - centerY) / centerY) * 14;
    const rY = ((x - centerX) / centerX) * 14;

    setRotX(rX);
    setRotY(rY);
    setSheenPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(skill)}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: rotX,
        rotateY: rotY,
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
      className={`relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 overflow-hidden ${
        isSelected
          ? "border-indigo-500 bg-indigo-950/30 dark:bg-indigo-950/50 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500/40"
          : "border-zinc-200/80 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
      } backdrop-blur-md`}
    >
      {/* Dynamic Mouse Sheen Glare */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${sheenPos.x}% ${sheenPos.y}%, rgba(255, 255, 255, 0.25), transparent 70%)`,
          }}
        />
      )}

      {/* 3D Depth Layer */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-3.5 h-3.5 rounded-full shadow-sm"
              style={{
                backgroundColor: skill.color || "#6366F1",
                boxShadow: `0 0 10px ${skill.color}80`,
              }}
            />
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base tracking-tight">
              {skill.name}
            </h4>
          </div>

          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
              skill.level === "Advanced"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
            }`}
          >
            {skill.level}
          </span>
        </div>

        {/* Badge & Category */}
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-3 font-medium">
          <span>{skill.badge}</span>
          <span className="font-mono font-semibold text-zinc-700 dark:text-zinc-300">
            {skill.pct}%
          </span>
        </div>

        {/* 3D Visual Progress Track */}
        <div className="w-full h-2 rounded-full bg-zinc-200/80 dark:bg-zinc-800/90 overflow-hidden mb-3 p-[1px]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${skill.pct}%` }}
            transition={{ duration: 1, delay: index * 0.04 }}
            style={{
              boxShadow: "0 0 8px rgba(99, 102, 241, 0.5)",
            }}
          />
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {skill.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Skills3D() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState(skillsList[0]);

  const filteredSkills =
    activeCategory === "all"
      ? skillsList
      : skillsList.filter((s) => s.category === activeCategory);

  const getCategoryIcon = (id) => {
    switch (id) {
      case "web":
        return <Code2 className="w-4 h-4" />;
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "iot":
        return <Cpu className="w-4 h-4" />;
      case "core":
        return <Server className="w-4 h-4" />;
      case "tools":
        return <Cloud className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills-3d" className="py-20 md:py-28 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center md:text-left mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Skill Matrix</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Technical Arsenal & Abilities
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            Bridging software engineering, modern web architectures, Flutter mobile apps, and low-level IoT microcontrollers into unified digital systems.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-start gap-2 mb-10">
          {skillCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-500/30 scale-105"
                    : "bg-white/60 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-800/60"
                } backdrop-blur-md`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid Layout: 3D Skills Cards + Selected Detail HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Skills Matrix Cards */}
          <div className="lg:col-span-8">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4"
            >
              <AnimatePresence>
                {filteredSkills.map((skill, idx) => (
                  <SkillCard3D
                    key={skill.name}
                    skill={skill}
                    index={idx}
                    isSelected={selectedSkill?.name === skill.name}
                    onSelect={setSelectedSkill}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Selected Skill Holographic Detail Inspector HUD */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl relative overflow-hidden">
              {/* Background ambient glow */}
              <div
                className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-30 pointer-events-none"
                style={{ backgroundColor: selectedSkill?.color || "#6366F1" }}
              />

              <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-4 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Telemetry Inspector
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: selectedSkill?.color || "#6366F1" }}
                />
              </div>

              {selectedSkill && (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-white text-xs"
                      style={{ backgroundColor: selectedSkill.color }}
                    >
                      ✓
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                      {selectedSkill.name}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                          Mastery Level
                        </span>
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {selectedSkill.pct}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-indigo-500 to-purple-500"
                          style={{ width: `${selectedSkill.pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-100/70 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50">
                      <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 block mb-1">
                        ARCHITECTURAL ROLE
                      </span>
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {selectedSkill.badge}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 block mb-1">
                        ENGINEERING CAPABILITY
                      </span>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {selectedSkill.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>Production verified across real-world deployments</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
