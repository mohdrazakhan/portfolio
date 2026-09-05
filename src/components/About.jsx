import React from "react";
import { Link } from "react-router-dom";
import Skills3D from "./3d/Skills3D";

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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 text-white font-semibold text-base md:text-lg shadow-lg shadow-indigo-500/20">
                  {e.year}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-1 md:pt-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h5 className="text-zinc-900 dark:text-zinc-100 font-bold text-base">
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
    <div className="w-full">
      <section id="about" className="py-16 md:py-24 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="mb-10 md:mb-14 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              About Mohd Raza Khan
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl text-base sm:text-lg">
              Final-year B.Tech (CSE) student at Sharda University. I build full-stack web apps, mobile apps with Flutter,
              and IoT solutions that connect hardware to real-time dashboards.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT: Intro */}
            <div className="lg:col-span-6 order-1">
              <div className="bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-zinc-200/80 dark:border-zinc-800/80">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                  Engineering from Hardware to Cloud
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 text-base">
                  I’m passionate about building products that solve real problems — from responsive web apps to
                  connected IoT devices. I focus on fast frontend experiences, robust backend APIs and well-documented
                  code.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm">
                  Key strengths: full-stack web development, embedded systems (ESP32), Flutter mobile apps, sensor telemetry, and performance optimization.
                </p>

                <div className="flex gap-3 flex-wrap">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all"
                  >
                    Download Resume
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-all"
                  >
                    Contact Me
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT: Experience */}
            <div className="lg:col-span-6 space-y-6 order-2">
              <div className="bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl">
                <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                  Experience & Roles
                </h4>
                <RecentExperience items={experience} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D SKILLS MATRIX */}
      <Skills3D />
    </div>
  );
}