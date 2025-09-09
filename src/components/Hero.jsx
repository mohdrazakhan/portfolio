import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

// Small typewriter component: types `text` on mount at `speed` ms per char
function Typewriter({ text, speed = 90, className = "" }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let mounted = true;
    let i = 0;
    function tick() {
      if (!mounted) return;
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i += 1;
        window.setTimeout(tick, speed);
      }
    }
    // small initial delay so page loads feel smooth
    const start = window.setTimeout(tick, 350);
    return () => {
      mounted = false;
      window.clearTimeout(start);
    };
  }, [text, speed]);

  return (
    <span className={className}>
      {display}
      <span className="inline-block border-r-2 border-indigo-500 animate-pulse ml-1" aria-hidden="true" />
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="min-h-[80vh] sm:h-screen flex items-center">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center py-8 sm:py-12">    
        {/* Left: text */}
    <div className="flex flex-col items-center md:items-start space-y-3 md:space-y-5 md:pr-8">
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-zinc-100">
        Hi, I’m <Typewriter text="Mohd Raza Khan" speed={60} className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-purple-500" />
      </h1>
      <div className="mt-1">
        <span className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300/80 font-medium tracking-tight">— Developer</span>
      </div>

                    <p className="text-zinc-700 dark:text-zinc-300/90 leading-relaxed max-w-2xl text-base sm:text-lg">
            A passionate Software Developer, Full Stack Enthusiast and IoT Innovator. 
            I specialize in building impactful web, mobile, and IoT solutions that blend creativity with technology.
          </p>
          <p>
            💡 “Technology should solve real problems and create value for people.”
          </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6 w-full">
  <a href="#projects" className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-2xl text-sm sm:text-base font-medium shadow-md transition transform hover:-translate-y-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 dark:bg-none dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800">
    View Projects
  </a>

  <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-2xl border text-sm sm:text-base font-medium transition border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900/60">
    Contact Me
  </a>

  <a href="/resume.pdf" className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 rounded-full border-2 text-sm sm:text-base font-medium hover:scale-105 transition border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200">
    Resume
  </a>
  </div>
        </div>

                {/* Right: profile photo */}
                <div className="flex justify-center md:justify-end items-center overflow-hidden">
                  <div className="relative flex items-center justify-center p-1 pr-0 md:pr-0 lg:pr-0">
                      <img
                        src="/images/profile.png"
                        alt="Mohd Raza Khan"
                        className="      w-[90vw] 
                                  max-   w-[380px] 
                                  sm:    w-[60vw] 
                                  sm:max-w-[420px] 
                                  md:    w-[46vw] 
                                  lg:    w-[38vw] 
                                     max-h-[90vh] 
                                  sm:max-h-[90vh] 
                                  md:max-h-[90vh] 
                                  
                                  object-cover transition-transform duration-300 
                                  md:hover:scale-105 translate-x-0 sm:translate-x-4 md:translate-x-8 
                                  drop-shadow-lg 
                                  md:drop-shadow-2xl 
                                  mx-auto"
                      />
                    </div>
                </div>
        </div>
    </section>
  );
}
