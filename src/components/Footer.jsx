// src/components/Footer.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ArrowUp, Github, Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const { user, loginWithEmail, logout } = useAuth();
  const year = new Date().getFullYear();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    try {
      await loginWithEmail(email, password);
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      setLoginError(err.message || "Invalid credentials");
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {/* Card-like container */}
        <div className="w-full rounded-2xl backdrop-blur-sm border p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 bg-white/70 border-zinc-200 dark:bg-zinc-900/40 dark:border-zinc-800/50">
          {/* Left: Brand + small tagline (keeps visible on all sizes) */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <a
              href="https://mohdrazakhan.me"
              className="text-lg md:text-2xl font-semibold text-zinc-400 dark:text-zinc-90 hover:text-white transition"
              target="_blank"
              rel="noreferrer"
            >
              Mohd Raza Khan
            </a>

            {/* small tagline only visible on md+ to save space on mobile */}
            <div className="hidden md:flex flex-col text-sm text-zinc-600 dark:text-zinc-400">
              <span>Developer · Java · C · Python · Web</span>
              <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                Building fast, accessible web experiences.
              </span>
            </div>
          </div>

          {/* Center: Navigation links */}
          <nav
            className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2 md:gap-6 text-sm text-zinc-700 dark:text-zinc-300"
            aria-label="Footer navigation"
          >
            <a
              href="#home"
              className="px-2 py-1 rounded-md whitespace-nowrap hover:text-indigo-600 transition text-zinc-700 dark:text-zinc-300"
            >
              Home
            </a>

            <a
              href="#about"
              className="px-2 py-1 rounded-md whitespace-nowrap hover:text-indigo-600 transition text-zinc-700 dark:text-zinc-300"
            >
              About
            </a>

            <a
              href="#projects"
              className="px-2 py-1 rounded-md whitespace-nowrap hover:text-indigo-600 transition text-zinc-700 dark:text-zinc-300"
            >
              Projects
            </a>

            <a
              href="#contact"
              className="px-2 py-1 rounded-md whitespace-nowrap hover:text-indigo-600 transition text-zinc-700 dark:text-zinc-300"
            >
              Contact
            </a>

            <a
              href="#tools"
              className="px-2 py-1 rounded-md whitespace-nowrap hover:text-indigo-600 transition text-zinc-700 dark:text-zinc-300"
            >
              Tools
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-2 py-1 rounded-md whitespace-nowrap hover:text-indigo-600 transition text-zinc-700 dark:text-zinc-300"
            >
              Resume
            </a>
          </nav>

          {/* Right: Social icons + Admin/Login + Back-to-top */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="mr-2">
              {user ? (
                <a
                  href="/admin"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm"
                >
                  Admin
                </a>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm"
                >
                  Login
                </button>
              )}
            </div>
            <div className="flex gap-2 md:gap-2">
              <a
                href="https://github.com/mohdrazakhan"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2 md:p-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800/60 dark:hover:bg-zinc-800/80"
                title="GitHub"
              >
                <Github className="w-5 h-5 text-zinc-700 dark:text-zinc-100" />
              </a>

              <a
                href="https://linkedin.com/in/mohdrazakhan32"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2 md:p-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800/60 dark:hover:bg-zinc-800/80"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-zinc-700 dark:text-zinc-100" />
              </a>

              <a
                href="https://twitter.com/mohdrazakhan32"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="p-2 md:p-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800/60 dark:hover:bg-zinc-800/80"
                title="Twitter"
              >
                <FaXTwitter className="w-5 h-5 text-zinc-700 dark:text-zinc-100" />
              </a>
            </div>

            {user && (
              <button onClick={logout} className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm mr-2">Logout</button>
            )}
            <div className="border-l border-zinc-200 dark:border-zinc-800 pl-3 md:pl-4">
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="flex items-center gap-2 px-3 py-1 rounded-full border text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <ArrowUp className="w-4 h-4" />
                <span className="hidden sm:inline">Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowLoginModal(false)}>
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold mb-4">Admin Login</h3>
              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border px-3 py-2 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border px-3 py-2 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                  required
                />
                {loginError && <p className="text-sm text-red-600">{loginError}</p>}
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm">
                    Sign In
                  </button>
                  <button type="button" onClick={() => setShowLoginModal(false)} className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bottom row: mobile copyright & small note */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-500">
          <div>© {year} mohdrazakhan.me. All rights reserved.</div>
          <div className="text-zinc-600 dark:text-zinc-400">
            <span className="hidden md:inline">Built with </span>
            <span className="font-medium text-zinc-800 dark:text-zinc-300">React</span>
            <span className="mx-2">•</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-300">Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}