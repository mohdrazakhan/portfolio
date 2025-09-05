import React from "react";
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Analytics } from '@vercel/analytics/react';
import DottedBackground from "./components/DottedBackground";


export default function App() {
  useTheme();

  return (
  <>
      <DottedBackground
        spacing={56}
        dotRadius={3}
        dotColor="99,102,241"
        opacity={0.12}
        baseDarkness={0.9}
        spotlightRadius={820}
        spotlightStrength={0.35}
        spotlightColor="99,102,241"
      />
  <div className="relative min-h-screen bg-gradient-to-b from-white/0 to-black/5 dark:from-black/70 dark:to-black/30 text-zinc-900 dark:text-zinc-100">
  <Navbar />
  <main className="relative z-10">
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
