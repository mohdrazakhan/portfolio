import React, { useState, useEffect } from "react";
import RecentActivity from "./RecentActivity";
import BlogSection from "./BlogSection";
import { db } from "../firebase/app";
import { collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";

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
  // recent published posts from Firestore
  const [recentPosts, setRecentPosts] = useState([]);
  
  useEffect(() => {
    const col = collection(db, "posts");
    const q = query(col, where("published", "==", true), orderBy("updatedAt", "desc"), limit(3));
    const unsub = onSnapshot(q, (snap) => {
      const strip = (html) => (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      const list = snap.docs.map((d) => {
        const p = { id: d.id, ...d.data() };
        return {
          id: p.id,
          slug: p.id,
          title: p.title,
          summary: strip(p.content).slice(0, 140) + (strip(p.content).length > 140 ? "…" : ""),
          date: (p.updatedAt?.toDate?.() || p.createdAt?.toDate?.() || new Date()).toLocaleDateString(),
          tags: [],
        };
      });
      setRecentPosts(list);
    });
    return () => unsub();
  }, []);

  const handleScrollTo = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <main className="w-full min-h-screen">
      {/* HERO */}
      <section id="home" className="pt-16 md:pt-28 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 items-center md:gap-16 gap-8">
          
          {/* IMAGE */}
          <div className="order-1 md:order-2 md:col-span-5 flex justify-center">
            <img
              src="/images/profile.png"
              alt="Mohd Raza Khan"
              className="portrait-lift w-56 sm:w-64 md:w-[360px] lg:w-[420px] object-contain rounded-2xl transition-transform duration-300 hover:scale-[1.03]"
            />
          </div>

          {/* TEXT */}
          <div className="order-2 md:order-1 md:col-span-7 max-w-2xl text-center md:text-left">


            <h1 className="font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-zinc-100">
              <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                Hi, I’m{" "}
                <Typewriter
                  text="Mohd"
                  speed={60}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600"
                />
              </span>
              <span className="block mt-1 text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                <Typewriter
                  text="Raza Khan"
                  speed={60}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600"
                />
              </span>
            </h1>
            <p className="text-zinc-900 dark:text-zinc-400 mt-4 text-base sm:text-lg">
              — Computer Science Engineering (CSE) </p>
            <p className="text-zinc-900 dark:text-zinc-300 leading-relaxed mt-4 text-base sm:text-lg">
              A passionate Software Developer, Full Stack Enthusiast and IoT Innovator.
              I specialize in building impactful web, mobile, and IoT solutions that blend creativity with technology.
            </p>

            <blockquote className="mt-4 flex items-start gap-3 justify-center md:justify-start text-zinc-600 dark:text-zinc-300">
              <span className="text-2xl leading-none">💡</span>
              <span className="text-sm sm:text-base">
                “Technology should solve real problems and create value for people.”
              </span>
            </blockquote>

            {/* Buttons */}
            <div className="mt-6 flex flex-row flex-wrap justify-center md:justify-start gap-3">
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, 'projects')}
                className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer"
              >
                View Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium border-2 border-zinc-900 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 transition-all cursor-pointer"
              >
                Contact
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium border-2 border-zinc-900 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 transition-all"
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