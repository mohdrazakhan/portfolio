import React from "react";
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Analytics } from '@vercel/analytics/react';


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
          <Contact />
      {/* Analytics is safe in client React apps via @vercel/analytics/react */}
      <Analytics />
        </main>
        <Footer />
      </div>
    </>
  );
}
