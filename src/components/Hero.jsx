import React from "react";
import { Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="h-screen min-h-screen flex items-center">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 sm:py-0">    
        {/* Left: text */}
        <div className="flex flex-col items-center md:items-start space-y-6 md:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-tight">
            Hi, I’m 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                Mohd Raza Khan
            </span>
            <span className="ml-2 text-lg sm:text-xl md:text-2xl text-zinc-300/80 font-medium">
                — Developer
            </span>
            </h1>

          <p className="text-zinc-300/90 leading-relaxed max-w-2xl text-base sm:text-lg">
            I build fast, accessible, responsive web & mobile experiences using React, Tailwind and Flutter.
            I focus on clean UI, performance and practical projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6">
    <a href="#projects" className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-900 text-sm sm:text-base font-medium shadow-md transition transform hover:-translate-y-0.5">
        View Projects
    </a>

    <a href="#contact" className="inline-flex items-center justify-center px-5 py-3 rounded-2xl border border-zinc-700 text-sm sm:text-base font-medium hover:bg-zinc-900/60 transition">
        Contact Me
    </a>

    <a href="/resume.pdf" className="inline-flex items-center justify-center px-4 py-3 rounded-full border-2 border-zinc-700 text-sm sm:text-base font-medium hover:scale-105 transition">
        Resume
    </a>
    </div>
        </div>

        {/* Right: profile photo */}
        <div className="flex justify-center md:justify-end items-center">
            <div className="relative flex items-center justify-center rounded-full p-1 bg-gradient-to-br from-indigo-600/20 to-purple-600/20">
            <img
                src="/src/assets/images/profile.jpg"
                alt="Mohd Raza Khan"
                className="h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-full object-cover 
                shadow-lg md:shadow-xl border-4 border-white dark:border-zinc-800
                transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            />
    
            </div>
        </div>
        </div>
    </section>
  );
}
