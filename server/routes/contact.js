import { Router } from "express";
import { db, isInitialized } from "../firebaseAdmin.js";

const router = Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    const submission = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date(),
      ip: req.ip || req.headers["x-forwarded-for"] || "unknown",
      userAgent: req.headers["user-agent"] || "unknown",
    };

    if (isInitialized && db) {
      const docRef = await db.collection("inquiries").add(submission);
      return res.status(201).json({ id: docRef.id, message: "Message sent successfully!" });
    }

    console.log("📨 [Contact Form Submission]:", submission);
    return res.status(201).json({ message: "Message received successfully!" });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

export default router;
