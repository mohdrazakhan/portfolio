// src/pages/OptiRiderDetail.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, MapPin, TrendingUp, Clock, CheckCircle2, Sparkles, FileText, Award, Users, Smartphone, Server, ArrowRight, RefreshCw, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OptiRiderDetail() {
  const navigate = useNavigate();

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Demo images for slideshow (replace these with actual project screenshots)
  const demoImages = [
    { url: "/images/optirider-demo-1.png", title: "Dashboard Overview", desc: "Unified earnings and performance dashboard" },
    { url: "/images/optirider-demo-2.png", title: "Status Sync", desc: "Automatic status synchronization across platforms" },
    { url: "/images/optirider-demo-3.png", title: "Route Optimization", desc: "AI-powered route suggestions" },
    { url: "/images/optirider-demo-4.png", title: "Analytics", desc: "Real-time performance analytics" },
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
          className="relative mb-12 rounded-3xl p-8 md:p-12 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 border border-indigo-500/30 overflow-hidden"
          variants={scaleVariants}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
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
              className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
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
                <img 
                  src="/asset/optirider/optirider_logo.png" 
                  alt="OptiRider Logo" 
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-xl rounded-full"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-lg"
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-center sm:text-left">
                Opti-Rider
              </h1>
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-zinc-300 mb-6 max-w-3xl text-center sm:text-left"
              variants={itemVariants}
            >
              Smart Ride Optimization and Earnings Management for Delivery Riders
            </motion.p>

            {/* Tags with hover animations */}
            <motion.div className="flex flex-wrap gap-2 sm:gap-3 mb-8 justify-center sm:justify-start" variants={itemVariants}>
              {["React Native", "Node.js", "MongoDB", "Socket.io", "AI/ML", "REST API", "Flutter"].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-900/60 backdrop-blur-sm text-zinc-200 text-xs sm:text-sm font-medium border border-zinc-700/50"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(99, 102, 241, 0.2)",
                    borderColor: "rgba(99, 102, 241, 0.5)",
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
                    Patent Published Innovation
                  </p>
                  <p className="text-zinc-400 text-xs sm:text-sm">This project idea is protected by a published patent</p>
                </div>
                <motion.a
                  href="/asset/patent_publish.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 hover:border-amber-500/50 text-amber-200 rounded-lg transition font-medium text-sm whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText size={16} />
                  View Patent
                </motion.a>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4" variants={itemVariants}>
              <motion.a
                href="#"
                className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition font-medium shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 text-sm sm:text-base"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={18} className="group-hover:animate-spin" />
                View Live Demo
              </motion.a>
              <motion.a
                href="https://github.com/mohdrazakhan/OptiRider-Multi-Platform-Delivery-Management-App"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-zinc-700 hover:border-indigo-500 hover:bg-zinc-800/50 text-zinc-200 rounded-xl transition font-medium backdrop-blur-sm text-center text-sm sm:text-base"
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
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      e.target.src = "/images/optirider.png";
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
                      ? "border-indigo-500 scale-110"
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
                      e.target.src = "/images/optirider.png";
                    }}
                  />
                  {currentSlide === index && (
                    <div className="absolute inset-0 bg-indigo-500/20 border-2 border-indigo-400" />
                  )}
                </motion.button>
              ))}
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
            <h2 className="text-3xl font-bold text-zinc-100">How OptiRider Works</h2>
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
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-indigo-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  1
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">Rider Links Platform Accounts</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    Delivery rider connects their accounts from multiple platforms (Zomato, Swiggy, Blinkit, Ola, etc.) 
                    to OptiRider through secure authentication and API integration.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <span className="px-2 sm:px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-xs sm:text-sm">Zomato</span>
                    <span className="px-2 sm:px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-300 text-xs sm:text-sm">Swiggy</span>
                    <span className="px-2 sm:px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-300 text-xs sm:text-sm">Blinkit</span>
                    <span className="px-2 sm:px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-300 text-xs sm:text-sm">Ola</span>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Users className="text-indigo-400" size={32} />
                </motion.div>
              </motion.div>

              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="text-indigo-400 rotate-90" size={24} />
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
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-purple-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  2
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">Rider Accepts Order on Any Platform</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    When the rider receives and accepts an order on any one of the linked platforms, 
                    OptiRider's intelligent system instantly detects this action.
                  </p>
                  <div className="p-3 sm:p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                    <p className="text-purple-300 text-xs sm:text-sm">🔔 Order detected on Swiggy - Auto-sync initiated</p>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Smartphone className="text-purple-400" size={32} />
                </motion.div>
              </motion.div>

              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  <ArrowRight className="text-purple-400 rotate-90" size={32} />
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
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-600 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-pink-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  3
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">Automatic Status Synchronization</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    OptiRider automatically communicates with all other linked platforms via APIs and sets 
                    the rider's status to "Busy" or "Offline" - completely eliminating manual intervention.
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg text-center">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Zomato</p>
                      <p className="text-orange-400 font-semibold text-xs sm:text-sm">● Busy</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg text-center">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Blinkit</p>
                      <p className="text-orange-400 font-semibold text-xs sm:text-sm">● Busy</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg text-center">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Ola</p>
                      <p className="text-orange-400 font-semibold text-xs sm:text-sm">● Busy</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Swiggy</p>
                      <p className="text-green-400 font-semibold text-xs sm:text-sm">✓ Active</p>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="text-pink-400" size={32} />
                </motion.div>
              </motion.div>

              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                >
                  <ArrowRight className="text-orange-400 rotate-90" size={24} />
                  <ArrowRight className="text-orange-400 rotate-90" size={32} />
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
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-600 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-orange-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  4
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">Delivery Completion & Re-activation</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    Once the delivery is completed, OptiRider automatically sets the rider back to "Available" 
                    on all platforms, allowing them to receive new orders without any manual action.
                  </p>
                  <div className="flex items-center gap-2 p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <CheckCircle2 className="text-green-400 flex-shrink-0" size={20} />
                    <p className="text-green-300 text-xs sm:text-sm">All platforms reactivated - Ready for new orders!</p>
                  </div>
                </div>
                <motion.div
                  className="hidden md:block p-3 md:p-4 bg-zinc-800/30 rounded-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle2 className="text-green-400" size={32} />
                </motion.div>
              </motion.div>

              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
                >
                  <ArrowRight className="text-green-400 rotate-90" size={24} />
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
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-green-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  5
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-2">AI Analytics & Optimization</h3>
                  <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    Throughout the day, OptiRider tracks earnings, analyzes performance, suggests optimal 
                    working zones and times, and provides route optimization for maximum efficiency.
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Today's Earnings</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-400">₹1,850</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg">
                      <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">Deliveries</p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-400">12</p>
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

        {/* System Architecture Flowchart */}
        <motion.section
          className="mb-16"
          variants={scaleVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
            <h2 className="text-3xl font-bold text-zinc-100">System Architecture</h2>
          </div>

          <div className="bg-zinc-900/40 rounded-3xl p-8 border border-zinc-800 overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Architecture Diagram */}
              <div className="flex flex-col items-center gap-8">
                {/* Top Layer - Delivery Platforms */}
                <div className="w-full">
                  <h3 className="text-center text-zinc-400 mb-4 font-semibold">Third-Party Delivery Platforms</h3>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {["Zomato", "Swiggy", "Blinkit", "Ola", "Others"].map((platform, index) => (
                      <motion.div
                        key={platform}
                        className="px-6 py-4 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl border border-zinc-700 shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, borderColor: "#6366f1" }}
                      >
                        <p className="text-zinc-100 font-semibold">{platform}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Arrows Down */}
                <div className="flex justify-center gap-8">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    >
                      <ArrowRight className="text-indigo-400 rotate-90" size={28} />
                    </motion.div>
                  ))}
                </div>

                {/* Middle Layer - API Integration */}
                <motion.div
                  className="w-full max-w-2xl p-6 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl border border-indigo-500/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Server className="text-indigo-400" size={32} />
                    <h3 className="text-xl font-bold text-zinc-100">API Integration Layer</h3>
                  </div>
                  <p className="text-center text-zinc-400 text-sm">
                    REST APIs • WebSockets • Web Scraping • Authentication
                  </p>
                </motion.div>

                {/* Arrows Down */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <RefreshCw className="text-purple-400" size={32} />
                </motion.div>

                {/* Backend Layer */}
                <motion.div
                  className="w-full max-w-3xl p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-500/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-bold text-zinc-100 text-center mb-4">OptiRider Backend Server</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-zinc-800/50 rounded-lg text-center">
                      <p className="text-purple-400 text-sm font-semibold">Node.js</p>
                    </div>
                    <div className="p-3 bg-zinc-800/50 rounded-lg text-center">
                      <p className="text-purple-400 text-sm font-semibold">Express</p>
                    </div>
                    <div className="p-3 bg-zinc-800/50 rounded-lg text-center">
                      <p className="text-purple-400 text-sm font-semibold">MongoDB</p>
                    </div>
                    <div className="p-3 bg-zinc-800/50 rounded-lg text-center">
                      <p className="text-purple-400 text-sm font-semibold">Socket.io</p>
                    </div>
                  </div>
                </motion.div>

                {/* Arrows Down */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  <ArrowRight className="text-pink-400 rotate-90" size={32} />
                </motion.div>

                {/* Mobile App Layer */}
                <motion.div
                  className="w-full max-w-xl p-6 bg-gradient-to-br from-pink-600/20 to-orange-600/20 rounded-2xl border border-pink-500/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Smartphone className="text-pink-400" size={32} />
                    <h3 className="text-xl font-bold text-zinc-100">OptiRider Mobile App</h3>
                  </div>
                  <p className="text-center text-zinc-400 text-sm">
                    React Native / Flutter • Cross-Platform (iOS & Android)
                  </p>
                </motion.div>

                {/* Arrows Down */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                >
                  <ArrowRight className="text-orange-400 rotate-90" size={32} />
                </motion.div>

                {/* Bottom Layer - End User */}
                <motion.div
                  className="p-8 bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-2xl border border-green-500/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Users className="text-green-400" size={40} />
                    <div>
                      <h3 className="text-2xl font-bold text-zinc-100">Delivery Rider</h3>
                      <p className="text-zinc-400">Maximized Earnings • Reduced Stress • Better Productivity</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          variants={containerVariants}
        >
          {[
            { icon: Zap, label: "Platforms Supported", value: "5+" },
            { icon: Clock, label: "Time Saved Daily", value: "2hrs" },
            { icon: TrendingUp, label: "Earnings Boost", value: "+40%" },
            { icon: CheckCircle2, label: "Patent On 17/10/2025", value: "Published" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group p-6 rounded-2xl bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-300 overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <stat.icon className="text-indigo-400 mb-3 group-hover:scale-110 transition-transform" size={28} />
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
              <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
              <h2 className="text-3xl font-bold text-zinc-100">Overview</h2>
            </div>
            <div className="space-y-4 text-zinc-300 leading-relaxed bg-zinc-900/40 rounded-2xl p-8 border border-zinc-800">
              <p>
                OptiRider is a comprehensive mobile application designed to solve critical operational challenges 
                faced by delivery riders in the gig economy. The platform addresses a major inefficiency: riders 
                working across multiple delivery platforms (Zomato, Swiggy, Blinkit, Ola, etc.) must manually toggle 
                their availability status on each app when accepting orders, leading to missed opportunities, 
                double-booking penalties, and increased stress.
              </p>
              <p>
                This intelligent system acts as a unified assistant that automatically synchronizes rider status 
                across all linked platforms, provides AI-powered earnings analytics, suggests optimal working times 
                and locations, and offers route optimization to maximize productivity and income while reducing 
                cognitive load and battery drain.
              </p>
              <p className="text-amber-300 font-semibold">
                🏆 Patent Filed: Application No. 202511081251 - "System and Method for Cross-Platform Availability 
                and Task Aggregation Management"
              </p>
            </div>
          </motion.section>

          {/* Key Features */}
          <motion.section variants={slideInRight}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              <h2 className="text-3xl font-bold text-zinc-100">Key Features</h2>
            </div>
            <div className="grid gap-4">
              {[
                {
                  title: "Automated Status Synchronization",
                  desc: "Intelligent algorithm automatically updates rider availability across all linked platforms (Zomato, Swiggy, Blinkit, etc.) when accepting or completing orders, eliminating manual toggling and preventing double-booking.",
                  icon: Zap,
                },
                {
                  title: "Unified Earnings Dashboard",
                  desc: "Single, comprehensive view to track real-time income and expenditures from all platforms with visual analytics, helping riders with financial planning and performance monitoring.",
                  icon: TrendingUp,
                },
                {
                  title: "AI-Powered Smart Suggestions",
                  desc: "Predictive analytics recommend optimal working times and high-demand zones based on historical data patterns, maximizing earning potential throughout the day.",
                  icon: Sparkles,
                },
                {
                  title: "Intelligent Route Optimization",
                  desc: "Integration with mapping APIs to suggest the most efficient delivery routes, factoring in real-time traffic conditions to save time, fuel, and increase deliveries per hour.",
                  icon: MapPin,
                },
                {
                  title: "Centralized Order Management",
                  desc: "Unified interface to view, manage, and track orders from all linked delivery platforms in one place, reducing app-switching and cognitive load.",
                  icon: CheckCircle2,
                },
                {
                  title: "Performance & Wellness Tracking",
                  desc: "Monitor work hours, delivery count, fatigue levels, and performance metrics to promote healthier work-life balance and sustainable productivity.",
                  icon: Clock,
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group flex items-start gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="p-3 bg-indigo-600/10 rounded-xl border border-indigo-500/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="text-indigo-400" size={24} />
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
              <div className="h-1 w-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full" />
              <h2 className="text-3xl font-bold text-zinc-100">
                Technologies Used
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="relative group bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 rounded-2xl p-8 border border-zinc-800 hover:border-indigo-500/50 overflow-hidden"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📱</span> Mobile App
                </h3>
                <ul className="text-zinc-300 space-y-3">
                  {["React Native / Flutter", "Cross-platform (iOS & Android)", "Real-time status updates", "Material Design UI/UX", "Location services integration"].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-indigo-400">▸</span> {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className="relative group bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 overflow-hidden"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚙️</span> Backend & Infrastructure
                </h3>
                <ul className="text-zinc-300 space-y-3">
                  {["Node.js with Express.js", "MongoDB / Firebase/Firestore", "Socket.io for real-time sync", "REST API architecture", "API integration & web scraping"].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-purple-400">▸</span> {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.section>

          {/* Challenges & Solutions */}
          <motion.section variants={slideInRight}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
              <h2 className="text-3xl font-bold text-zinc-100">
                Problem Statement & Solutions
              </h2>
            </div>
            <div className="space-y-6">
              {[
                {
                  challenge: "Manual Status Management Across Multiple Platforms",
                  problem: "Delivery riders using multiple apps (Zomato, Swiggy, Blinkit, Ola, etc.) must manually toggle their availability on each platform when accepting orders. This leads to stress, missed opportunities, double-booking penalties, cognitive overload, and battery drain.",
                  solution: "Developed an intelligent status synchronization algorithm that automatically communicates with all linked platforms, setting the rider to 'busy' when accepting an order and 'available' upon completion—completely eliminating manual intervention.",
                },
                {
                  challenge: "Lack of Unified Earnings & Performance Insights",
                  problem: "Riders have no centralized tool to track total income across platforms, analyze their performance, or identify peak earning opportunities. This makes financial planning and strategic decision-making extremely difficult.",
                  solution: "Created a comprehensive earnings dashboard with AI-powered predictive analytics that aggregates data from all platforms, visualizes performance metrics, and provides smart recommendations for optimal working times and high-demand zones.",
                },
                {
                  challenge: "Inefficient Route Planning & Time Wastage",
                  problem: "Without intelligent route guidance, riders waste valuable time and fuel on suboptimal paths, reducing deliveries per hour and overall earnings potential.",
                  solution: "Integrated real-time mapping APIs with traffic-aware route optimization algorithms that suggest the most efficient paths, saving time, fuel costs, and increasing daily delivery capacity.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative group bg-zinc-900/40 rounded-2xl p-8 border border-zinc-800 hover:border-orange-500/50 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors" />
                  <h3 className="text-xl font-semibold text-zinc-100 mb-3 flex items-center gap-2">
                    <span className="text-orange-400">⚡</span> Challenge: {item.challenge}
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

          {/* Future Enhancements */}
          <motion.section variants={slideInLeft}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full" />
              <h2 className="text-3xl font-bold text-zinc-100">
                Project Status & Roadmap
              </h2>
            </div>
            <motion.div
              className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 rounded-2xl p-8 border border-zinc-800 mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-green-400 mb-4">✅ Completed Milestones (As of September 2025)</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "Patent Application Filed (No. 202511081251) - 'System and Method for Cross-Platform Availability and Task Aggregation Management'",
                  "Pre-implementation IEEE research paper completed and formatted",
                  "UI/UX design phase completed (Splash, Welcome, Login, Signup screens designed)",
                  "Color theme and navigation flow approved by project mentor",
                  "Technical architecture and technology stack finalized",
                ].map((item, index) => (
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
                {[
                  "Complete mobile app development (React Native/Flutter)",
                  "Implement automated status synchronization system",
                  "Develop AI-powered earnings analytics dashboard",
                  "Integrate with major delivery platforms (API/Web scraping)",
                  "Beta testing with real delivery riders",
                  "Post-launch research paper analyzing real-world impact",
                  "Scale to support additional gig economy platforms",
                  "Advanced ML models for demand prediction",
                ].map((item, index) => (
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
