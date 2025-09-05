// src/components/About.jsx
import React from "react";

/**
 * About section
 * - Responsive two-column layout
 * - Skills grid and short timeline / experience
 * - CTA to download resume / contact
 *
 * Customize `skills` and `experience` arrays below.
 */

const skills = [
  { name: "React", level: "Advanced" },
  { name: "Tailwind CSS", level: "Advanced" },
  { name: "JavaScript (ES6+)", level: "Advanced" },
  { name: "TypeScript", level: "Intermediate" },
  { name: "HTML & CSS", level: "Advanced" },
  { name: "Node.js", level: "Intermediate" },
  { name: "Flutter", level: "Intermediate" },
  { name: "Git / CI", level: "Intermediate" },
];

const experience = [
  {
    year: "2024",
    title: "Frontend Developer Intern",
    org: "Company A",
    desc: "Worked on component library and performance improvements using React and Tailwind.",
  },
  {
    year: "2023",
    title: "Product UI",
    org: "Project X",
    desc: "Built and shipped interaction patterns and small design system tokens.",
  },
  {
    year: "2022",
    title: "Mobile Explorations",
    org: "Personal",
    desc: "Prototyped mobile apps using Flutter focusing on UX & performance.",
  },
];

function SkillPill({ name }) {
  return (
    <li className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900/40 text-zinc-100 text-sm">
      {name}
    </li>
  );
}

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left column: intro */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">About me</h2>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
              I’m a frontend developer focused on building fast, accessible, and
              delightful experiences on the web. I enjoy working on practical
              projects, improving performance, and turning design ideas into
              reusable components.
            </p>

            <p className="text-zinc-300 text-base leading-relaxed mb-6 max-w-xl">
              I love learning new approaches to UI and UX — recently exploring
              animation, accessibility, and better developer ergonomics.
            </p>

            <div className="flex flex-wrap gap-3 mb-6" aria-hidden>
              {skills.slice(0, 6).map((s) => (
                <SkillPill key={s.name} name={s.name} />
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href="/resume.pdf"
                className="inline-flex items-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
                aria-label="Download resume (PDF)"
              >
                Download Resume
              </a>

              <a
                href="#contact"
                className="inline-flex items-center rounded-2xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-900/40 transition"
                aria-label="Contact me"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right column: skills + timeline */}
          <div className="order-1 md:order-2">
            <div className="bg-zinc-900/30 rounded-2xl p-6">
              <h3 className="text-zinc-200 font-semibold mb-4">Core skills</h3>
              <ul className="grid grid-cols-2 gap-3 mb-6">
                {skills.map((s) => (
                  <li key={s.name} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                    <div>
                      <div className="text-zinc-100 font-medium">{s.name}</div>
                      <div className="text-zinc-400 text-xs">{s.level}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <h3 className="text-zinc-200 font-semibold mb-4">Recent experience</h3>
              <ol className="space-y-4">
                {experience.map((e) => (
                  <li key={e.year} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-md bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-semibold">
                        {e.year}
                      </div>
                    </div>
                    <div>
                      <div className="text-zinc-100 font-medium">{e.title} — <span className="text-zinc-400 font-normal">{e.org}</span></div>
                      <div className="text-zinc-400 text-sm leading-relaxed">{e.desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* full skills grid (optional extended list) */}
        <div className="mt-12">
          <h4 className="text-zinc-200 font-semibold mb-4">Other tools & tech</h4>
          <ul className="flex flex-wrap gap-3">
            {skills.concat([
              { name: "Vite" },
              { name: "ESLint" },
              { name: "Prettier" },
              { name: "PostCSS" },
            ]).map((s, idx) => (
              <li key={`${s.name}-${idx}`} className="text-sm bg-zinc-900/30 px-3 py-2 rounded-md text-zinc-200">
                {s.name || s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
