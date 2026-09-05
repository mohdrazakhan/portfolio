import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { default as staticProjects } from "../data/projects";
import ProjectCard3D from "./3d/ProjectCard3D";
import IoTVisualizer3D from "./3d/IoTVisualizer3D";
import { Sparkles } from "lucide-react";

function Tag({ children }) {
  return (
    <span className="inline-block text-xs px-2 py-1 rounded bg-zinc-800/50 text-zinc-200 mr-2">
      {children}
    </span>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  // Load projects from REST API
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const list = await api.getProjects();
        if (list && list.length > 0) {
          setProjects(list);
        } else {
          setProjects(staticProjects);
        }
      } catch {
        setProjects(staticProjects);
      }
    }
    loadProjects();
  }, []);

  const handleProjectClick = (project) => {
    // Navigate to detail page for main projects
    if (project.id === "optirider") {
      navigate("/projects/optirider");
    } else if (project.id === "fuel-fatality") {
      navigate("/projects/fuel-fatality");
    } else if (project.id === "roommate-manager") {
      navigate("/projects/one-room");
    } else if (project.id === "aquaminder") {
      navigate("/projects/aquaminder");
    } else {
      // Open modal for other projects
      setOpen(project);
    }
  };

  return (
    <div className="w-full">
      <section id="projects" className="py-20 md:py-28 bg-transparent relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="mb-10 md:mb-12 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 3D Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Featured Projects & Inventions
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl text-base sm:text-lg">
              Hardware-backed IoT prototypes, cross-platform mobile apps, and scalable web solutions. Hover to explore 3D depth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <ProjectCard3D
                key={p.id}
                project={p}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hardware & IoT Telemetry Laboratory Simulator */}
      <IoTVisualizer3D />

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
    </div>
  );
}
