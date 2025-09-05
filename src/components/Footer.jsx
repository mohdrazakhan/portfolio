// src/components/Footer.jsx
import React from "react";
import { ArrowUp, Github, Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";



export default function Footer() {
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="mt-24 bg-gradient-to-t from-transparent to-transparent">
      <div className="max-w-7xl mx-auto px-2 py-6">
        {/* card-like container */}
        <div className="w-full rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 p-10 md:p-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* left: brand + tagline */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <a
              href="https://mohdrazakhan.me"
              className="text-xl md:text-2xl font-semibold text-zinc-100 hover:text-white transition"
              target="_blank"
              rel="noreferrer"
            >
              Mohd Raza Khan
            </a>

            <div className="hidden md:flex flex-col text-sm text-zinc-400">
              <span>Developer · Java · C · Pyhon · Web </span>
              <span className="mt-1 text-xs text-zinc-500">Building fast, accessible web experiences.</span>
            </div>
          </div>

          {/* center: nav links (responsive) */}
          <nav className="flex flex-col sm:flex-row items-center gap-3 md:gap-6">
            <a href="#home" className="text-sm text-zinc-300 hover:text-white transition px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">Home</a>
            <a href="#about" className="text-sm text-zinc-300 hover:text-white transition px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">About</a>
            <a href="#projects" className="text-sm text-zinc-300 hover:text-white transition px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">Projects</a>
            <a href="#contact" className="text-sm text-zinc-300 hover:text-white transition px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">Contact</a>
          </nav>

          {/* right: socials + back-to-top */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex gap-2 md:gap-3">
              <a
                href="https://github.com/mohdrazakhan"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2 md:p-3 rounded-lg bg-zinc-800/60 hover:bg-zinc-800/80 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                title="GitHub"
              >
                <Github className="w-5 h-5 text-zinc-100" />
              </a>

              <a
                href="https://linkedin.com/in/mohdrazakhan32"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2 md:p-3 rounded-lg bg-zinc-800/60 hover:bg-zinc-800/80 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-zinc-100" />
              </a>

              <a
                href="https://twitter.com/mohdrazakhan32"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="p-2 md:p-3 rounded-lg bg-zinc-800/60 hover:bg-zinc-800/80 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                title="Twitter"
              >
                <FaXTwitter className="w-5 h-5 text-zinc-100" />
              </a>
            </div>

            <div className="border-l border-zinc-800 pl-3 md:pl-4">
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700 text-sm text-zinc-200 hover:bg-zinc-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <ArrowUp className="w-4 h-4" />
                <span className="hidden sm:inline">Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* bottom row: mobile copyright & small note */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>© {year} mohdrazakhan.me. All rights reserved.</div>
          <div className="text-zinc-400">
            <span className="hidden md:inline">Built with </span>
            <span className="font-medium text-zinc-300">React</span>
            <span className="mx-2">•</span>
            <span className="font-medium text-zinc-300">Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
