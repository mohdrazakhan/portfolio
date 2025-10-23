import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/app";
import { collection, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";

function toDate(v) {
  if (!v) return null;
  if (typeof v === "number") return new Date(v);
  if (v?.toDate) return v.toDate();
  try { return new Date(v); } catch { return null; }
}

function readTimeFromHtml(html) {
  const text = (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const col = collection(db, "posts");
    const base = [orderBy("updatedAt", "desc")];
    const q = user ? query(col, ...base) : query(col, where("published", "==", true), ...base);
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPosts(list);
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, [user]);

  const index = useMemo(() => posts.findIndex((p) => p.id === id || p.slug === id), [posts, id]);
  const post = index >= 0 ? posts[index] : null;
  const prev = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;
  const next = index > 0 ? posts[index - 1] : null;

  if (!loading && !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28 pb-16">
        <h1 className="text-2xl font-bold mb-2">Post not found</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">The blog you're looking for doesn't exist or was removed.</p>
        <Link to="/blog" className="inline-block mt-4 text-indigo-600 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  const date = post ? toDate(post.updatedAt || post.createdAt) : new Date();
  const minutes = post ? readTimeFromHtml(post.content) : 1;

  function copyLink() {
    try {
      navigator.clipboard.writeText(window.location.href);
      // eslint-disable-next-line no-alert
      alert("Link copied to clipboard");
    } catch {}
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-10 sm:py-14 bg-gradient-to-b from-indigo-600/10 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            <ArrowLeft size={16} /> Back
          </button>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
            className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            {post?.title || ""}
          </motion.h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-zinc-600 dark:text-zinc-300">
            <span className="inline-flex items-center gap-1 text-sm"><Calendar size={16} /> {date?.toLocaleDateString?.() || ""}</span>
            <span className="inline-flex items-center gap-1 text-sm"><Clock size={16} /> {minutes} min read</span>
            <button onClick={copyLink} className="inline-flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          {post ? (
            <article className="prose prose-zinc dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
          ) : (
            <div className="animate-pulse h-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          )}

          <div className="mt-10 flex items-center justify-between text-sm">
            {prev ? (
              <Link to={`/blog/${prev.id}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">← {prev.title}</Link>
            ) : <span />}
            {next ? (
              <Link to={`/blog/${next.id}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">{next.title} →</Link>
            ) : <span />}
          </div>

          <div className="mt-8">
            <Link to="/blog" className="inline-block text-indigo-600 hover:underline">Back to Blog</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
