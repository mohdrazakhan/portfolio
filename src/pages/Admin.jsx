import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { 
  LogIn, LogOut, User, PlusCircle, Edit3, Trash2, X, Save, FileText, Briefcase, Activity,
  Upload, Image as ImageIcon, Link as LinkIcon, Users, Tag, ExternalLink, Github, Calendar,
  Code, Sparkles, Loader
} from "lucide-react";
import projects from "../data/projects";
import { activities } from "../data/activities";
import { storage } from "../firebase/app";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const TABS = ["projects", "blog", "activities"];

export default function Admin() {
  const { user, loading, loginWithEmail, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    try {
      await loginWithEmail(email, password);
    } catch (err) {
      setLoginError(err.message || "Invalid credentials");
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28 pb-12">
        <div className="animate-pulse text-zinc-600 dark:text-zinc-300">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28 pb-12">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-6">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Admin Login</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">Sign in with your credentials to manage site content.</p>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
              required
            />
            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white">
              <LogIn size={18} /> Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {user.photoURL ? (
            <img src={user.photoURL} alt="avatar" className="h-10 w-10 rounded-full" />
          ) : (
            <span className="h-10 w-10 rounded-full bg-zinc-800 text-white grid place-items-center"><User size={18} /></span>
          )}
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{user.displayName || "Admin"}</h1>
            <div className="text-xs text-zinc-500">{user.email}</div>
          </div>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-zinc-200 dark:border-zinc-800">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize transition ${
              activeTab === t
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            {t === "projects" && <Briefcase size={16} className="inline mr-1" />}
            {t === "blog" && <FileText size={16} className="inline mr-1" />}
            {t === "activities" && <Activity size={16} className="inline mr-1" />}
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "projects" && <ProjectsManager key="projects" />}
        {activeTab === "blog" && <BlogManager key="blog" />}
        {activeTab === "activities" && <ActivitiesManager key="activities" />}
      </AnimatePresence>
    </div>
  );
}

// --- Projects Manager ---
function ProjectsManager() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("admin.projects");
    return saved ? JSON.parse(saved) : projects;
  });
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    localStorage.setItem("admin.projects", JSON.stringify(items));
  }, [items]);

  function handleSave(data) {
    if (editing) {
      setItems((prev) => prev.map((p) => (p.id === editing.id ? { ...data, id: editing.id } : p)));
    } else {
      setItems((prev) => [...prev, { ...data, id: `proj-${Date.now()}` }]);
    }
    setShowModal(false);
    setEditing(null);
  }

  function handleDelete(id) {
    if (confirm("Delete this project?")) setItems((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Briefcase className="text-indigo-400" size={28} />
            Projects Manager
          </h2>
          <p className="text-sm text-zinc-400 mt-1">Showcase your best work and achievements</p>
        </div>
        <motion.button 
          onClick={() => { setEditing(null); setShowModal(true); }} 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-indigo-500/30 transition"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle size={18} /> 
          New Project
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: items.length, icon: Briefcase, color: "indigo" },
          { label: "Featured", value: items.filter(p => p.featured).length, icon: Sparkles, color: "yellow" },
          { label: "Completed", value: items.filter(p => p.status === "completed").length, icon: Code, color: "green" },
          { label: "In Progress", value: items.filter(p => p.status === "in-progress").length, icon: Loader, color: "blue" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="relative group p-4 rounded-xl bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 border border-zinc-800 hover:border-${stat.color}-500/50 overflow-hidden transition-all"
            whileHover={{ y: -4 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/5 to-${stat.color}-500/0 opacity-0 group-hover:opacity-100 transition`} />
            <stat.icon className={`text-${stat.color}-400 mb-2`} size={20} />
            <div className="text-2xl font-bold text-zinc-100">{stat.value}</div>
            <div className="text-xs text-zinc-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {items.map((p, idx) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 overflow-hidden hover:border-indigo-500/50 transition-all"
            >
              {/* Featured Badge */}
              {p.featured && (
                <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-yellow-600/20 border border-yellow-500/30 backdrop-blur-sm">
                  <span className="text-xs font-semibold text-yellow-400 flex items-center gap-1">
                    <Sparkles size={12} /> Featured
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-video bg-zinc-950 overflow-hidden">
                {p.image ? (
                  <>
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="text-zinc-700" size={48} />
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute bottom-3 left-3">
                  {p.status === "completed" && (
                    <span className="px-2.5 py-1 rounded-full bg-green-600/20 border border-green-500/30 backdrop-blur-sm text-xs font-semibold text-green-400">
                      ✅ Completed
                    </span>
                  )}
                  {p.status === "in-progress" && (
                    <span className="px-2.5 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm text-xs font-semibold text-blue-400">
                      🚧 In Progress
                    </span>
                  )}
                  {p.status === "planning" && (
                    <span className="px-2.5 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 backdrop-blur-sm text-xs font-semibold text-purple-400">
                      💡 Planning
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-indigo-400 transition line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{p.short}</p>
                </div>

                {/* Tags */}
                {Array.isArray(p.tags) && p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-md bg-zinc-800/50 border border-zinc-700 text-xs text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {p.tags.length > 3 && (
                      <span className="px-2 py-1 rounded-md bg-zinc-800/50 border border-zinc-700 text-xs text-zinc-500">
                        +{p.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Team */}
                {Array.isArray(p.team) && p.team.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Users size={14} className="text-green-400" />
                    <span>{p.team.join(", ")}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-zinc-800">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-700 hover:border-blue-500 hover:bg-blue-500/10 text-xs font-medium text-zinc-300 hover:text-blue-400 transition"
                    >
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-700 hover:border-orange-500 hover:bg-orange-500/10 text-xs font-medium text-zinc-300 hover:text-orange-400 transition"
                    >
                      <Github size={14} /> Code
                    </a>
                  )}
                  <motion.button
                    onClick={() => { setEditing(p); setShowModal(true); }}
                    className="px-3 py-2 rounded-lg border border-zinc-700 hover:border-indigo-500 hover:bg-indigo-500/10 text-xs font-medium text-zinc-300 hover:text-indigo-400 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit3 size={14} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-2 rounded-lg border border-zinc-700 hover:border-red-500 hover:bg-red-500/10 text-xs font-medium text-zinc-300 hover:text-red-400 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-zinc-800"
        >
          <Briefcase className="mx-auto text-zinc-700 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-zinc-400 mb-2">No projects yet</h3>
          <p className="text-sm text-zinc-600 mb-6">Start showcasing your work by adding your first project</p>
          <motion.button
            onClick={() => { setEditing(null); setShowModal(true); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle size={18} /> Add Your First Project
          </motion.button>
        </motion.div>
      )}

      {showModal && <ProjectModal initial={editing} onSave={handleSave} onClose={() => { setShowModal(false); setEditing(null); }} />}
    </motion.div>
  );
}

function ProjectModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { 
    title: "", 
    short: "", 
    description: "", 
    tags: "", 
    image: "", 
    demo: "", 
    repo: "",
    team: "",
    status: "completed",
    featured: false
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(initial?.image || "");

  // Debug: Check if storage is available
  useEffect(() => {
    console.log("Storage object:", storage);
    console.log("Storage bucket:", storage?.app?.options?.storageBucket);
  }, []);

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    
    console.log("File selected:", file.name, file.type, file.size);
    
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);
      console.log("Starting upload...");

      const timestamp = Date.now();
      const fileName = `projects/${timestamp}_${file.name}`;
      console.log("Storage path:", fileName);
      
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload progress:", Math.round(progress) + "%");
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error("Upload error:", error);
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
          
          let errorMessage = "Failed to upload image. ";
          if (error.code === "storage/unauthorized") {
            errorMessage += "Please check Firebase Storage rules.";
          } else if (error.code === "storage/canceled") {
            errorMessage += "Upload was canceled.";
          } else {
            errorMessage += error.message;
          }
          
          alert(errorMessage);
          setUploading(false);
          setUploadProgress(0);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Upload complete! URL:", downloadURL);
            setForm({ ...form, image: downloadURL });
            setImagePreview(downloadURL);
            setUploading(false);
            setUploadProgress(0);
          } catch (error) {
            console.error("Error getting download URL:", error);
            alert("Upload succeeded but failed to get download URL");
            setUploading(false);
            setUploadProgress(0);
          }
        }
      );
    } catch (error) {
      console.error("Upload initialization error:", error);
      alert("Failed to initialize upload: " + error.message);
      setUploading(false);
      setUploadProgress(0);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validate required fields
    if (!form.title.trim()) {
      alert("Please enter a project title");
      return;
    }
    
    const tagsArray = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const teamArray = form.team.split(",").map((t) => t.trim()).filter(Boolean);
    
    onSave({ 
      ...form, 
      tags: tagsArray,
      team: teamArray
    });
    
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 w-full max-w-4xl my-8 shadow-2xl"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border-b border-zinc-800 p-6 sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-sm">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-2 bg-indigo-600/20 rounded-lg border border-indigo-500/30"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Briefcase className="text-indigo-400" size={24} />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-zinc-100">{initial ? "Edit Project" : "Add New Project"}</h3>
                <p className="text-sm text-zinc-400">Fill in the details below to showcase your work</p>
              </div>
            </div>
            <motion.button 
              onClick={onClose} 
              className="p-2 hover:bg-zinc-800 rounded-lg transition"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="text-zinc-400" size={20} />
            </motion.button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Image Upload Section */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
              <ImageIcon size={16} className="text-indigo-400" />
              Project Thumbnail
            </label>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Upload Area */}
              <div className="space-y-3">
                <label className="relative group cursor-pointer block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <motion.div 
                    className="border-2 border-dashed border-zinc-700 hover:border-indigo-500 rounded-xl p-8 text-center transition-all bg-zinc-900/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {uploading ? (
                      <div className="space-y-3">
                        <Loader className="mx-auto text-indigo-400 animate-spin" size={32} />
                        <div className="text-sm text-zinc-400">Uploading... {uploadProgress}%</div>
                        <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto text-zinc-500 group-hover:text-indigo-400 transition mb-3" size={32} />
                        <div className="text-sm text-zinc-400 group-hover:text-zinc-300">
                          Click to upload or drag and drop
                        </div>
                        <div className="text-xs text-zinc-600 mt-1">PNG, JPG up to 5MB</div>
                      </>
                    )}
                  </motion.div>
                </label>

                {/* Or paste URL */}
                <div className="relative">
                  <input
                    type="url"
                    placeholder="Or paste image URL"
                    value={form.image}
                    onChange={(e) => {
                      setForm({ ...form, image: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                  <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-2">
                <div className="text-xs text-zinc-500 uppercase tracking-wide">Preview</div>
                <div className="aspect-video rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-600">
                      <ImageIcon size={48} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                <Code size={14} className="text-purple-400" />
                Project Title *
              </label>
              <input
                placeholder="My Awesome Project"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                <Sparkles size={14} className="text-pink-400" />
                Status
              </label>
              <select
                value={form.status || "completed"}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-zinc-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
              >
                <option value="completed">✅ Completed</option>
                <option value="in-progress">🚧 In Progress</option>
                <option value="planning">💡 Planning</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-300">Short Description *</label>
            <input
              placeholder="A brief one-liner about this project"
              value={form.short}
              onChange={(e) => setForm({ ...form, short: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
              required
            />
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-300">Full Description</label>
            <textarea
              placeholder="Detailed description of your project, features, challenges, and achievements..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition resize-none"
              rows={4}
            />
          </div>

          {/* Tags & Team */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                <Tag size={14} className="text-cyan-400" />
                Tech Stack
              </label>
              <input
                placeholder="React, Node.js, MongoDB, etc."
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
              />
              <div className="text-xs text-zinc-500">Separate with commas</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                <Users size={14} className="text-green-400" />
                Team / Contributors
              </label>
              <input
                placeholder="John Doe, Jane Smith"
                value={form.team || ""}
                onChange={(e) => setForm({ ...form, team: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
              />
              <div className="text-xs text-zinc-500">Separate with commas</div>
            </div>
          </div>

          {/* Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                <ExternalLink size={14} className="text-blue-400" />
                Live Demo URL
              </label>
              <input
                type="url"
                placeholder="https://demo.yourproject.com"
                value={form.demo}
                onChange={(e) => setForm({ ...form, demo: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                <Github size={14} className="text-orange-400" />
                Repository URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/repo"
                value={form.repo}
                onChange={(e) => setForm({ ...form, repo: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-600/20 rounded-lg border border-yellow-500/30">
                <Sparkles className="text-yellow-400" size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-300">Featured Project</div>
                <div className="text-xs text-zinc-500">Highlight this project on your portfolio</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured || false}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:ring-2 peer-focus:ring-yellow-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-yellow-600 peer-checked:to-orange-600"></div>
            </label>
          </div>

          {/* Footer - Inside Form */}
          <div className="border-t border-zinc-800 bg-zinc-900/50 -mx-6 px-6 py-4 flex items-center justify-end gap-3 sticky bottom-0">
            <motion.button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={uploading}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition text-sm font-medium inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save size={16} />
              {initial ? "Update Project" : "Create Project"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// --- Blog Manager ---
function BlogManager() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">Manage your blog posts from the <a href="/blog" className="text-indigo-600 underline">Blog page</a>.</p>
      <a href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm">
        <FileText size={16} /> Go to Blog Editor
      </a>
    </motion.div>
  );
}

// --- Activities Manager ---
function ActivitiesManager() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("admin.activities");
    return saved ? JSON.parse(saved) : activities;
  });
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    localStorage.setItem("admin.activities", JSON.stringify(items));
  }, [items]);

  function handleSave(data) {
    if (editing) {
      setItems((prev) => prev.map((a) => (a.id === editing.id ? { ...data, id: editing.id } : a)));
    } else {
      setItems((prev) => [{ ...data, id: `act-${Date.now()}` }, ...prev]);
    }
    setShowModal(false);
    setEditing(null);
  }

  function handleDelete(id) {
    if (confirm("Delete this activity?")) setItems((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Activities</h2>
        <button onClick={() => { setEditing(null); setShowModal(true); }} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm">
          <PlusCircle size={16} /> Add Activity
        </button>
      </div>
      <div className="space-y-3">
        {items.map((a) => (
          <div key={a.id} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-4 flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{a.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{a.description}</p>
              <div className="text-xs text-zinc-500 mt-1">{a.date} · {a.type}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(a); setShowModal(true); }} className="text-xs px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700"><Edit3 size={14} /></button>
              <button onClick={() => handleDelete(a.id)} className="text-xs px-2 py-1 rounded border border-red-300 text-red-700"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
      {showModal && <ActivityModal initial={editing} onSave={handleSave} onClose={() => { setShowModal(false); setEditing(null); }} />}
    </motion.div>
  );
}

function ActivityModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { date: new Date().toISOString().split("T")[0], title: "", type: "update", description: "", link: "" });

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{initial ? "Edit Activity" : "Add Activity"}</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-md border px-3 py-2 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700" required />
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-md border px-3 py-2 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700" required />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded-md border px-3 py-2 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700">
            <option value="update">Update</option>
            <option value="project">Project</option>
            <option value="blog">Blog</option>
          </select>
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-md border px-3 py-2 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700" rows={2} />
          <input placeholder="Link" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="w-full rounded-md border px-3 py-2 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700" />
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"><Save size={16} />Save</button>
        </form>
      </motion.div>
    </div>
  );
}
