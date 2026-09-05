import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Droplets,
  Activity,
  Radio,
  Power,
  Zap,
  Gauge,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export default function IoTVisualizer3D() {
  const [activeProject, setActiveProject] = useState("aquaminder");

  // Aqua Minder Simulated State
  const [waterLevel, setWaterLevel] = useState(72);
  const [pumpActive, setPumpActive] = useState(false);
  const [autoMode, setAutoMode] = useState(true);

  // Fuel Fatality Simulated State
  const [flowRate, setFlowRate] = useState(14.2); // Litres/min
  const [turbidity, setTurbidity] = useState(12); // NTU (lower = purer)
  const [temp, setTemp] = useState(28.4); // °C
  const [isSimulatingFlow, setIsSimulatingFlow] = useState(true);

  // Aqua Minder Water Loop
  useEffect(() => {
    if (!pumpActive) return;
    const interval = setInterval(() => {
      setWaterLevel((prev) => {
        if (prev >= 98) {
          if (autoMode) setPumpActive(false); // Auto cutoff
          return 98;
        }
        return Math.min(100, prev + 2);
      });
    }, 400);
    return () => clearInterval(interval);
  }, [pumpActive, autoMode]);

  // Fuel Fatality Jitter Loop
  useEffect(() => {
    if (!isSimulatingFlow) return;
    const interval = setInterval(() => {
      setFlowRate((prev) => {
        const jitter = (Math.random() - 0.5) * 0.8;
        return Math.max(0, +(prev + jitter).toFixed(1));
      });
      setTurbidity((prev) => {
        const jitter = (Math.random() - 0.5) * 0.5;
        return Math.max(5, +(prev + jitter).toFixed(1));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSimulatingFlow]);

  return (
    <section id="iot-visualizer" className="py-20 md:py-28 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center md:text-left mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
            <span>Hardware & Embedded Systems Telemetry</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Interactive IoT Device Simulator
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            Test real-time telemetry from my physical hardware projects. Microcontroller firmware in Embedded C communicates wirelessly with Firebase and interactive dashboards.
          </p>
        </div>

        {/* Project Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setActiveProject("aquaminder")}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeProject === "aquaminder"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                : "bg-white/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>Aqua Minder (Smart Tank IoT)</span>
          </button>

          <button
            onClick={() => setActiveProject("fuel-fatality")}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeProject === "fuel-fatality"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/20"
                : "bg-white/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>Fuel Fatality (Turbidity & Flow)</span>
          </button>
        </div>

        {/* Interactive Telemetry Console Card */}
        <div className="rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {/* Animated Background Mesh Grid */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Top Telemetry Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500 font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    ESP32 Node MCU v1.0
                  </h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  MAC: 24:0A:C4:8E:1F:B0 • PROTOCOL: MQTT/WIFI • LATENCY: 24ms
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
              <Activity className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
              <span>LIVE TELEMETRY STREAM</span>
            </div>
          </div>

          {/* SIMULATOR BODY */}
          {activeProject === "aquaminder" ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left: 3D Water Tank Visualizer */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-48 sm:w-56 h-72 rounded-3xl border-4 border-cyan-500/40 bg-cyan-950/20 p-2 shadow-inner overflow-hidden flex flex-col justify-end backdrop-blur-md">
                  {/* Measurement tick marks */}
                  <div className="absolute top-4 left-3 space-y-7 text-[10px] font-mono text-cyan-400/70 select-none pointer-events-none">
                    <div>— 1000L</div>
                    <div>— 750L</div>
                    <div>— 500L</div>
                    <div>— 250L</div>
                  </div>

                  {/* Dynamic Water Column */}
                  <motion.div
                    className="w-full rounded-b-2xl relative overflow-hidden bg-gradient-to-t from-blue-600 via-cyan-500 to-sky-400"
                    initial={{ height: "0%" }}
                    animate={{ height: `${waterLevel}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  >
                    {/* Animated water surface wave */}
                    <div className="absolute -top-3 left-0 right-0 h-6 bg-sky-200/50 blur-xs animate-pulse" />
                  </motion.div>

                  {/* Live Percentage HUD */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-4xl font-black text-white drop-shadow-md font-mono">
                      {waterLevel}%
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-white/90 drop-shadow">
                      {Math.round((waterLevel / 100) * 1000)} Litres
                    </span>
                  </div>
                </div>

                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-3">
                  Ultrasonic HC-SR04 Sensor: {Math.max(4, 100 - waterLevel)}cm air gap
                </span>
              </div>

              {/* Right: Controls & Diagnostics */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80">
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 block mb-1">
                      RELAY STATE
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          pumpActive ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"
                        }`}
                      />
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        {pumpActive ? "PUMP RUNNING" : "PUMP IDLE"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80">
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 block mb-1">
                      TANK STATUS
                    </span>
                    <span
                      className={`font-bold text-sm ${
                        waterLevel > 90
                          ? "text-emerald-500"
                          : waterLevel < 25
                          ? "text-amber-500"
                          : "text-cyan-500"
                      }`}
                    >
                      {waterLevel > 90 ? "Full" : waterLevel < 25 ? "Low Level" : "Optimal"}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80">
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 block mb-1">
                      SAFETY SYSTEM
                    </span>
                    <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-sm">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Dry-Run Safe</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Simulation Controls */}
                <div className="p-5 rounded-2xl bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        Motor Relay Override
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Trigger 220V optocoupler relay to activate water intake
                      </p>
                    </div>

                    <button
                      onClick={() => setPumpActive(!pumpActive)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        pumpActive
                          ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                          : "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>{pumpActive ? "STOP PUMP" : "START PUMP"}</span>
                    </button>
                  </div>

                  {/* Manual Slider for Demo */}
                  <div>
                    <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                      <span>Simulate Manual Tank Level</span>
                      <span className="font-mono">{waterLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={waterLevel}
                      onChange={(e) => setWaterLevel(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left: Sensor Metrics Grid */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between text-amber-500 mb-2">
                    <Gauge className="w-5 h-5" />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      YF-S201
                    </span>
                  </div>
                  <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100 font-mono">
                    {flowRate}
                    <span className="text-sm font-normal text-zinc-500 ml-1">L/min</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Hall Effect Flow Rate
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between text-emerald-500 mb-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      OPTICAL
                    </span>
                  </div>
                  <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100 font-mono">
                    {turbidity}
                    <span className="text-sm font-normal text-zinc-500 ml-1">NTU</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Fuel Purity Index (High Quality)
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between text-rose-500 mb-2">
                    <Thermometer className="w-5 h-5" />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                      LM35
                    </span>
                  </div>
                  <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100 font-mono">
                    {temp}
                    <span className="text-sm font-normal text-zinc-500 ml-1">°C</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Liquid Core Temperature
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between text-purple-500 mb-2">
                    <Zap className="w-5 h-5" />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                      OLED
                    </span>
                  </div>
                  <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100 font-mono">
                    SSD1306
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    I2C 0.96" Monochromatic
                  </p>
                </div>
              </div>

              {/* Right: Architecture & Hardware Pipeline */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-5 rounded-2xl bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Real-time Adulteration & Volume Detection</span>
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    Fuel Fatality continuously monitors light refraction via analog turbidity phototransistors to catch illegal fuel adulteration (kerosene/water blending) before it damages combustion engines.
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsSimulatingFlow(!isSimulatingFlow)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition-all cursor-pointer shadow"
                    >
                      {isSimulatingFlow ? "PAUSE SIMULATION" : "RESUME TELEMETRY"}
                    </button>
                    <a
                      href="/projects/fuel-fatality"
                      className="px-4 py-2 rounded-xl text-xs font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                    >
                      Full Case Study →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
