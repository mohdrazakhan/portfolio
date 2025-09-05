// src/data/projects.js
const projects = [
  {
    id: "roommate-manager",
    title: "One-Room (Roommate Manager)",
    short: "A roommate expense tracker with seamless split calculations.",
    description:
      "A full-featured expense tracker with user auth, realtime updates and CSV export. Built with React, Tailwind and a small Node server for webhooks.",
    tags: ["React", "Tailwind", "Firebase"],
    image: "/src/assets/images/roommate.png", 
    demo: "#",
    repo: "https://github.com/mohdrazakhan/oneRoom---Roommate-management-application.git",
  },
  {
    id: "optirider",
    title: "OptiRider (Concept)",
    short: "Delivery routing concept with optimized ETA visualization.",
    description:
      "Experiment showing route optimization and visual ETA improvements using D3 + Mapbox. Great for logistics demos and prototypes.",
    tags: ["D3", "Mapbox", "Prototype"],
    image: "/src/assets/images/optirider.png",
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
    image: "/src/assets/images/portfolio-starter.png",
    demo: "#",
    repo: "#",
  },
];

export default projects;
