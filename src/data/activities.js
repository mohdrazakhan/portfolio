// Recent activity data shown on home page
// Update these entries with your real activities, links, and timestamps
export const activities = [
  {
    id: "act-2025-10-22",
    date: "2025-10-22",
    title: "Published OptiRider detail page with animations",
    type: "update",
    description: "Added a rich project page, slideshow, and architecture write‑up.",
    link: "/projects/optirider",
  },
  {
    id: "act-2025-10-10",
    date: "2025-10-10",
    title: "Prototype: Real‑time delivery tracker",
    type: "project",
    description: "Built a socket.io PoC for live courier tracking and ETA.",
    link: "#projects",
  },
  {
    id: "act-2025-09-28",
    date: "2025-09-28",
    title: "Blog draft: Scaling React apps with feature folders",
    type: "blog",
    description: "Notes on structure, DX, and common pitfalls.",
    link: "#blog",
  },
];

export const activityTypeColors = {
  update: "from-indigo-500 to-violet-500",
  project: "from-emerald-500 to-teal-500",
  blog: "from-amber-500 to-pink-500",
};
