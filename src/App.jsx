import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DottedBackground from "./components/DottedBackground";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Tools from "./pages/Tools";
import OptiRiderDetail from "./pages/OptiRiderDetail";
import FuelFatalityDetail from "./pages/FuelFadalityDetail";
import OneRoomDetail from "./pages/OneRoomDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";

export default function App() {
  useTheme();

  return (
    <AuthProvider>
    <BrowserRouter>
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/optirider" element={<OptiRiderDetail />} />
            <Route path="/projects/fuel-fatality" element={<FuelFatalityDetail />} />
            <Route path="/projects/one-room" element={<OneRoomDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>

          <Analytics />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
}
