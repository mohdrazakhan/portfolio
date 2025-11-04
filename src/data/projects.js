// src/data/projects.js
const projects = [
  {
    id: "roommate-manager",
    title: "One Room — Roommate Life Manager",
    short: "All‑in‑one roommate app: expenses, tasks, chat, reminders.",
    description:
      "Flutter + Firebase app to manage shared living: smart expense splits, chores, rich chat, and secure data with Firestore rules.",
    tags: ["Flutter", "Firebase", "Material 3"],
    image: "/images/roommate.png",
    demo: "/projects/one-room",
    repo: "https://github.com/mohdrazakhan/oneRoom---Roommate-management-application.git",
  },
  {
    id: "optirider",
    title: "OptiRider (Concept)",
    short: "Delivery routing concept with optimized ETA visualization.",
    description:
      "Experiment showing route optimization and visual ETA improvements using D3 + Mapbox. Great for logistics demos and prototypes.",
    tags: ["D3", "Mapbox", "Prototype"],
    image: "/images/optirider.png",
    demo: "#",
    repo: "#",
  },
  {
    id: "fuel-fatality",
    title: "Fuel Fadality",
    short: "IoT-based fuel quality monitoring with ESP32 and Firebase.",
    description:
      "Real-time fuel quality and quantity monitoring system using ESP32, turbidity sensor, YF-S201 flow sensor, and LM35 with Firebase cloud integration and OLED display.",
    tags: ["ESP32", "IoT Sensors", "Firebase", "Embedded C"],
    image: "/asset/fuel-Fadality/curcit_diagram.jpeg",
    demo: "#",
    repo: "#",
  },
  {
    id: "portfolio-starter",
    title: "Portfolio Starter",
    short: "A minimal starter template for dev portfolios (this site!).",
    description:
      "An opinionated portfolio starter using Vite + React + Tailwind. Focused on accessibility and performance with a small, clean codebase.",
    tags: ["React", "Vite", "Tailwind"],
    image: "/images/portfolio-starter.png",
    demo: "#",
    repo: "#",
  },
];

export default projects;
