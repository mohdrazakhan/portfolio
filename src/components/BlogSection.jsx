import React from "react";
import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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

export default function BlogSection({ title = "Latest Writing", posts }) {
  const list = Array.isArray(posts) ? posts : [];
  return (
    <section id="blog" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
          <a href="/blog" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">View all</a>
        </div>

        {list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-8 text-center text-zinc-600 dark:text-zinc-400">
            No posts yet.
          </div>
        ) : (
          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
          >
            {list.map((post) => {
              const link = `/blog/${post.id || post.slug}`;
              const date = post.date || (post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : "");
              return (
                <motion.li key={post.id || post.slug} variants={item}>
                  <Link
                    to={link}
                    className="group block rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur p-4 sm:p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                      <time>{date}</time>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600">
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{post.summary}</p>
                    )}

                    {post.tags?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.map((t) => (
                          <span key={t} className="inline-flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
                            <Tag size={14} /> {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 inline-flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400">
                      <span>Read</span>
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
