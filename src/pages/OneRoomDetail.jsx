import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Download, Github, Shield, CheckCircle2, MessageSquare, Users, Wallet, Calendar, Link as LinkIcon, Image as ImageIcon, FileText, Activity, ArrowDown, ArrowRight, Home, BarChart3, LogIn, UserPlus } from "lucide-react";

export default function OneRoomDetail() {
  const navigate = useNavigate();

  // Define screenshot basenames (we'll try multiple extensions automatically)
  const screenshotBases = ["login", "balances", "taskmanager"];

  // Resolve a path against BASE_URL for subpath deployments
  const withBase = (p) => `${import.meta.env.BASE_URL || "/"}${p.replace(/^\//, "")}`;

  // Robust image error handler: try .jpg, .jpeg, .png (and uppercase) before final fallback
  const exts = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"];
  const onScreenshotError = (e) => {
    const el = e.currentTarget;
    const base = el.dataset.base;
    let i = Number(el.dataset.extIndex || 0) + 1;
    if (i < exts.length) {
      el.dataset.extIndex = String(i);
      el.src = withBase(`asset/one-room/${base}.${exts[i]}`);
    } else {
      el.src = withBase("images/roommate.png");
      el.style.objectFit = "contain";
      el.alt = `Missing asset: ${base}`;
    }
  };

  // APK download (ensure this path matches your public assets)
  // Google Drive direct download link for APK (provided by user)
  const apkUrl = "https://drive.google.com/uc?export=download&id=1PMsLz2PveqXBaa33oqTGjQXPVwGnt7hx";
  const github = "https://github.com/mohdrazakhan/oneRoom---Roommate-management-application.git";

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

  return (
    <motion.div className="min-h-screen py-20 md:py-28" initial="hidden" animate="visible" variants={container}>
      <div className="mx-auto max-w-5xl px-6">
        {/* Back */}
        <motion.button onClick={() => navigate("/#projects")} className="group mb-8 flex items-center gap-2 text-zinc-400 hover:text-zinc-100" variants={item}>
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
          Back to Projects
        </motion.button>

        {/* Hero */}
        <motion.div variants={item} className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600/20 via-fuchsia-500/10 to-cyan-500/10 p-8 md:p-12">
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-indigo-500/20">
                <Sparkles className="text-indigo-300" />
              </div>
              <h1 className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
                One Room — all‑in‑one roommate life manager
              </h1>
            </div>
            <p className="mb-6 max-w-3xl text-lg text-zinc-300">
              Keep your shared life simple: split expenses, track tasks, chat with roommates, and stay on top of reminders — all in a single app.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href={apkUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700">
                <Download size={18} /> Download v1.0.0 (Android APK)
              </a>
              <a href={github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/40 px-5 py-3 text-sm font-semibold text-zinc-100 hover:bg-zinc-800">
                <Github size={18} /> View Code
              </a>
              <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">iOS coming soon</span>
            </div>
          </div>
          {/* subtle orbs */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        </motion.div>

        {/* Why I built this */}
        <motion.section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6" variants={item}>
          <h2 className="mb-2 text-2xl font-bold text-zinc-100">Why I built this</h2>
          <p className="text-zinc-300">
            Hi, I’m mohd raza khan — a B.Tech CSE student who shares a flat with friends. Like many students, we struggled with the little frictions of living together: “Who paid last time?”, “Why is the kitchen a mess?”, “When’s the rent due?”, “Drop the room Wi‑Fi password!”, and so on.
          </p>
          <p className="mt-3 text-zinc-300">
            I looked around the Play Store and found plenty of apps solving one problem at a time, but none that felt like a calm, complete companion for the whole roommate experience. So I decided to build One Room — a single place where we can manage money, time, and conversations without chaos. This is for every student who wants less confusion and more harmony.
          </p>
        </motion.section>

        {/* Features */}
        <motion.section className="mt-12" variants={item}>
          <h2 className="mb-4 text-2xl font-bold text-zinc-100">Features at a glance</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: Wallet, title: "Smart expenses", desc: "Equal, Percentage, Exact, and Shares splits with auto‑remainder logic and live validation" },
              { icon: Users, title: "Clear who‑owes‑what", desc: "Readable summaries with real names (not just IDs)" },
              { icon: CheckCircle2, title: "Tasks & categories", desc: "Lightweight room chores and reminders" },
              { icon: MessageSquare, title: "Room chat", desc: "Text, images, video, audio, polls, reminders, and quick links" },
              { icon: LinkIcon, title: "Link picker", desc: "Pick an expense or task from a list and drop it into chat" },
              { icon: Shield, title: "Strong Firestore rules", desc: "Messages and data are only visible to room members" },
              { icon: Activity, title: "Clean Material 3 design", desc: "Readable AppBars and modern components" },
            ].map((f, idx) => (
              <motion.div key={f.title} className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-indigo-500/50" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <div className="mb-2 flex items-center gap-2 text-indigo-300"><f.icon size={18} /> <span className="font-semibold">{f.title}</span></div>
                <p className="text-sm text-zinc-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Screenshots */}
        <motion.section className="mt-12" variants={item}>
          <h2 className="mb-4 text-2xl font-bold text-zinc-100">Screenshots</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {screenshotBases.map((base, i) => (
              <motion.div key={i} className="aspect-[9/16] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800/30" whileHover={{ scale: 1.02 }}>
                <img
                  src={withBase(`asset/one-room/${base}.${exts[0]}`)}
                  data-base={base}
                  data-ext-index="0"
                  alt={`One Room screenshot ${i + 1}`}
                  className="h-full w-full object-cover"
                  onError={onScreenshotError}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Architecture / Interactive Flow */}
        <InteractiveFlow variants={item} />

        {/* Tech Stack & Security */}
        <motion.section className="mt-12 grid gap-6 md:grid-cols-2" variants={item}>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="mb-3 text-xl font-semibold text-zinc-100">Tech stack</h3>
            <ul className="list-disc space-y-2 pl-6 text-zinc-300">
              <li>Flutter (Dart) — Material 3 UI, responsive components</li>
              <li>Firebase — Auth, Cloud Firestore, Cloud Storage</li>
              <li>Provider and best‑practice architecture for clean state and services</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="mb-3 text-xl font-semibold text-zinc-100">Security & privacy</h3>
            <ul className="list-disc space-y-2 pl-6 text-zinc-300">
              <li>Secrets are ignored in repo (google‑services.json, firebase_options.dart, keystores)</li>
              <li>Firestore rules restrict room content to members only</li>
              <li>See SECRETS.md for local setup and CI guidance</li>
            </ul>
          </div>
        </motion.section>

        {/* User guide */}
        <motion.section className="mt-12" variants={item}>
          <h2 className="mb-4 text-2xl font-bold text-zinc-100">User guide (quick tour)</h2>
          <ol className="grid gap-4 md:grid-cols-2">
            {[
              "Create or join a room; invite roommates by code or direct add",
              "Add expenses with Equal/%/Exact/Shares splits (guardrails + auto‑balance)",
              "See who paid and who owes with clear summaries",
              "Chat with text, media, polls, reminders, and link tasks/expenses",
              "Stay organized with tasks + categories and link them in chat",
              "Review balances, see analytics, and settle confidently",
            ].map((step, i) => (
              <li key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-zinc-300">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600/20 text-xs font-semibold text-indigo-300">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Footer actions */}
        <motion.div className="mt-12 flex flex-wrap items-center gap-3" variants={item}>
          <a href={apkUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700">
            <Download size={18} /> Download v1.0.0 (Android APK)
          </a>
          <a href={github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/40 px-5 py-3 text-sm font-semibold text-zinc-100 hover:bg-zinc-800">
            <Github size={18} /> GitHub Repository
          </a>
          <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">iOS coming soon</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Interactive flow component (replaces static image)
function InteractiveFlow({ variants }) {
  const [active, setActive] = useState(null);

  const Node = ({ id, title, desc, icon: Icon, color = "indigo" }) => (
    <motion.button
      onClick={() => setActive(id)}
      className={`group relative w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 text-left hover:border-${color}-500/50`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <div className={`mb-2 flex items-center gap-2 text-${color}-300`}>
        <Icon size={18} />
        <span className="font-semibold">{title}</span>
      </div>
      <p className="text-sm text-zinc-400">{desc}</p>
      <motion.span
        layoutId="flowGlow"
        className={`pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100`} 
        style={{ boxShadow: `0 0 0 1px rgba(99,102,241,0.12), inset 0 0 80px rgba(99,102,241,0.05)` }}
      />
    </motion.button>
  );

  const details = {
    launch: {
      title: "Launch App",
      info: "Starts Flutter app built with Material 3; checks persisted auth and routes accordingly.",
      tech: ["Flutter", "Dart"],
    },
    authGate: {
      title: "Signed in?",
      info: "If Firebase Auth has a user, continue to Dashboard; otherwise show Login/Signup.",
      tech: ["Firebase Auth"],
    },
    login: {
      title: "Login / Signup",
      info: "Email/password or provider sign‑in; guarded error handling and SnackBars.",
      tech: ["Firebase Auth"],
    },
    dashboard: {
      title: "Dashboard",
      info: "Overview with quick actions: join existing room or create a new one.",
      tech: ["Flutter", "Firestore"],
    },
    rooms: {
      title: "Rooms",
      info: "Room list and membership; each room has subcollections for expenses, tasks, chat, auditLog.",
      tech: ["Cloud Firestore"],
    },
    home: {
      title: "Room Home",
      info: "Hub for expenses, tasks, chat, and balances. Streams live updates from Firestore.",
      tech: ["Flutter", "Firestore"],
    },
    expenses: {
      title: "Expenses",
      info: "Equal/%/Exact/Shares splits with auto‑remainder; validates totals; clean summaries.",
      tech: ["Firestore"],
    },
    tasks: {
      title: "Tasks",
      info: "Lightweight chores with categories and reminders; link to chat for context.",
      tech: ["Firestore"],
    },
    chat: {
      title: "Chat",
      info: "Text, image, video, audio, polls, reminders; media in Storage; streams with Firestore.",
      tech: ["Firestore", "Storage"],
    },
    analytics: {
      title: "Balances & Analytics",
      info: "Who paid and who owes with clear rollups; settle up confidently.",
      tech: ["Firestore"],
    },
  };

  return (
    <motion.section className="mt-12" variants={variants}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-zinc-100">Under the hood (interactive flow)</h2>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-cyan-200">Flutter</span>
          <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 text-sky-200">Dart</span>
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-amber-200">Firebase (Auth • Firestore • Storage)</span>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        {/* Flow grid */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
          {/* Row 1 */}
          <Node id="launch" icon={Sparkles} title="Launch App" desc="Start + theme init" color="indigo" />

          <div className="flex flex-col items-center gap-2">
            <ArrowDown className="text-zinc-500" />
            <div className="w-full">
              <Node id="authGate" icon={Shield} title="Signed in?" desc="Auth guard (Firebase Auth)" color="violet" />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Node id="login" icon={LogIn} title="Login / Signup" desc="Email or provider" color="fuchsia" />
            <Node id="dashboard" icon={Home} title="Dashboard" desc="Join or create room" color="cyan" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <ArrowDown className="text-zinc-500" />
            <div className="w-full">
              <Node id="rooms" icon={Users} title="Rooms" desc="Your rooms & membership" color="indigo" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <ArrowDown className="text-zinc-500" />
            <div className="w-full">
              <Node id="home" icon={Home} title="Room Home" desc="Navigate core modules" color="violet" />
            </div>
          </div>

          {/* Row 6 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Node id="expenses" icon={Wallet} title="Expenses" desc="Smart splits + summaries" color="emerald" />
            <Node id="tasks" icon={CheckCircle2} title="Tasks" desc="Chores & reminders" color="amber" />
            <Node id="chat" icon={MessageSquare} title="Chat" desc="Text • media • polls" color="sky" />
            <Node id="analytics" icon={BarChart3} title="Balances & Analytics" desc="Who owes what" color="rose" />
          </div>
        </div>

        {/* Details panel */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-6 rounded-xl border border-zinc-800 bg-zinc-800/40 p-4"
            >
              <div className="mb-1 text-sm uppercase tracking-wide text-zinc-400">Step details</div>
              <h3 className="mb-2 text-lg font-semibold text-zinc-100">{details[active].title}</h3>
              <p className="text-zinc-300">{details[active].info}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {details[active].tech.map((t) => (
                  <span key={t} className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-zinc-300">{t}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
