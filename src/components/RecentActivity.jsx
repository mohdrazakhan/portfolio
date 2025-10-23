import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { activities as seedActivities, activityTypeColors } from "../data/activities";
import { ExternalLink } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
};

export default function RecentActivity({ title = "Recent Activity", limit = 6 }) {
  const [items, setItems] = useState(seedActivities);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("admin.activities") || "null");
      if (Array.isArray(saved) && saved.length) {
        setItems(saved);
      }
    } catch {}
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const list = [...items]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
  return (
    <section id="activity" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
          <a 
            href="#projects" 
            onClick={handleScrollToProjects}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            See projects
          </a>
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {list.map((a) => (
            <motion.li key={a.id} variants={item}>
              <a
                href={a.link || "#"}
                className="block group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur p-4 sm:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white bg-gradient-to-r ${activityTypeColors[a.type] || "from-zinc-600 to-zinc-800"}`}
                  >
                    {a.type}
                  </span>
                  <time className="text-xs text-zinc-500 dark:text-zinc-400">{a.date}</time>
                </div>
                <h3 className="mt-3 text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600">
                  {a.title}
                </h3>
                {a.description && (
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{a.description}</p>
                )}
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400">
                  <span>Open</span>
                  <ExternalLink size={16} />
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
