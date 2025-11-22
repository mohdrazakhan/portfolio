import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Server, Droplet, Zap, Smartphone, BarChart3, CheckCircle2, Shield, FileText, Users, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

export default function AquaMinderDetail() {
  const navigate = useNavigate();
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  // Demo images for slideshow (replace with actual project screenshots)
  const demoImages = [
    { url: "/asset/AquaMinder/loginpage.png", title: "Login Page", desc: "Secure login for Aqua Minder dashboard" },
    { url: "/asset/AquaMinder/dashboard.png", title: "Dashboard Overview", desc: "Real-time water level and motor status" },
    { url: "/asset/AquaMinder/database.png", title: "Database Integration", desc: "Cloud database for storing water usage data" },
  ];
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % demoImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + demoImages.length) % demoImages.length);
  // Animation variants
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };
  const scaleVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } } };
  const slideInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const slideInRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  return (
    <motion.div className="min-h-screen py-20 md:py-28" initial="hidden" animate="visible" variants={containerVariants}>
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
          className="relative mb-12 rounded-3xl p-8 md:p-12 bg-gradient-to-br from-cyan-600/20 via-blue-500/10 to-indigo-500/10 border border-cyan-500/30 overflow-hidden"
          variants={scaleVariants}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="relative z-10">
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4"
              variants={itemVariants}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Droplet className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-cyan-300 drop-shadow-xl rounded-full" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-lg"
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-center sm:text-left">
                Aqua Minder
              </h1>
            </motion.div>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-zinc-300 mb-6 max-w-3xl text-center sm:text-left"
              variants={itemVariants}
            >
              Smart IoT-based water management system for homes and buildings
            </motion.p>
            {/* Tags with hover animations */}
            <motion.div className="flex flex-wrap gap-2 sm:gap-3 mb-8 justify-center sm:justify-start" variants={itemVariants}>
              {["IoT", "ESP32", "React", "Firebase", "Automation"].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-900/60 backdrop-blur-sm text-zinc-200 text-xs sm:text-sm font-medium border border-zinc-700/50"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(34, 211, 238, 0.2)", borderColor: "rgba(34, 211, 238, 0.5)" }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
            {/* Action Buttons */}
            <motion.div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4" variants={itemVariants}>
              <motion.a
                href="https://aqua-minder.vercel.app/"
                className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl transition font-medium shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 text-sm sm:text-base"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={18} className="group-hover:animate-spin" />
                View Live Demo
              </motion.a>
              <motion.a
                href="https://github.com/mohdrazakhan/AquaMinder"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-zinc-700 hover:border-cyan-500 hover:bg-zinc-800/50 text-zinc-200 rounded-xl transition font-medium backdrop-blur-sm text-center text-sm sm:text-base"
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
        <motion.section className="mb-16" variants={scaleVariants}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            <h2 className="text-3xl font-bold text-zinc-100">App Screenshots & Demo</h2>
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
                    onError={(e) => { e.target.src = "/public/asset/AquaMinder/dashboard.png"; }}
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
                      ? "border-cyan-500 scale-110"
                      : "border-zinc-700 hover:border-zinc-500"
                  }`}
                  whileHover={{ scale: currentSlide === index ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "/public/asset/AquaMinder/loginpage.png"; }}
                  />
                  {currentSlide === index && (
                    <div className="absolute inset-0 bg-cyan-500/20 border-2 border-cyan-400" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How It Works - System Flow */}
        <motion.section className="mb-16" variants={scaleVariants}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            <h2 className="text-3xl font-bold text-zinc-100">How Aqua Minder Works</h2>
          </div>
          <div className="bg-zinc-900/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-zinc-800">
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
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-cyan-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  1
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">Install Device & Connect Sensors</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    Aqua Minder device is installed on the water tank and connected to ultrasonic/float sensors for accurate water level detection.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <span className="px-2 sm:px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs sm:text-sm">ESP32</span>
                    <span className="px-2 sm:px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-xs sm:text-sm">Ultrasonic Sensor</span>
                    <span className="px-2 sm:px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-xs sm:text-sm">Float Sensor</span>
                    <span className="px-2 sm:px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-xs sm:text-sm">Float Sensor</span>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Server className="text-cyan-400" size={32} />
                </motion.div>
              </motion.div>
              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className="text-cyan-400 rotate-90" size={24} />
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
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-blue-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  2
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">Connect to WiFi & Dashboard</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    Device connects to home/building WiFi and is configured via a user-friendly dashboard (mobile/web).
                  </p>
                  <div className="p-3 sm:p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <p className="text-blue-300 text-xs sm:text-sm">🔔 Device online - Dashboard ready</p>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Smartphone className="text-blue-400" size={32} />
                </motion.div>
              </motion.div>
              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  <ChevronRight className="text-blue-400 rotate-90" size={32} />
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
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-indigo-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  3
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">Monitor & Automate Motor Control</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    Aqua Minder monitors water level and motor status in real time, automatically turning motor ON/OFF to prevent overflow or dry running.
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg text-center">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Water Level</p>
                      <p className="text-cyan-400 font-semibold text-xs sm:text-sm">● Full</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg text-center">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Motor Status</p>
                      <p className="text-blue-400 font-semibold text-xs sm:text-sm">● OFF</p>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="text-indigo-400" size={32} />
                </motion.div>
              </motion.div>
              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                >
                  <ChevronRight className="text-indigo-400 rotate-90" size={24} />
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
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-cyan-600 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-cyan-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  4
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">Notifications & Insights</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    Users receive instant notifications on dashboard/mobile when water level is low, tank is full, or motor needs attention. Usage analytics help save water and electricity.
                  </p>
                  <div className="flex items-center gap-2 p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <CheckCircle2 className="text-green-400 flex-shrink-0" size={20} />
                    <p className="text-green-300 text-xs sm:text-sm">Peace of mind & efficiency!</p>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <BarChart3 className="text-green-400" size={32} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Key Features */}
        <motion.section variants={slideInRight}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            <h2 className="text-3xl font-bold text-zinc-100">Key Features</h2>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "Automatic Motor Control",
                desc: "Turns motor ON/OFF based on water level, preventing overflow and dry running.",
                icon: Zap,
              },
              {
                title: "Real-Time Monitoring",
                desc: "Dashboard shows live water level, motor status, and usage analytics.",
                icon: BarChart3,
              },
              {
                title: "Instant Notifications",
                desc: "Alerts for low water, tank full, or motor issues via mobile/web dashboard.",
                icon: Smartphone,
              },
              {
                title: "Easy Installation",
                desc: "Works with normal and high-power motors, simple setup for any tank.",
                icon: Server,
              },
              {
                title: "Secure & Reliable",
                desc: "Data protected with secure backend, robust hardware for long-term use.",
                icon: Shield,
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group flex items-start gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-cyan-500/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="p-3 bg-cyan-600/10 rounded-xl border border-cyan-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="text-cyan-400" size={24} />
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
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            <h2 className="text-3xl font-bold text-zinc-100">Technologies Used</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="relative group bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 rounded-2xl p-8 border border-zinc-800 hover:border-cyan-500/50 overflow-hidden"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                <span className="text-2xl">🔌</span> Hardware & Sensors
              </h3>
              <ul className="text-zinc-300 space-y-3">
                {["ESP32/ESP8266 microcontroller", "Ultrasonic/float sensors", "Relay module for motor control", "Power supply & enclosure", "MQTT/REST API connectivity"].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-cyan-400">▸</span> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="relative group bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 rounded-2xl p-8 border border-zinc-800 hover:border-blue-500/50 overflow-hidden"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                <span className="text-2xl">🖥️</span> Software & Dashboard
              </h3>
              <ul className="text-zinc-300 space-y-3">
                {["React (dashboard)", "Firebase/Node.js backend", "Real-time monitoring UI", "Mobile/web dashboard", "Usage analytics & notifications"].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-blue-400">▸</span> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Roadmap & Status */}
        <motion.section variants={slideInLeft}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full" />
            <h2 className="text-3xl font-bold text-zinc-100">Project Status & Roadmap</h2>
          </div>
          <motion.div
            className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 rounded-2xl p-8 border border-zinc-800 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-green-400 mb-4">✅ Completed Milestones</h3>
            <div className="grid grid-cols-1 gap-4">
              {["Hardware prototype assembled & tested", "Sensor integration completed", "Basic dashboard UI built", "Motor control automation working", "Initial analytics implemented"].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-zinc-300 p-3 rounded-lg bg-green-500/5 border border-green-500/20"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-green-400 text-xl">✓</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 rounded-2xl p-8 border border-zinc-800"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-4">🚀 Upcoming Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Advanced analytics dashboard", "Mobile app development", "Cloud integration for remote access", "Beta testing with users", "Production hardware design", "Expanded notification features", "Integration with smart home systems", "User feedback & improvements"].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-zinc-300 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-green-400 text-xl">✨</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

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
