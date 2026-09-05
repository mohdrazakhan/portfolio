import { Router } from "express";
import { db, isInitialized } from "../firebaseAdmin.js";
import { requireAdmin } from "../middleware/auth.js";
import { activities as defaultActivities } from "../../src/data/activities.js";

const router = Router();
let memoryActivities = [...defaultActivities];

// GET /api/activities
router.get("/", async (req, res) => {
  try {
    if (isInitialized && db) {
      const snapshot = await db.collection("activities").orderBy("date", "desc").get();
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        return res.json(list);
      }
    }
    return res.json(memoryActivities);
  } catch (err) {
    console.error("GET /api/activities error:", err);
    return res.json(memoryActivities);
  }
});

// POST /api/activities (Admin Only)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { title, date, type, description, link } = req.body;
    const actData = {
      title,
      date: date || new Date().toISOString().split("T")[0],
      type: type || "update",
      description: description || "",
      link: link || "#",
      createdAt: new Date(),
    };

    if (isInitialized && db) {
      const docRef = await db.collection("activities").add(actData);
      return res.status(201).json({ id: docRef.id, ...actData, message: "Activity added successfully" });
    }

    const newAct = { id: `act-${Date.now()}`, ...actData };
    memoryActivities.unshift(newAct);
    return res.status(201).json({ ...newAct, message: "Activity added (memory fallback)" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/activities/:id (Admin Only)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, type, description, link } = req.body;
    const updateData = {
      ...(title && { title }),
      ...(date && { date }),
      ...(type && { type }),
      ...(description !== undefined && { description }),
      ...(link !== undefined && { link }),
      updatedAt: new Date(),
    };

    if (isInitialized && db) {
      await db.collection("activities").doc(id).update(updateData);
      return res.json({ id, ...updateData, message: "Activity updated successfully" });
    }

    const index = memoryActivities.findIndex((a) => a.id === id);
    if (index !== -1) {
      memoryActivities[index] = { ...memoryActivities[index], ...updateData };
      return res.json({ ...memoryActivities[index], message: "Activity updated (memory fallback)" });
    }
    return res.status(404).json({ error: "Activity not found" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /api/activities/:id (Admin Only)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (isInitialized && db) {
      await db.collection("activities").doc(id).delete();
      return res.json({ id, message: "Activity deleted successfully" });
    }

    memoryActivities = memoryActivities.filter((a) => a.id !== id);
    return res.json({ id, message: "Activity deleted (memory fallback)" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
