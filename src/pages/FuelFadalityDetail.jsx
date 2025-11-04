// src/pages/FuelFatalityDetail.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, MapPin, TrendingUp, Clock, CheckCircle2, Sparkles, FileText, Award, Droplet, Cpu, Radio, ArrowRight, RefreshCw, BarChart3, ChevronLeft, ChevronRight, AlertTriangle, Shield, Activity, Waves, Thermometer, Gauge, Database, Wifi, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FuelFatalityDetail() {
  const navigate = useNavigate();

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Interactive sensor animation state
  const [activeSensor, setActiveSensor] = useState(null);
  
  // Demo images for slideshow
  const demoImages = [
    { url: "/asset/fuel-Fadality/curcit_diagram.jpeg", title: "Circuit Diagram", desc: "Complete circuit design with IoT sensors and Arduino integration" },
    { url: "/asset/fuel-Fadality/prototype.jpeg", title: "Hardware Prototype", desc: "Functional prototype with sensor array and microcontroller" },
    { url: "/asset/fuel-Fadality/prototype_display.jpeg", title: "Display Interface", desc: "Real-time monitoring display showing fuel quality metrics" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % demoImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + demoImages.length) % demoImages.length);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="min-h-screen py-20 md:py-28"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-5xl px-6">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/#projects")}
          className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-100 mb-8 transition"
          variants={itemVariants}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} className="group-hover:animate-pulse" />
          <span>Back to Projects</span>
        </motion.button>

        {/* Project Header with Gradient Background */}
        <motion.div
          className="relative mb-12 rounded-3xl p-8 md:p-12 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-amber-600/20 border border-orange-500/30 overflow-hidden"
          variants={scaleVariants}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [0, -90, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="relative z-10">
            <motion.div
              className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 mb-4"
              variants={itemVariants}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center drop-shadow-xl">
                  <Droplet className="text-white" size={40} />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-red-500/10 rounded-full blur-lg"
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-center sm:text-left">
                Fuel Fadality
              </h1>
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-zinc-300 mb-6 max-w-3xl text-center sm:text-left"
              variants={itemVariants}
            >
              AI-Powered Intelligent Vehicle Maintenance & Fuel Adulteration Detection System
            </motion.p>

            {/* Tags with hover animations */}
            <motion.div className="flex flex-wrap gap-2 sm:gap-3 mb-8 justify-center sm:justify-start" variants={itemVariants}>
              {["ESP32", "Embedded C", "Arduino IDE", "Firebase", "IoT Sensors", "OLED Display"].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-900/60 backdrop-blur-sm text-zinc-200 text-xs sm:text-sm font-medium border border-zinc-700/50"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(249, 115, 22, 0.2)",
                    borderColor: "rgba(249, 115, 22, 0.5)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Patent Badge */}
            <motion.div 
              className="mb-8 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 border border-amber-500/30"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <motion.div
                  className="p-2 bg-amber-500/20 rounded-lg flex-shrink-0"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Award className="text-amber-400" size={20} />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-amber-200 font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <Sparkles size={14} className="text-amber-400 flex-shrink-0" />
                    Patent Under Development
                  </p>
                  <p className="text-zinc-400 text-xs sm:text-sm">Patent REF No.: SURDC/P/25/09/750 • April 2025</p>
                </div>
                <motion.a
                  href="/asset/PBL-4_CSP390_Project_Report.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 hover:border-amber-500/50 text-amber-200 rounded-lg transition font-medium text-sm whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText size={16} />
                  View Report
                </motion.a>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4" variants={itemVariants}>
              <motion.a
                href="#"
                className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl transition font-medium shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 text-sm sm:text-base"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={18} className="group-hover:animate-spin" />
                View Live Demo
              </motion.a>
              <motion.a
                href="#"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-zinc-700 hover:border-orange-500 hover:bg-zinc-800/50 text-zinc-200 rounded-xl transition font-medium backdrop-blur-sm text-center text-sm sm:text-base"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Code
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Interactive Image Slideshow */}
        <motion.section
          className="mb-16"
          variants={scaleVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            <h2 className="text-3xl font-bold text-zinc-100">System Demo & Screenshots</h2>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden bg-zinc-900/40 border border-zinc-800 p-8">
            {/* Slideshow Container */}
            <div className="relative aspect-video bg-zinc-800/50 rounded-2xl overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src={demoImages[currentSlide].url}
                    alt={demoImages[currentSlide].title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      e.target.src = "/images/fuel-fatality.png";
                    }}
                  />
                  {/* Image overlay with title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 md:p-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{demoImages[currentSlide].title}</h3>
                    <p className="text-zinc-300 text-xs sm:text-sm md:text-base">{demoImages[currentSlide].desc}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-all z-10"
              >
                <ChevronLeft className="text-white" size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-all z-10"
              >
                <ChevronRight className="text-white" size={20} />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center overflow-x-auto pb-2 px-2">
              {demoImages.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    currentSlide === index
                      ? "border-orange-500 scale-110"
                      : "border-zinc-700 hover:border-zinc-500"
                  }`}
                  whileHover={{ scale: currentSlide === index ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/images/fuel-fatality.png";
                    }}
                  />
                  {currentSlide === index && (
                    <div className="absolute inset-0 bg-orange-500/20 border-2 border-orange-400" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Interactive Sensor System Visualization */}
        <motion.section
          className="mb-16"
          variants={scaleVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
            <h2 className="text-3xl font-bold text-zinc-100">Interactive Sensor System</h2>
          </div>

          <div className="bg-zinc-900/40 rounded-3xl p-8 border border-zinc-800">
            <p className="text-zinc-400 mb-8 text-center">
              Click on each sensor to learn how it works in the fuel monitoring system
            </p>

            {/* Fuel Tank Visualization with Sensors */}
            <div className="relative max-w-4xl mx-auto">
              {/* Fuel Tank Container */}
              <div className="relative bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 rounded-3xl border-4 border-zinc-700 p-8 min-h-[500px]">
                
                {/* Fuel Level Animation */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-600/30 via-orange-500/20 to-transparent rounded-b-2xl"
                  initial={{ height: "60%" }}
                  animate={{ height: ["60%", "65%", "60%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Fuel Nozzle at Top */}
                <motion.div
                  className="absolute -top-12 left-1/2 -translate-x-1/2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Droplet className="text-amber-400" size={48} />
                  <p className="text-xs text-zinc-400 text-center mt-1">Fuel Input</p>
                </motion.div>

                {/* Turbidity Sensor (Quality Sensor Stick) */}
                <motion.div
                  className={`absolute left-1/2 top-[18%] -translate-x-1/2 cursor-pointer ${activeSensor === 'turbidity' ? 'z-20' : 'z-10'}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  onClick={() => setActiveSensor(activeSensor === 'turbidity' ? null : 'turbidity')}
                >
                  <motion.div
                    className="relative"
                    animate={activeSensor === 'turbidity' ? { y: [-5, 5, -5] } : {}}
                    transition={{ duration: 2, repeat: activeSensor === 'turbidity' ? Infinity : 0, ease: "easeInOut" }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-white rounded-xl p-2 shadow-xl border-2 border-blue-400 flex items-center justify-center"
                      animate={activeSensor === 'turbidity' ? { 
                        boxShadow: ["0 0 20px rgba(59, 130, 246, 0.5)", "0 0 40px rgba(59, 130, 246, 0.8)", "0 0 20px rgba(59, 130, 246, 0.5)"] 
                      } : {}}
                      transition={{ duration: 1.5, repeat: activeSensor === 'turbidity' ? Infinity : 0 }}
                    >
                      <img 
                        src="/asset/fuel-Fadality/sensors/Turbidity Sensor.png" 
                        alt="Turbidity Sensor"
                        className="w-full h-full object-contain mix-blend-multiply" 
                        style={{filter: 'drop-shadow(0 0 8px #60a5fa)'}}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-blue-400 text-2xl">💧</div>';
                        }}
                      />
                    </motion.div>
                    {/* Scanning animation */}
                    {activeSensor === 'turbidity' && (
                      <motion.div
                        className="absolute inset-0 border-2 border-blue-400 rounded-xl"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <p className="text-xs text-zinc-400 text-center mt-2 whitespace-nowrap">Turbidity Sensor</p>
                </motion.div>

                {/* Flow Sensor (YF-S201) */}
                <motion.div
                  className={`absolute left-[18%] top-[40%] -translate-x-1/2 cursor-pointer ${activeSensor === 'flow' ? 'z-20' : 'z-10'}`}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  onClick={() => setActiveSensor(activeSensor === 'flow' ? null : 'flow')}
                >
                  <motion.div
                    className="relative"
                    animate={activeSensor === 'flow' ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 2, repeat: activeSensor === 'flow' ? Infinity : 0, ease: "linear" }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-white rounded-xl p-2 shadow-xl border-2 border-green-400 flex items-center justify-center"
                      animate={activeSensor === 'flow' ? { 
                        boxShadow: ["0 0 20px rgba(34, 197, 94, 0.5)", "0 0 40px rgba(34, 197, 94, 0.8)", "0 0 20px rgba(34, 197, 94, 0.5)"] 
                      } : {}}
                      transition={{ duration: 1.5, repeat: activeSensor === 'flow' ? Infinity : 0 }}
                    >
                      <img 
                        src="/asset/fuel-Fadality/sensors/YF-S201.png" 
                        alt="Flow Sensor"
                        className="w-full h-full object-contain mix-blend-multiply" 
                        style={{filter: 'drop-shadow(0 0 8px #4ade80)'}}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-green-400 text-2xl">⚡</div>';
                        }}
                      />
                    </motion.div>
                    {activeSensor === 'flow' && (
                      <motion.div
                        className="absolute inset-0 border-2 border-green-400 rounded-xl"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <p className="text-xs text-zinc-400 text-center mt-2 whitespace-nowrap">YF-S201</p>
                </motion.div>

                {/* Temperature Sensor (LM35) */}
                <motion.div
                  className={`absolute right-[18%] top-[40%] translate-x-1/2 cursor-pointer ${activeSensor === 'temperature' ? 'z-20' : 'z-10'}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  onClick={() => setActiveSensor(activeSensor === 'temperature' ? null : 'temperature')}
                >
                  <motion.div
                    className="relative"
                    animate={activeSensor === 'temperature' ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: activeSensor === 'temperature' ? Infinity : 0 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-white rounded-xl p-2 shadow-xl border-2 border-red-400 flex items-center justify-center"
                      animate={activeSensor === 'temperature' ? { 
                        boxShadow: ["0 0 20px rgba(239, 68, 68, 0.5)", "0 0 40px rgba(239, 68, 68, 0.8)", "0 0 20px rgba(239, 68, 68, 0.5)"] 
                      } : {}}
                      transition={{ duration: 1.5, repeat: activeSensor === 'temperature' ? Infinity : 0 }}
                    >
                      <img 
                        src="/asset/fuel-Fadality/sensors/LM35.png" 
                        alt="Temperature Sensor"
                        className="w-full h-full object-contain mix-blend-multiply" 
                        style={{filter: 'drop-shadow(0 0 8px #f87171)'}}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-red-400 text-2xl">🌡️</div>';
                        }}
                      />
                    </motion.div>
                    {activeSensor === 'temperature' && (
                      <motion.div
                        className="absolute inset-0 border-2 border-red-400 rounded-xl"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <p className="text-xs text-zinc-400 text-center mt-2 whitespace-nowrap">LM35</p>
                </motion.div>

                {/* ESP32 Microcontroller */}
                <motion.div
                  className={`absolute left-[25%] bottom-[20%] -translate-x-1/2 cursor-pointer ${activeSensor === 'esp32' ? 'z-20' : 'z-10'}`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActiveSensor(activeSensor === 'esp32' ? null : 'esp32')}
                >
                  <motion.div
                    className="relative"
                    animate={activeSensor === 'esp32' ? { y: [-3, 3, -3] } : {}}
                    transition={{ duration: 1.5, repeat: activeSensor === 'esp32' ? Infinity : 0 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-white rounded-xl p-2 shadow-xl border-2 border-purple-400 flex items-center justify-center"
                      animate={activeSensor === 'esp32' ? { 
                        boxShadow: ["0 0 20px rgba(168, 85, 247, 0.5)", "0 0 40px rgba(168, 85, 247, 0.8)", "0 0 20px rgba(168, 85, 247, 0.5)"] 
                      } : {}}
                      transition={{ duration: 1.5, repeat: activeSensor === 'esp32' ? Infinity : 0 }}
                    >
                      <img 
                        src="/asset/fuel-Fadality/sensors/ESP32.png" 
                        alt="ESP32"
                        className="w-full h-full object-contain mix-blend-multiply" 
                        style={{filter: 'drop-shadow(0 0 8px #c084fc)'}}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-purple-400 text-2xl">🔷</div>';
                        }}
                      />
                    </motion.div>
                    {activeSensor === 'esp32' && (
                      <motion.div
                        className="absolute inset-0 border-2 border-purple-400 rounded-xl"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <p className="text-xs text-zinc-400 text-center mt-2 whitespace-nowrap">ESP32</p>
                </motion.div>

                {/* OLED Display */}
                <motion.div
                  className={`absolute right-[25%] bottom-[20%] translate-x-1/2 cursor-pointer ${activeSensor === 'oled' ? 'z-20' : 'z-10'}`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActiveSensor(activeSensor === 'oled' ? null : 'oled')}
                >
                  <motion.div
                    className="relative"
                    animate={activeSensor === 'oled' ? { opacity: [1, 0.7, 1] } : {}}
                    transition={{ duration: 1, repeat: activeSensor === 'oled' ? Infinity : 0 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-white rounded-xl p-2 shadow-xl border-2 border-cyan-400 flex items-center justify-center"
                      animate={activeSensor === 'oled' ? { 
                        boxShadow: ["0 0 20px rgba(34, 211, 238, 0.5)", "0 0 40px rgba(34, 211, 238, 0.8)", "0 0 20px rgba(34, 211, 238, 0.5)"] 
                      } : {}}
                      transition={{ duration: 1.5, repeat: activeSensor === 'oled' ? Infinity : 0 }}
                    >
                      <img 
                        src="/asset/fuel-Fadality/sensors/OLED.png" 
                        alt="OLED Display"
                        className="w-full h-full object-contain mix-blend-multiply" 
                        style={{filter: 'drop-shadow(0 0 8px #22d3ee)'}}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-cyan-400 text-2xl">📺</div>';
                        }}
                      />
                    </motion.div>
                    {activeSensor === 'oled' && (
                      <motion.div
                        className="absolute inset-0 border-2 border-cyan-400 rounded-xl"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <p className="text-xs text-zinc-400 text-center mt-2 whitespace-nowrap">OLED Display</p>
                </motion.div>
              </div>
              {/* End of tank visualization */}
              {/* Sensor Info Panel (moved outside tank visualization) */}
              <AnimatePresence mode="wait">
                {activeSensor && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 border-2 border-orange-500/50"
                  >
                    {activeSensor === 'turbidity' && (
                      <div>
                        <h3 className="text-2xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                          <Waves size={24} />
                          Turbidity Sensor
                        </h3>
                        <p className="text-zinc-300 mb-3">
                          Measures the clarity of fuel to detect contamination or adulteration. Ensures only clean fuel reaches the engine, protecting performance and longevity.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                            <p className="text-xs text-zinc-400">Range</p>
                            <p className="text-blue-300 font-semibold">0-1000 NTU</p>
                          </div>
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                            <p className="text-xs text-zinc-400">Accuracy</p>
                            <p className="text-blue-300 font-semibold">±5% F.S.</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeSensor === 'flow' && (
                      <div>
                        <h3 className="text-2xl font-bold text-green-300 mb-3 flex items-center gap-2">
                          <Gauge size={24} />
                          YF-S201 Flow Sensor
                        </h3>
                        <p className="text-zinc-300 mb-3">
                          Monitors the rate of fuel flow to detect leaks, theft, or abnormal consumption. Provides real-time quantity data for accurate monitoring.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                            <p className="text-xs text-zinc-400">Range</p>
                            <p className="text-green-300 font-semibold">1-30 L/min</p>
                          </div>
                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                            <p className="text-xs text-zinc-400">Output</p>
                            <p className="text-green-300 font-semibold">Pulse (Hz)</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeSensor === 'temperature' && (
                      <div>
                        <h3 className="text-2xl font-bold text-red-300 mb-3 flex items-center gap-2">
                          <Thermometer size={24} />
                          LM35 Temperature Sensor
                        </h3>
                        <p className="text-zinc-300 mb-3">
                          Monitors fuel temperature with high precision. Temperature data helps identify abnormal heating, 
                          which can indicate fuel degradation or system malfunction. Essential for maintaining fuel quality.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                            <p className="text-xs text-zinc-400">Range</p>
                            <p className="text-red-300 font-semibold">-55°C to 150°C</p>
                          </div>
                          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                            <p className="text-xs text-zinc-400">Precision</p>
                            <p className="text-red-300 font-semibold">±0.5°C</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeSensor === 'esp32' && (
                      <div>
                        <h3 className="text-2xl font-bold text-purple-300 mb-3 flex items-center gap-2">
                          <Cpu size={24} />
                          ESP32 Microcontroller
                        </h3>
                        <p className="text-zinc-300 mb-3">
                          The brain of the system! ESP32 collects data from all sensors, processes it in real-time using embedded C code, 
                          and transmits data to Firebase via WiFi while controlling the OLED display.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                            <p className="text-xs text-zinc-400">Processor</p>
                            <p className="text-purple-300 font-semibold">Dual-core 240MHz</p>
                          </div>
                          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                            <p className="text-xs text-zinc-400">Connectivity</p>
                            <p className="text-purple-300 font-semibold">WiFi + Bluetooth</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeSensor === 'oled' && (
                      <div>
                        <h3 className="text-2xl font-bold text-cyan-300 mb-3 flex items-center gap-2">
                          <Eye size={24} />
                          OLED Display Module
                        </h3>
                        <p className="text-zinc-300 mb-3">
                          Provides instant visual feedback with real-time fuel quality metrics, flow rate, temperature, 
                          and system status. No need for external devices - everything is visible at a glance!
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                            <p className="text-xs text-zinc-400">Display Type</p>
                            <p className="text-cyan-300 font-semibold">128x64 OLED</p>
                          </div>
                          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                            <p className="text-xs text-zinc-400">Update Rate</p>
                            <p className="text-cyan-300 font-semibold">Real-time</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              {activeSensor === null && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-zinc-500 mt-6 italic"
                >
                  👆 Click on any component to learn more about its function
                </motion.p>
              )}
            </div>
          </div>
        </motion.section>

        {/* How It Works - System Flow */}
        <motion.section
          className="mb-16"
          variants={scaleVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            <h2 className="text-3xl font-bold text-zinc-100">How Fuel Fadality Works</h2>
          </div>

          <div className="bg-zinc-900/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-zinc-800">
            {/* Step-by-step Flow */}
            <div className="space-y-6 sm:space-y-8">
              {/* Step 1 */}
              <motion.div
                className="flex flex-col md:flex-row items-start gap-4 sm:gap-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-orange-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  1
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">IoT Sensor Network Deployment</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    ESP32 microcontroller integrated with turbidity sensor for fuel quality monitoring, YF-S201 flow sensor for fuel quantity measurement, and LM35 temperature sensor, all connected via WiFi to Firebase for real-time data transmission.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <span className="px-2 sm:px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-300 text-xs sm:text-sm">Turbidity Sensor</span>
                    <span className="px-2 sm:px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-300 text-xs sm:text-sm">LM35 Temperature</span>
                    <span className="px-2 sm:px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-300 text-xs sm:text-sm">YF-S201 Flow Sensor</span>
                    <span className="px-2 sm:px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-300 text-xs sm:text-sm">ESP32</span>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Radio className="text-orange-400" size={32} />
                </motion.div>
              </motion.div>

              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="text-orange-400 rotate-90" size={24} />
                </motion.div>
              </div>

              {/* Step 2 */}
              <motion.div
                className="flex flex-col md:flex-row items-start gap-4 sm:gap-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-red-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  2
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">Real-Time Data Collection & Processing</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    Sensors continuously monitor fuel flow, quality (turbidity), and temperature. The ESP32 collects data in real-time and transmits it to Firebase via WiFi, while simultaneously displaying live analytics on an integrated OLED screen.
                  </p>
                  <div className="p-3 sm:p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                    <p className="text-red-300 text-xs sm:text-sm">📊 Real-time WiFi transmission to Firebase with OLED display</p>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="text-red-400" size={32} />
                </motion.div>
              </motion.div>

              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  <ArrowRight className="text-red-400 rotate-90" size={32} />
                </motion.div>
              </div>

              {/* Step 3 */}
              <motion.div
                className="flex flex-col md:flex-row items-start gap-4 sm:gap-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-pink-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  3
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">Fuel Quality & Quantity Analysis</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    The turbidity sensor measures fuel quality by detecting impurities and adulteration, while the YF-S201 flow sensor accurately measures fuel quantity in real-time. Temperature data from LM35 provides additional context for fuel condition monitoring.
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg text-center">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Turbidity</p>
                      <p className="text-green-400 font-semibold text-xs sm:text-sm">✓ Clear</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg text-center">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Flow Rate</p>
                      <p className="text-green-400 font-semibold text-xs sm:text-sm">✓ Normal</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg text-center">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Temperature</p>
                      <p className="text-blue-400 font-semibold text-xs sm:text-sm">28°C</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Status</p>
                      <p className="text-green-400 font-semibold text-xs sm:text-sm">✓ Good Quality</p>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Cpu className="text-pink-400" size={32} />
                </motion.div>
              </motion.div>

              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                >
                  <ArrowRight className="text-purple-400 rotate-90" size={32} />
                </motion.div>
              </div>

              {/* Step 4 */}
              <motion.div
                className="flex flex-col md:flex-row items-start gap-4 sm:gap-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-purple-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  4
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">OLED Display & Firebase Sync</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    Real-time analytics are displayed on an integrated OLED screen, showing fuel quantity, quality metrics, and temperature readings. All data is simultaneously transmitted to Firebase cloud database via WiFi for remote monitoring and historical analysis.
                  </p>
                  <div className="flex items-center gap-2 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <CheckCircle2 className="text-blue-400 flex-shrink-0" size={20} />
                    <p className="text-blue-300 text-xs sm:text-sm">Data synced to Firebase - Real-time OLED display active</p>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertTriangle className="text-amber-400" size={32} />
                </motion.div>
              </motion.div>

              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
                >
                  <ArrowRight className="text-blue-400 rotate-90" size={24} />
                </motion.div>
              </div>

              {/* Step 5 */}
              <motion.div
                className="flex flex-col md:flex-row items-start gap-4 sm:gap-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.div
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-blue-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  5
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">Cloud Analytics & Monitoring</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    Firebase stores historical data enabling trend analysis, fuel consumption patterns, and quality tracking over time. The system provides comprehensive insights to help users monitor fuel usage and detect anomalies.
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Data Points</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-400">Real-time</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Cloud Sync</p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-400">Active</p>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <BarChart3 className="text-teal-400" size={32} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          variants={containerVariants}
        >
          {[
            { icon: Shield, label: "Detection Accuracy", value: "95%" },
            { icon: Clock, label: "Response Time", value: "<5s" },
            { icon: TrendingUp, label: "Fuel Savings", value: "20%" },
            { icon: CheckCircle2, label: "Project Status", value: "Complete" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group p-6 rounded-2xl bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <stat.icon className="text-orange-400 mb-3 group-hover:scale-110 transition-transform" size={28} />
              <div className="text-3xl font-bold text-zinc-100 mb-1">{stat.value}</div>
              <div className="text-sm text-zinc-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Details */}
        <div className="space-y-12">
          {/* Overview */}
          <motion.section variants={slideInLeft}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
              <h2 className="text-3xl font-bold text-zinc-100">Overview</h2>
            </div>
            <div className="space-y-4 text-zinc-300 leading-relaxed bg-zinc-900/40 rounded-2xl p-8 border border-zinc-800">
              <p>
                Fuel Fadality is an innovative IoT-based intelligent vehicle maintenance system designed to address 
                the critical issues of fuel adulteration and vehicle health monitoring. Developed in April 2025 as part 
                of the Problem-Based Learning (PBL-4) curriculum under course CSP390 at UPES, this project is currently 
                under patent development with Patent REF No.: SURDC/P/25/09/750.
              </p>
              <p>
                The device is built using ESP32 microcontroller integrated with a turbidity sensor for fuel quality monitoring, 
                YF-S201 flow sensor for accurate fuel quantity measurement, and LM35 temperature sensor. Programmed in Embedded C 
                using Arduino IDE, the system measures fuel flow, quality, and temperature in real-time, transmitting all data to 
                Firebase via WiFi while simultaneously displaying live analytics on an integrated OLED screen.
              </p>
              <p className="text-amber-300 font-semibold">
                � Patent Under Development: REF No. SURDC/P/25/09/750 - "IoT-based Fuel Quality Monitoring System"
              </p>
            </div>
          </motion.section>

          {/* Key Features */}
          <motion.section variants={slideInRight}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full" />
              <h2 className="text-3xl font-bold text-zinc-100">Key Features</h2>
            </div>
            <div className="grid gap-4">
              {[
                {
                  title: "Turbidity-Based Fuel Quality Monitoring",
                  desc: "Advanced turbidity sensor continuously monitors fuel purity and composition, detecting impurities and adulteration in real-time to protect engines from contaminated fuel damage.",
                  icon: Droplet,
                },
                {
                  title: "Precise Fuel Quantity Measurement",
                  desc: "YF-S201 flow sensor accurately measures fuel flow and quantity, enabling precise tracking of fuel consumption and detecting any anomalies in fuel usage patterns.",
                  icon: Activity,
                },
                {
                  title: "Real-Time OLED Display",
                  desc: "Integrated OLED screen displays live fuel quality metrics, quantity measurements, and temperature readings, providing instant visual feedback to users without requiring external devices.",
                  icon: Cpu,
                },
                {
                  title: "Firebase Cloud Integration",
                  desc: "WiFi-enabled ESP32 transmits all sensor data to Firebase cloud database in real-time, enabling remote monitoring, historical data analysis, and trend tracking from anywhere.",
                  icon: Radio,
                },
                {
                  title: "Temperature Monitoring with LM35",
                  desc: "LM35 temperature sensor provides accurate fuel temperature readings, adding crucial context to fuel quality analysis and helping detect temperature-related fuel issues.",
                  icon: BarChart3,
                },
                {
                  title: "Embedded C Programming on ESP32",
                  desc: "Efficient embedded C code running on ESP32 microcontroller ensures fast sensor data processing, reliable WiFi communication, and responsive real-time display updates.",
                  icon: Cpu,
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group flex items-start gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="p-3 bg-orange-600/10 rounded-xl border border-orange-500/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="text-orange-400" size={24} />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Technologies Used */}
          <motion.section variants={slideInLeft}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
              <h2 className="text-3xl font-bold text-zinc-100">
                Technologies Used
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="relative group bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 rounded-2xl p-8 border border-zinc-800 hover:border-orange-500/50 overflow-hidden"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔧</span> Hardware & IoT
                </h3>
                <ul className="text-zinc-300 space-y-3">
                  {["ESP32 Microcontroller", "Turbidity Sensor", "YF-S201 Flow Sensor", "LM35 Temperature Sensor", "OLED Display Module"].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-orange-400">▸</span> {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className="relative group bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 rounded-2xl p-8 border border-zinc-800 hover:border-red-500/50 overflow-hidden"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💻</span> Software & Cloud
                </h3>
                <ul className="text-zinc-300 space-y-3">
                  {["Embedded C Programming", "Arduino IDE", "Firebase Realtime Database", "WiFi Communication Protocol", "OLED Display Library"].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-red-400">▸</span> {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.section>

          {/* Challenges & Solutions */}
          <motion.section variants={slideInRight}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
              <h2 className="text-3xl font-bold text-zinc-100">
                Problem Statement & Solutions
              </h2>
            </div>
            <div className="space-y-6">
              {[
                {
                  challenge: "Real-Time Fuel Quality & Quantity Monitoring",
                  problem: "Fuel adulteration is widespread and difficult to detect without specialized equipment. Vehicle owners need a reliable, affordable way to monitor both fuel quality and quantity in real-time.",
                  solution: "Developed an IoT device using ESP32, turbidity sensor, and YF-S201 flow sensor to continuously monitor fuel quality and measure quantity, with instant feedback via OLED display and cloud storage in Firebase.",
                },
                {
                  challenge: "Remote Data Access & Historical Analysis",
                  problem: "Traditional fuel monitoring systems lack remote access capabilities, making it impossible to track fuel data when away from the vehicle or analyze long-term consumption patterns.",
                  solution: "Integrated WiFi-enabled ESP32 with Firebase cloud database, enabling real-time data transmission, remote monitoring from anywhere, and comprehensive historical data analysis for trend detection.",
                },
                {
                  challenge: "Compact & Cost-Effective Implementation",
                  problem: "Existing fuel monitoring solutions are often bulky, expensive, and require complex installation, making them impractical for widespread adoption in regular vehicles.",
                  solution: "Designed a compact, cost-effective system using readily available components (ESP32, turbidity sensor, YF-S201, LM35, OLED) programmed in Embedded C, making it accessible and easy to install in any vehicle.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative group bg-zinc-900/40 rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors" />
                  <h3 className="text-xl font-semibold text-zinc-100 mb-3 flex items-center gap-2">
                    <span className="text-purple-400">⚡</span> Challenge: {item.challenge}
                  </h3>
                  <p className="text-zinc-400 mb-4 pl-7">{item.problem}</p>
                  <div className="pl-7">
                    <p className="text-zinc-300">
                      <strong className="text-green-400">Solution:</strong>{" "}
                      {item.solution}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Project Outcomes */}
          <motion.section variants={slideInLeft}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full" />
              <h2 className="text-3xl font-bold text-zinc-100">
                Project Outcomes & Impact
              </h2>
            </div>
            <motion.div
              className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 rounded-2xl p-8 border border-zinc-800"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 gap-4">
                {[
                  "✅ Successfully developed and tested functional IoT prototype with ESP32, turbidity sensor, YF-S201, and LM35",
                  "✅ Achieved real-time fuel quality and quantity monitoring with OLED display and Firebase cloud sync",
                  "✅ Patent application filed (REF No.: SURDC/P/25/09/750) for the innovative fuel monitoring system",
                  "✅ Demonstrated effective WiFi-based data transmission and cloud storage capabilities",
                  "✅ Created comprehensive project documentation including circuit diagrams and technical specifications",
                  "✅ Successfully presented to academic review committee as part of CSP390 PBL-4 curriculum",
                  "✅ Potential for commercial deployment in vehicles, fuel stations, and fleet management systems",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 text-zinc-300 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-2xl">{item.split(' ')[0]}</span>
                    <span>{item.substring(3)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.section>
        </div>

        {/* Back to Projects Button */}
        <motion.div
          className="mt-16 pt-8 border-t border-zinc-800"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => navigate("/#projects")}
            className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="group-hover:animate-pulse" />
            <span>Back to Projects</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
