import React from "react";
import { motion } from "framer-motion";
import { timeline } from "../data/timeline";
import * as Icons from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 150, damping: 16 } },
};

export default function Timeline({ title = "Career Timeline" }) {
  return (
    <section id="timeline" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">{title}</h2>
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-zinc-300 dark:via-zinc-700 to-violet-500/60" aria-hidden="true" />

          <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="space-y-6">
            {timeline.map((e) => {
              const Icon = Icons[e.icon] || Icons.Circle;
              return (
                <motion.li key={e.id} variants={item} className="relative pl-12 sm:pl-14">
                  {/* dot */}
                  <span className="absolute left-0 top-1.5 sm:left-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-zinc-900 ring-2 ring-indigo-500/60">
                    <Icon size={14} className="text-indigo-600" />
                  </span>
                  <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100">{e.title}</h3>
                      <time className="text-xs text-zinc-500 dark:text-zinc-400">{e.date}</time>
                    </div>
                    {e.subtitle && <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-0.5">{e.subtitle}</p>}
                    {e.description && <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-2">{e.description}</p>}
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
