import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecentActivity from "./RecentActivity";
import BlogSection from "./BlogSection";
import api from "../services/api";
import { Sparkles, ArrowRight } from "lucide-react";

function Typewriter({ text, speed = 90, className = "" }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let mounted = true;
    let i = 1;
    function tick() {
      if (!mounted) return;
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i += 1;
        window.setTimeout(tick, speed);
        return;
      }
    }
    const start = window.setTimeout(tick, 350);
    return () => {
      mounted = false;
      window.clearTimeout(start);
    };
  }, [text, speed]);

  return (
    <span className={`inline-block ${className}`} style={{ WebkitTextFillColor: "transparent" }}>
      {display}
      <span className="inline-block align-middle border-r-2 border-indigo-500 animate-pulse ml-1" aria-hidden="true" />
    </span>
  );
}

export default function Home() {
  const [recentPosts, setRecentPosts] = useState([]);
  
  useEffect(() => {
    async function loadRecentPosts() {
      try {
        const posts = await api.getPosts();
        const strip = (html) => (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        const formatted = (posts || []).slice(0, 3).map((p) => ({
          id: p.id,
          slug: p.slug || p.id,
          title: p.title,
          summary: p.summary || strip(p.content).slice(0, 140) + "…",
          date: p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : new Date().toLocaleDateString(),
          tags: p.tags || [],
        }));
        setRecentPosts(formatted);
      } catch (err) {
        console.warn("Failed to load posts from API:", err.message);
      }
    }
    loadRecentPosts();
  }, []);

  return (
    <main className="w-full min-h-screen">
      {/* 3D HERO SECTION */}
      <section id="home" className="pt-12 md:pt-20 pb-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 items-center md:gap-12 gap-8">
          
          {/* PROFILE IMAGE HERO */}
          <div className="order-1 md:order-2 md:col-span-5 relative flex items-center justify-center py-4">
            {/* Ambient Background Glow */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="relative group">
              {/* Profile Image with subtle hover lift and elegant border */}
              <div className="relative rounded-3xl p-2 bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent border border-zinc-200/80 dark:border-zinc-800 shadow-2xl backdrop-blur-sm">
                <img
                  src="/images/profile.png"
                  alt="Mohd Raza Khan"
                  className="w-64 sm:w-72 md:w-80 lg:w-[360px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Floating Tech Badge - IoT (Top Left) */}
              <div className="absolute -top-3 -left-3 sm:-left-4 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-xl pointer-events-none transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>⚡ IoT & ESP32</span>
              </div>

              {/* Floating Tech Badge - Full Stack (Bottom Right) */}
              <div className="absolute -bottom-3 -right-3 sm:-right-4 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-xl pointer-events-none transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                <span className="text-indigo-500">⚛️</span>
                <span>Full Stack & Flutter</span>
              </div>
            </div>
          </div>

          {/* TEXT & MULTI-PAGE NAVIGATION CTAS */}
          <div className="order-2 md:order-1 md:col-span-7 max-w-2xl text-center md:text-left relative z-10">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Stack Developer • IoT Specialist • Flutter</span>
            </div>

            <h1 className="font-black tracking-tight leading-none text-zinc-900 dark:text-zinc-100">
              <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                Hi, I’m{" "}
                <Typewriter
                  text="Mohd"
                  speed={60}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600"
                />
              </span>
              <span className="block mt-2 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                <Typewriter
                  text="Raza Khan"
                  speed={60}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600"
                />
              </span>
            </h1>

            <p className="text-zinc-600 dark:text-zinc-400 mt-4 text-base sm:text-lg font-medium">
              B.Tech Computer Science Engineering • Sharda University
            </p>

            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4 text-base sm:text-lg">
              Crafting high-impact digital experiences across web, mobile apps, and real-time IoT hardware. I bridge physical microcontrollers (ESP32) to interactive cloud platforms and clean UI architectures.
            </p>

            <blockquote className="mt-5 flex items-start gap-3 justify-center md:justify-start text-zinc-600 dark:text-zinc-400 italic text-sm sm:text-base border-l-2 border-indigo-500 pl-4 py-1">
              “Engineering technology that solves tangible, real-world problems.”
            </blockquote>

            {/* Multipage Page Links */}
            <div className="mt-8 flex flex-row flex-wrap justify-center md:justify-start gap-3">
              <Link
                to="/projects"
                className="px-5 py-3 rounded-xl text-sm sm:text-base font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="px-5 py-3 rounded-xl text-sm sm:text-base font-semibold border-2 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-all cursor-pointer"
              >
                About & Skills
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 rounded-xl text-sm sm:text-base font-semibold border-2 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-all cursor-pointer"
              >
                Contact
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl text-sm sm:text-base font-semibold border-2 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-all"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <RecentActivity />

      {/* RECENT BLOG PREVIEW */}
      <BlogSection posts={recentPosts} />
    </main>
  );
}