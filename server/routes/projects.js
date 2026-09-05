import { Router } from "express";
import { db, isInitialized } from "../firebaseAdmin.js";
import { requireAdmin } from "../middleware/auth.js";
import defaultProjects from "../../src/data/projects.js";

const router = Router();
let memoryProjects = [...defaultProjects];

// GET /api/projects
router.get("/", async (req, res) => {
  try {
    if (isInitialized && db) {
      const snapshot = await db.collection("projects").orderBy("order", "asc").get();
      if (!snapshot.empty) {
        const projects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return res.json(projects);
      }
    }
    return res.json(memoryProjects);
  } catch (err) {
    console.error("GET /api/projects error:", err);
    return res.json(memoryProjects);
  }
});

// GET /api/projects/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (isInitialized && db) {
      const doc = await db.collection("projects").doc(id).get();
      if (doc.exists) {
        return res.json({ id: doc.id, ...doc.data() });
      }
    }
    const project = memoryProjects.find((p) => p.id === id);
    if (project) return res.json(project);
    return res.status(404).json({ error: "Project not found" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/projects (Create project - Admin Only)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      order: req.body.order || memoryProjects.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isInitialized && db) {
      const docRef = req.body.id
        ? db.collection("projects").doc(req.body.id)
        : db.collection("projects").doc();
      await docRef.set(projectData, { merge: true });
      return res.status(201).json({ id: docRef.id, ...projectData, message: "Project saved successfully" });
    }

    const id = req.body.id || `proj-${Date.now()}`;
    const newProj = { id, ...projectData };
    memoryProjects.push(newProj);
    return res.status(201).json({ ...newProj, message: "Project saved (memory fallback)" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/projects/:id (Update project - Admin Only)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date() };

    if (isInitialized && db) {
      await db.collection("projects").doc(id).update(updates);
      return res.json({ id, message: "Project updated successfully" });
    }

    const idx = memoryProjects.findIndex((p) => p.id === id);
    if (idx !== -1) {
      memoryProjects[idx] = { ...memoryProjects[idx], ...updates };
      return res.json({ id, message: "Project updated (memory fallback)" });
    }

    return res.status(404).json({ error: "Project not found" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /api/projects/:id (Delete project - Admin Only)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (isInitialized && db) {
      await db.collection("projects").doc(id).delete();
      return res.json({ id, message: "Project deleted successfully" });
    }

    memoryProjects = memoryProjects.filter((p) => p.id !== id);
    return res.json({ id, message: "Project deleted (memory fallback)" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
