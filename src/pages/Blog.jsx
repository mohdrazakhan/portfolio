import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bold, Italic, Underline, Type, Save, Trash2, Eye, EyeOff, PlusCircle, Edit3, LogOut,
  Code, List, ListOrdered, Image as ImageIcon, Link as LinkIcon, Sparkles, Monitor,
  Maximize2, Minimize2, Upload, X, Check
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { db, storage } from "../firebase/app";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  writeBatch,
  Timestamp,
} from "firebase/firestore";

// Local storage keys
const LS_POSTS_KEY = "blog.posts.v1";
const LS_OWNER_KEY = "blog.owner.logged";

// Utility to load env-based owner credentials with safe defaults
const OWNER_ID = import.meta?.env?.VITE_OWNER_ID || "admin";
const OWNER_PASS = import.meta?.env?.VITE_OWNER_PASSWORD || "secret";
if (import.meta?.env?.DEV) {
  // Minimal debug in dev only
  // eslint-disable-next-line no-console
  console.log("[Blog] Env OWNER_ID:", OWNER_ID);
  // eslint-disable-next-line no-console
  console.log("[Blog] Env OWNER_PASS length:", OWNER_PASS?.length);
}

// A very small emoji palette to keep bundle light
const EMOJIS = ["😀","😎","🚀","🎯","📝","💡","🔥","🎉","❤️","👏","✨","🧠","📈","🧩","🔧","🧪"];

function toDate(v) {
  if (!v) return null;
  if (typeof v === "number") return new Date(v);
  if (v?.toDate) return v.toDate();
  try { return new Date(v); } catch { return null; }
}

function ToolbarButton({ onClick, label, icon: Icon, active = false }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
        active 
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
          : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/70 hover:text-white border border-zinc-700/50"
      }`}
      title={label}
      aria-label={label}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {Icon && <Icon size={16} />}
    </motion.button>
  );
}

function formatCmd(cmd, value = null) {
  // document.execCommand is deprecated but still widely supported; OK for a simple static site editor
  document.execCommand(cmd, false, value);
}

function insertAtCaret(emoji, ref) {
  const el = ref.current;
  if (!el) return;
  el.focus();
  document.execCommand("insertText", false, emoji);
}

export default function Blog() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("published"); // 'published' | 'all'

  // Editor state (owner only)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [publish, setPublish] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Subscribe to Firestore posts
  useEffect(() => {
    const col = collection(db, "posts");
    const q = query(col, orderBy("updatedAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPosts(list);
    });
    return () => unsub();
  }, []);

  // One-time migration from localStorage if Firestore empty
  useEffect(() => {
    if (!user) return; // only admin can migrate
    if (posts.length > 0) return;
    const migratedFlag = localStorage.getItem("blog.firestore.migrated");
    if (migratedFlag === "1") return;
    try {
      const raw = localStorage.getItem(LS_POSTS_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr) || arr.length === 0) return;
      const batch = writeBatch(db);
      const col = collection(db, "posts");
      arr.forEach((p) => {
        const ref = doc(col);
        batch.set(ref, {
          title: p.title,
          content: p.content,
          createdAt: p.createdAt ? Timestamp.fromMillis(p.createdAt) : serverTimestamp(),
          updatedAt: p.updatedAt ? Timestamp.fromMillis(p.updatedAt) : serverTimestamp(),
          published: !!p.published,
        });
      });
      batch.commit().then(() => {
        localStorage.setItem("blog.firestore.migrated", "1");
      }).catch(() => {});
    } catch {}
  }, [user, posts.length]);

  const visiblePosts = useMemo(() => {
    return posts.filter((p) => (filter === "published" ? p.published : true));
  }, [posts, filter]);

  async function handleSave() {
    if (!title.trim() || !content.trim()) return;
    const col = collection(db, "posts");
    if (editingId) {
      const ref = doc(db, "posts", editingId);
      await updateDoc(ref, {
        title,
        content,
        updatedAt: serverTimestamp(),
        published: publish,
      });
      setEditingId(null);
    } else {
      await addDoc(col, {
        title,
        content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        published: publish,
      });
    }
    setTitle("");
    setContent("");
    setPublish(true);
  }

  function handleEdit(post) {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setPublish(!!post.published);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    const ref = doc(db, "posts", id);
    await deleteDoc(ref);
  }

  async function togglePublish(id, current) {
    const ref = doc(db, "posts", id);
    await updateDoc(ref, { published: !current, updatedAt: serverTimestamp() });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28 pb-10">
      <motion.h1
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 16 }}
        className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100"
      >
        Blog
      </motion.h1>

      {/* Editor shown only if logged in via Admin */}
      {user && (
        <OwnerEditor
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          onSave={handleSave}
          onLogout={logout}
          isEditing={!!editingId}
          publish={publish}
          setPublish={setPublish}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          uploading={uploading}
          setUploading={setUploading}
        />
      )}

      {/* Posts list */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Posts</h2>
          <div className="flex items-center gap-2 text-sm">
            <button
              className={`px-3 py-1.5 rounded-md border ${filter === "published" ? "border-indigo-500 text-indigo-600" : "border-zinc-300 dark:border-zinc-700"}`}
              onClick={() => setFilter("published")}
            >
              Published
            </button>
            {user && (
              <button
                className={`px-3 py-1.5 rounded-md border ${filter === "all" ? "border-indigo-500 text-indigo-600" : "border-zinc-300 dark:border-zinc-700"}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {visiblePosts.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      <time>{toDate(p.updatedAt || p.createdAt)?.toLocaleString?.() || ""}</time>
                      {p.published ? (
                        <span className="ml-2 inline-flex items-center gap-1 text-emerald-600"> <Eye size={14} /> Published</span>
                      ) : (
                        <span className="ml-2 inline-flex items-center gap-1 text-amber-600"> <EyeOff size={14} /> Draft</span>
                      )}
                    </div>
                  </div>

                  {user && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => togglePublish(p.id, p.published)} className="px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 text-xs">
                        {p.published ? "Unpublish" : "Publish"}
                      </button>
                      <button onClick={() => handleEdit(p)} className="px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 text-xs inline-flex items-center gap-1">
                        <Edit3 size={14} /> Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="px-2 py-1 rounded-md border border-red-300 text-red-700 text-xs inline-flex items-center gap-1">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Make most of card clickable except admin actions */}
                <Link to={`/blog/${p.id}`} className="block group mt-2">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600">{p.title}</h3>
                  <div className="prose prose-zinc dark:prose-invert max-w-none mt-2 line-clamp-4 overflow-hidden">
                    <div dangerouslySetInnerHTML={{ __html: p.content }} />
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function OwnerEditor({
  title,
  setTitle,
  content,
  setContent,
  onSave,
  onLogout,
  isEditing,
  publish,
  setPublish,
  showPreview,
  setShowPreview,
  fullscreen,
  setFullscreen,
  uploading,
  setUploading,
}) {
  const [activeFormats, setActiveFormats] = useState({});
  const editorRef = useRef(null);

  const applyFormat = (format, value = null) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    
    if (!selectedText && !value) return;

    let wrappedText = '';
    switch(format) {
      case 'bold':
        wrappedText = `<strong>${selectedText}</strong>`;
        break;
      case 'italic':
        wrappedText = `<em>${selectedText}</em>`;
        break;
      case 'underline':
        wrappedText = `<u>${selectedText}</u>`;
        break;
      case 'code':
        wrappedText = `<code class="px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-sm">${selectedText}</code>`;
        break;
      case 'h1':
        wrappedText = `<h1 class="text-4xl font-bold mt-8 mb-4 text-zinc-100">${selectedText}</h1>`;
        break;
      case 'h2':
        wrappedText = `<h2 class="text-3xl font-bold mt-6 mb-3 text-zinc-100">${selectedText}</h2>`;
        break;
      case 'h3':
        wrappedText = `<h3 class="text-2xl font-semibold mt-4 mb-2 text-zinc-200">${selectedText}</h3>`;
        break;
      case 'ul':
        wrappedText = `<ul class="list-disc list-inside my-4 space-y-2 text-zinc-300"><li>${selectedText}</li></ul>`;
        break;
      case 'ol':
        wrappedText = `<ol class="list-decimal list-inside my-4 space-y-2 text-zinc-300"><li>${selectedText}</li></ol>`;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) wrappedText = `<a href="${url}" class="text-indigo-400 hover:text-indigo-300 underline" target="_blank">${selectedText}</a>`;
        break;
      case 'image':
        if (value) wrappedText = `<img src="${value}" alt="Blog image" class="rounded-xl my-6 w-full max-w-3xl mx-auto shadow-2xl" />`;
        break;
      default:
        return;
    }

    if (wrappedText) {
      const start = content.substring(0, editorRef.current.selectionStart);
      const end = content.substring(editorRef.current.selectionEnd);
      setContent(start + wrappedText + end);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const timestamp = Date.now();
      const fileName = `blog/${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Upload error:', error);
          alert('Failed to upload image');
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          applyFormat('image', downloadURL);
          setUploading(false);
        }
      );
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${fullscreen ? 'fixed inset-0 z-50 bg-zinc-950 pt-20' : 'mt-6'} rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-hidden shadow-2xl`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border-b border-zinc-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-2 bg-indigo-600/20 rounded-lg border border-indigo-500/30"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Sparkles className="text-indigo-400" size={20} />
            </motion.div>
            <div>
              <h2 className="text-lg font-bold text-zinc-100">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h2>
              <p className="text-xs text-zinc-400">Markdown-style rich text editor with live preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ToolbarButton 
              icon={showPreview ? Monitor : Eye} 
              label="Preview" 
              onClick={() => setShowPreview(!showPreview)}
              active={showPreview}
            />
            <ToolbarButton 
              icon={fullscreen ? Minimize2 : Maximize2} 
              label="Fullscreen" 
              onClick={() => setFullscreen(!fullscreen)}
            />
            <motion.button
              onClick={onLogout}
              className="px-3 py-2 rounded-lg bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/70 border border-zinc-700/50 text-sm inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={16} /> Logout
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${fullscreen ? 'h-[calc(100vh-260px)]' : 'h-[600px]'} grid ${showPreview ? 'grid-cols-2' : 'grid-cols-1'} divide-x divide-zinc-800`}>
        {/* Editor Panel */}
        <div className="flex flex-col">
          {/* Title Input */}
          <div className="p-4 border-b border-zinc-800">
            <input
              type="text"
              placeholder="✨ Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-2xl font-bold text-zinc-100 placeholder-zinc-600 focus:outline-none"
            />
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 p-3 border-b border-zinc-800 bg-zinc-900/50">
            <ToolbarButton icon={Bold} label="Bold" onClick={() => applyFormat('bold')} />
            <ToolbarButton icon={Italic} label="Italic" onClick={() => applyFormat('italic')} />
            <ToolbarButton icon={Underline} label="Underline" onClick={() => applyFormat('underline')} />
            <ToolbarButton icon={Code} label="Code" onClick={() => applyFormat('code')} />
            <div className="w-px h-6 bg-zinc-700" />
            <ToolbarButton icon={Type} label="H1" onClick={() => applyFormat('h1')} />
            <ToolbarButton icon={Type} label="H2" onClick={() => applyFormat('h2')} />
            <ToolbarButton icon={Type} label="H3" onClick={() => applyFormat('h3')} />
            <div className="w-px h-6 bg-zinc-700" />
            <ToolbarButton icon={List} label="List" onClick={() => applyFormat('ul')} />
            <ToolbarButton icon={ListOrdered} label="Ordered" onClick={() => applyFormat('ol')} />
            <ToolbarButton icon={LinkIcon} label="Link" onClick={() => applyFormat('link')} />
            <div className="w-px h-6 bg-zinc-700" />
            <label className="cursor-pointer">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              <div className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                uploading 
                  ? 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed' 
                  : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/70 hover:text-white border border-zinc-700/50 cursor-pointer'
              }`}>
                {uploading ? <Upload className="animate-spin" size={16} /> : <ImageIcon size={16} />}
              </div>
            </label>
          </div>

          {/* Text Editor */}
          <textarea
            ref={editorRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your story... Use the toolbar to format text or add images."
            className="flex-1 p-6 bg-zinc-950/50 text-zinc-300 font-mono text-sm leading-relaxed resize-none focus:outline-none placeholder-zinc-700"
          />
        </div>

        {/* Live Preview Panel */}
        {showPreview && (
          <div className="flex flex-col bg-zinc-950/30">
            <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
              <Eye className="text-indigo-400" size={16} />
              <span className="text-sm font-semibold text-zinc-400">Live Preview</span>
            </div>
            <div className="flex-1 overflow-y-auto p-8 prose prose-invert prose-indigo max-w-none">
              {title && <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">{title}</h1>}
              {content ? (
                <div 
                  className="text-zinc-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <p className="text-zinc-600 italic">Your preview will appear here...</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-zinc-800 bg-zinc-900/50 p-4 flex items-center justify-between">
        <label className="inline-flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-zinc-700 peer-focus:ring-2 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-purple-600"></div>
          </div>
          <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100">
            {publish ? <span className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Publish immediately</span> : 'Save as draft'}
          </span>
        </label>

        <motion.button
          onClick={onSave}
          disabled={!title.trim() || !content.trim()}
          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/30"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save size={18} />
          {isEditing ? 'Update Post' : 'Save Post'}
        </motion.button>
      </div>
    </motion.div>
  );
}
