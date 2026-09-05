import { Router } from "express";
import { db, isInitialized } from "../firebaseAdmin.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

// In-memory fallback if Firestore is not yet configured
let memoryPosts = [
  {
    id: "getting-started-with-iot",
    slug: "getting-started-with-iot",
    title: "Building Real-Time IoT Systems with ESP32 & Firebase",
    summary: "How to connect physical microcontrollers to web dashboards with sub-second latency.",
    content: "<p>Connecting physical microcontrollers like ESP32 to cloud platforms enables real-time telemetry, automated motor control, and continuous sensor monitoring.</p>",
    published: true,
    tags: ["IoT", "ESP32", "Firebase"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET /api/posts (Fetch all published posts, or all posts if includeUnpublished=true with admin auth)
router.get("/", async (req, res) => {
  try {
    const { all } = req.query;

    if (isInitialized && db) {
      let q = db.collection("posts");
      if (all !== "true") {
        q = q.where("published", "==", true);
      }
      const snapshot = await q.orderBy("updatedAt", "desc").get();
      const posts = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
        };
      });
      return res.json(posts);
    }

    // Fallback
    const filtered = all === "true" ? memoryPosts : memoryPosts.filter((p) => p.published);
    return res.json(filtered);
  } catch (err) {
    console.error("GET /api/posts error:", err);
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/posts/:id (Fetch single post by id or slug)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isInitialized && db) {
      const doc = await db.collection("posts").doc(id).get();
      if (doc.exists) {
        const data = doc.data();
        return res.json({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
        });
      }

      // Try slug query
      const snapshot = await db.collection("posts").where("slug", "==", id).limit(1).get();
      if (!snapshot.empty) {
        const d = snapshot.docs[0];
        const data = d.data();
        return res.json({
          id: d.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
        });
      }

      return res.status(404).json({ error: "Post not found" });
    }

    const post = memoryPosts.find((p) => p.id === id || p.slug === id);
    if (post) return res.json(post);
    return res.status(404).json({ error: "Post not found" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/posts (Create post - Admin Only)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { title, content, summary, published, tags, coverImage, slug } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const postData = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      content,
      summary: summary || content.replace(/<[^>]+>/g, " ").slice(0, 140) + "…",
      published: published !== undefined ? !!published : true,
      tags: Array.isArray(tags) ? tags : [],
      coverImage: coverImage || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isInitialized && db) {
      const docRef = await db.collection("posts").add(postData);
      return res.status(201).json({ id: docRef.id, ...postData, message: "Post created successfully" });
    }

    const newPost = { id: `post-${Date.now()}`, ...postData };
    memoryPosts.unshift(newPost);
    return res.status(201).json({ ...newPost, message: "Post created (memory fallback)" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/posts/:id (Update post - Admin Only)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date() };

    if (isInitialized && db) {
      await db.collection("posts").doc(id).update(updates);
      return res.json({ id, message: "Post updated successfully" });
    }

    const idx = memoryPosts.findIndex((p) => p.id === id);
    if (idx !== -1) {
      memoryPosts[idx] = { ...memoryPosts[idx], ...updates };
      return res.json({ id, message: "Post updated (memory fallback)" });
    }

    return res.status(404).json({ error: "Post not found" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /api/posts/:id (Delete post - Admin Only)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (isInitialized && db) {
      await db.collection("posts").doc(id).delete();
      return res.json({ id, message: "Post deleted successfully" });
    }

    memoryPosts = memoryPosts.filter((p) => p.id !== id);
    return res.json({ id, message: "Post deleted (memory fallback)" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
