// src/components/Projects.jsx
import React, { useState } from "react";
import projects from "../data/projects";

function Tag({ children }) {
  return (
    <span className="inline-block text-xs px-2 py-1 rounded bg-zinc-800/50 text-zinc-200 mr-2">
      {children}
    </span>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);

  return (
    <section id="projects" className="py-20 md:py-28 bg-transparent relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-6">
          Projects
        </h2>
        <p className="text-zinc-400 mb-8 max-w-2xl">
          A few things I've built recently — click any card to view more details.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.id}
              className="group bg-zinc-900/40 rounded-2xl p-5 hover:shadow-xl transition cursor-pointer"
              onClick={() => setOpen(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setOpen(p)}
            >
              <div className="h-40 w-full rounded-md overflow-hidden bg-zinc-800/30 mb-4">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-500">
                    No image
                  </div>
                )}
              </div>

              <h3 className="text-xl font-semibold text-zinc-100 mb-2">{p.title}</h3>
              <p className="text-zinc-400 text-sm mb-3">{p.short}</p>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  {p.tags.slice(0, 3).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={p.demo}
                    className="text-xs px-3 py-1 border border-zinc-700 rounded-md text-zinc-200 hover:bg-zinc-800"
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live
                  </a>
                  <a
                    href={p.repo}
                    className="text-xs px-3 py-1 border border-zinc-700 rounded-md text-zinc-200 hover:bg-zinc-800"
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          />
          <div className="relative max-w-3xl w-full bg-zinc-900 rounded-2xl p-6 z-10 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-36 h-24 rounded-md overflow-hidden bg-zinc-800/30 flex-shrink-0">
                {open.image && (
                  <img src={open.image} alt={open.title} className="w-full h-full object-cover" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-zinc-100 mb-2">{open.title}</h3>
                <p className="text-zinc-300 mb-3">{open.description}</p>
                <div className="mb-4">
                  {open.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a href={open.demo} className="px-4 py-2 rounded-md bg-indigo-600 text-white" target="_blank" rel="noreferrer">View demo</a>
                  <a href={open.repo} className="px-4 py-2 rounded-md border border-zinc-700 text-zinc-100" target="_blank" rel="noreferrer">View code</a>
                  <button className="ml-auto text-sm text-zinc-400" onClick={() => setOpen(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
