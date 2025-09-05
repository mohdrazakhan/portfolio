import React from "react";
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";

export default function App() {
  useTheme();

  return (
    
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 text-zinc-900 dark:text-zinc-100">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <About />
           
        </main>
      </div>
    </>
  );
}
