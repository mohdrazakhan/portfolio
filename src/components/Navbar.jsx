import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  // initialize theme from localStorage or OS preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved ? saved === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur-md border-zinc-200 dark:bg-zinc-900/60 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
          Raza.me
        </a>

        <nav className="hidden md:flex gap-6 text-sm text-zinc-700 dark:text-zinc-300">
          <a href="#home" className="hover:text-indigo-600">Home</a>
          <a href="#about" className="hover:text-indigo-600">About</a>
          <a href="#projects" className="hover:text-indigo-600">Projects</a>
          <a href="#contact" className="hover:text-indigo-600">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            className="hidden md:inline-block rounded-xl border px-3 py-2 text-sm border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            aria-label="Download resume"
          >
            Resume
          </a>

          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-xl border p-2 border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
