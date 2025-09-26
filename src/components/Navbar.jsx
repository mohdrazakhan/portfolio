import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // initialize theme from localStorage or OS preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
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
        {/* Logo */}
        <a href="#home" className="hover:text-indigo-600 font-semibold text-lg md:text-xl text-zinc-900 dark:text-zinc-100">
          Raza.me
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm text-zinc-700 dark:text-zinc-300">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-indigo-600" : "hover:text-green-600")}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-indigo-600" : "hover:text-green-600")}>
            About
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "text-indigo-600" : "hover:text-green-600")}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-indigo-600" : "hover:text-green-600")}>
            Contact
          </NavLink>
          <NavLink to="/tools" className={({ isActive }) => (isActive ? "text-indigo-600" : "hover:text-green-600")}>
            Tools
          </NavLink>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Resume (desktop only) */}
          <a
            href="/resume.pdf"
            className="hidden md:inline-block rounded-xl border px-3 py-2 text-sm border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Resume
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-xl border p-2 border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
            aria-label="Open menu"
          >
            {/* 3-line hamburger */}
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="22" height="2" rx="1" fill="currentColor" />
              <rect x="0" y="7" width="22" height="2" rx="1" fill="currentColor" />
              <rect x="0" y="14" width="22" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-30">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
          {/* panel */}
          <div className="absolute top-0 right-0 h-full w-2/3 max-w-xs bg-zinc-900 text-white shadow-lg p-6 flex flex-col gap-6 transition-transform duration-300">
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl self-end"
            >
              ×
            </button>

            {/* Links */}
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/projects" onClick={() => setMenuOpen(false)}>Projects</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
            <NavLink to="/tools" onClick={() => setMenuOpen(false)}>Tools</NavLink>

            {/* Resume inside drawer (mobile only) */}
            <a
              href="/resume.pdf"
              className="rounded-xl border px-3 py-2 text-sm border-indigo-500 text-indigo-400 hover:bg-indigo-600/20"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}