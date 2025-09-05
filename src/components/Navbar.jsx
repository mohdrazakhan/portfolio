import React from "react";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-20 border-b bg-white/60 backdrop-blur-md dark:bg-zinc-900/60 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="font-semibold text-lg">
          Raza.dev
        </a>

        <nav className="hidden md:flex gap-6 text-sm text-zinc-600 dark:text-zinc-300">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            className="hidden md:inline-block rounded-xl border px-3 py-2 text-sm"
            aria-label="Download resume"
          >
            Resume
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-xl border p-2"
            title="Toggle theme"
          >
            <Moon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
