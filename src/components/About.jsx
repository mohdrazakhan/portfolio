import React from "react";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white/60 dark:bg-zinc-950/40">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <h2 className="text-2xl md:text-3xl font-semibold">About Me</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300">
            I'm a self-taught developer who turns ideas into polished products.
            I focus on clean UI, performance, and readable code. I build web apps with React & Tailwind and mobile apps with Flutter.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border p-5">
              <h3 className="font-medium">What I value</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Performance, accessibility, readable code, and thoughtful micro-interactions.
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <h3 className="font-medium">Location</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Greater Noida, India</p>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border p-5">
          <h3 className="font-medium">Quick Info</h3>
          <ul className="mt-4 text-sm text-zinc-600 dark:text-zinc-300 space-y-2">
            <li>🔭 Currently learning: Advanced React patterns</li>
            <li>🧰 Tools: VS Code, Git, Chrome DevTools</li>
            <li>🎯 Goals: Frontend role / internship</li>
            <li>💬 Languages: English, Hindi</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
