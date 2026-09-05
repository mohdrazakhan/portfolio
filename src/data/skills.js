// src/data/skills.js

export const skillCategories = [
  { id: "all", label: "All Skills" },
  { id: "web", label: "Full-Stack Web" },
  { id: "mobile", label: "Mobile Dev" },
  { id: "iot", label: "IoT & Hardware" },
  { id: "core", label: "Core & DSA" },
  { id: "tools", label: "Cloud & DevOps" },
];

export const skillsList = [
  // Full-Stack Web
  {
    name: "React",
    category: "web",
    level: "Advanced",
    pct: 88,
    color: "#61DAFB",
    badge: "Frontend Core",
    desc: "Single Page Apps, modern hooks, state management, Three.js 3D integration, performance.",
  },
  {
    name: "JavaScript (ES6+)",
    category: "web",
    level: "Intermediate",
    pct: 82,
    color: "#F7DF1E",
    badge: "Language",
    desc: "Async programming, event loops, DOM manipulation, REST APIs, WebSockets.",
  },
  {
    name: "Node.js",
    category: "web",
    level: "Intermediate",
    pct: 75,
    color: "#68A063",
    badge: "Backend",
    desc: "Express server architectures, RESTful API endpoints, middleware, authentication.",
  },
  {
    name: "HTML5 & Modern CSS",
    category: "web",
    level: "Advanced",
    pct: 90,
    color: "#E34F26",
    badge: "Layout & Design",
    desc: "Semantic HTML5, CSS Grid/Flexbox, responsive design, fluid typography, animations.",
  },
  {
    name: "Tailwind CSS",
    category: "web",
    level: "Advanced",
    pct: 92,
    color: "#38BDF8",
    badge: "Styling",
    desc: "Rapid UI prototyping, custom themes, dark-mode styling, glassmorphism UI.",
  },

  // Mobile Dev
  {
    name: "Flutter",
    category: "mobile",
    level: "Intermediate",
    pct: 78,
    color: "#02569B",
    badge: "Cross-Platform",
    desc: "Stateful widgets, state management (Provider/Bloc), custom UI, Material 3 design.",
  },
  {
    name: "Dart",
    category: "mobile",
    level: "Intermediate",
    pct: 75,
    color: "#00B4AB",
    badge: "Language",
    desc: "Object-oriented mobile architectures, reactive streams, asynchronous tasks.",
  },

  // IoT & Embedded
  {
    name: "ESP32 & Microcontrollers",
    category: "iot",
    level: "Advanced",
    pct: 92,
    color: "#E7352C",
    badge: "Hardware",
    desc: "Dual-core ESP32, WiFi/BLE telemetry, GPIO control, ADC sensor reading, deep sleep power management.",
  },
  {
    name: "IoT Sensors & Relays",
    category: "iot",
    level: "Advanced",
    pct: 90,
    color: "#10B981",
    badge: "Automation",
    desc: "Turbidity sensors, YF-S201 flow sensors, ultrasonic distance, LM35 temp, high-voltage motor relays.",
  },
  {
    name: "Embedded C / Arduino",
    category: "iot",
    level: "Intermediate",
    pct: 80,
    color: "#00979D",
    badge: "Firmware",
    desc: "Hardware interrupts, SPI/I2C communication, non-blocking timers, serial debugging.",
  },

  // Core & Algorithms
  {
    name: "Java",
    category: "core",
    level: "Advanced",
    pct: 90,
    color: "#ED8B00",
    badge: "Core Language",
    desc: "Object-oriented programming, design patterns, multi-threading, JVM architecture.",
  },
  {
    name: "Data Structures & Algorithms",
    category: "core",
    level: "Intermediate",
    pct: 75,
    color: "#8B5CF6",
    badge: "Problem Solving",
    desc: "Arrays, Trees, Graphs, Dynamic Programming, sorting & searching algorithms, time/space complexity.",
  },
  {
    name: "Python",
    category: "core",
    level: "Intermediate",
    pct: 68,
    color: "#3776AB",
    badge: "Scripting & Data",
    desc: "Automation scripting, data parsing, machine learning fundamentals, backend scripting.",
  },
  {
    name: "C Programming",
    category: "core",
    level: "Intermediate",
    pct: 70,
    color: "#A8B9CC",
    badge: "Systems",
    desc: "Pointers, dynamic memory management, low-level system interactions.",
  },

  // Tools & Cloud
  {
    name: "Firebase",
    category: "tools",
    level: "Advanced",
    pct: 88,
    color: "#FFCA28",
    badge: "BaaS & Realtime",
    desc: "Firestore realtime listeners, Firebase Authentication, Cloud Storage, Security Rules.",
  },
  {
    name: "Git & GitHub",
    category: "tools",
    level: "Intermediate",
    pct: 85,
    color: "#F05032",
    badge: "Version Control",
    desc: "Branching strategies, PR reviews, merge conflict resolution, GitHub Actions CI/CD.",
  },
  {
    name: "Vite & Tooling",
    category: "tools",
    level: "Advanced",
    pct: 86,
    color: "#646CFF",
    badge: "Build Pipeline",
    desc: "Lightning-fast HMR, Rollup optimizations, bundle analysis, modern web toolchains.",
  },
];

// Provide default array of names for backward compatibility with components expecting string[]
const skills = skillsList.map((s) => s.name);
export default skills;