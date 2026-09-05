import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save, Trash2, Eye, EyeOff, Edit3, LogOut, Sparkles, Upload, Check
} from "lucide-react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../services/api";

function toDate(v) {
  if (!v) return null;
  if (typeof v === "number") return new Date(v);
  if (v?.toDate) return v.toDate();
  try { return new Date(v); } catch { return null; }
}

export default function Blog() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("published"); // 'published' | 'all'

  // Editor state (owner only)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [publish, setPublish] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const list = await api.getPosts(!!user);
      setPosts(list || []);
    } catch (err) {
      console.warn("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const visiblePosts = useMemo(() => {
    return posts.filter((p) => (filter === "published" ? p.published : true));
  }, [posts, filter]);

  async function handleSave() {
    if (!title.trim() || !content.trim()) return;
    try {
      if (editingId) {
        await api.updatePost(editingId, {
          title,
          content,
          published: publish,
        });
        setEditingId(null);
      } else {
        await api.createPost({
          title,
          content,
          published: publish,
        });
      }
      setTitle("");
      setContent("");
      setPublish(true);
      await fetchPosts();
    } catch (err) {
      alert("Error saving post: " + err.message);
    }
  }

  function handleEdit(post) {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setPublish(!!post.published);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.deletePost(id);
      await fetchPosts();
    } catch (err) {
      alert("Error deleting post: " + err.message);
    }
  }

  async function togglePublish(id, current) {
    try {
      await api.updatePost(id, { published: !current });
      await fetchPosts();
    } catch (err) {
      alert("Error updating post status: " + err.message);
    }
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
                  <div className="prose prose-zinc dark:prose-invert max-w-none mt-2 line-clamp-4 overflow-hidden text-sm">
                    {/* Render a stripped preview or just HTML */}
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
  uploading,
  setUploading,
}) {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  // Custom Image Handler
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
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
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();

            // Insert image
            quill.insertEmbed(range.index, 'image', downloadURL);
            // Move cursor to next position
            quill.setSelection(range.index + 1);

            setUploading(false);
          }
        );
      } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to initialize upload');
        setUploading(false);
      }
    };
  }, [setUploading]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-hidden shadow-2xl"
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
              <p className="text-xs text-zinc-400">WYSIWYG Editor using React Quill</p>
            </div>
          </div>
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

        {/* React Quill Editor */}
        <div className="bg-white text-zinc-900">
          <ReactQuill
            theme="snow"
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-[500px]"
            placeholder="Start writing your story... Use the toolbar to format text or add images."
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-zinc-800 bg-zinc-900 p-4 flex items-center justify-between">
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

        <div className="flex items-center gap-4">
          {uploading && (
            <span className="text-sm text-zinc-400 animate-pulse flex items-center gap-2">
              <Upload size={14} /> Uploading image...
            </span>
          )}
          <motion.button
            onClick={onSave}
            disabled={!title.trim() || !content.trim() || uploading}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save size={18} />
            {isEditing ? 'Update Post' : 'Save Post'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
