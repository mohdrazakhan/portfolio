import React from "react";

const skills = [
  { name: "Python", level: "Basic", pct: 40 },
  { name: "JAVA", level: "Advanced", pct: 90 },
  { name: "IOT devices", level: "Advanced", pct: 88 },
  { name: "DSA", level: "Intermediate", pct: 65 },
  { name: "HTML & CSS", level: "Advanced", pct: 85 },
  { name: "Node.js", level: "Intermediate", pct: 60 },
  { name: "Flutter", level: "Intermediate", pct: 55 },
  { name: "Git / CI", level: "Intermediate", pct: 70 },
  { name: "C", level: "Intermediate", pct: 60 },
  { name: "JavaScript", level: "Intermediate", pct: 62 },
];

const experience = [
  {
    year: "2025",
    title: "Graphic Designer",
    org: "Kiya Learning",
    desc: "Designed promotional graphics for educational content and collaborated with educators and marketing teams to improve visual communication.",
  },
  {
    year: "2023",
    title: "IT Intern",
    org: "S.H. Solutions",
    desc: "Built and optimized 10+ e-commerce pages, improved site speed by ~35% and implemented SEO improvements to drive organic traffic.",
  },
];

function ProgressBar({ pct = 0 }) {
  return (
    <div className="w-full h-2 rounded-full bg-zinc-200/30 dark:bg-zinc-700/40 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
        style={{ width: `${Math.max(6, Math.min(100, pct))}%` }}
      />
    </div>
  );
}

function RecentExperience({ items }) {
  return (
    <div className="relative">
      {/* vertical line for md+ screens */}
      <div
        className="hidden md:block absolute left-20 top-6 bottom-6 w-px bg-zinc-200/40 dark:bg-zinc-800/40"
        aria-hidden
      />
      <div className="space-y-8">
        {items.map((e, idx) => (
          <div
            key={e.year + idx}
            className="grid grid-cols-1 md:grid-cols-[88px_1fr] gap-4 items-start"
          >
            {/* Year badge */}
            <div className="flex md:justify-center md:items-start">
              <div className="md:relative md:left-0">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-md bg-gradient-to-br from-indigo-600 to-violet-500 text-white font-semibold text-base md:text-lg">
                  {e.year}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-1 md:pt-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h5 className="text-zinc-900 dark:text-zinc-100 font-semibold text-base">
                  {e.title}
                </h5>
                <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                  — {e.org}
                </span>
              </div>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {e.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-10 md:mb-14 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            About me
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-2xl">
            Final-year B.Tech (CSE) student at Sharda University. I build full-stack web apps, mobile apps with Flutter,
            and IoT solutions that connect hardware to real-time dashboards. I like clean UI, fast performance and pragmatic
            engineering.
          </p>
        </div>

        {/* Grid: re-ordered for mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Intro */}
          <div className="lg:col-span-6 order-1">
            <div className="bg-white/6 dark:bg-zinc-900/40 rounded-2xl p-6 md:p-8 shadow-sm border border-transparent dark:border-zinc-800/50">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                Hi — I’m Mohd Raza Khan
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                I’m passionate about building products that solve real problems — from responsive web apps to
                connected IoT devices. I focus on fast frontend experiences, robust backend APIs and well-documented
                code.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Key strengths: full-stack development, embedded systems (ESP32), Flutter mobile apps, performance & SEO.
              </p>

              <div className="flex gap-3 flex-wrap">
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium shadow"
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Experience + Skills */}
          <div className="lg:col-span-6 space-y-6">
            {/* Experience first on mobile */}
            <div className="order-2 lg:order-1 bg-white/6 dark:bg-zinc-900/40 rounded-2xl p-6 md:p-8 border dark:border-zinc-800/50 shadow-sm">
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Recent experience
              </h4>
              <RecentExperience items={experience} />
            </div>

            {/* Skills below experience on mobile */}
            <div className="order-3 lg:order-2 bg-white/6 dark:bg-zinc-900/40 rounded-2xl p-6 md:p-8 border dark:border-zinc-800/50 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Technical skills
                </h4>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">
                  Primary & relevant
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {skills.map((s) => (
                  <li key={s.name} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500" />
                        <div>
                          <div className="text-zinc-900 dark:text-zinc-100 font-medium">
                            {s.name}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            {s.level}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {s.pct}%
                      </div>
                    </div>
                    <ProgressBar pct={s.pct} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Other tools */}
        <div className="mt-10">
          <h4 className="text-zinc-900 dark:text-zinc-100 font-semibold mb-4">
            Other tools & tech
          </h4>
          <ul className="flex flex-wrap gap-3">
            {[
              ...skills.map((s) => s.name),
              "Vite",
              "ESLint",
              "Prettier",
              "PostCSS",
              "Firebase",
              "MySQL",
              "MongoDB",
            ].map((tech, i) => (
              <li
                key={tech + "-" + i}
                className="px-3 py-1 rounded-md bg-zinc-100/10 text-zinc-900 dark:bg-zinc-800/60 dark:text-zinc-100 text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}