import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { isInitialized } from "./firebaseAdmin.js";

import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import projectsRoutes from "./routes/projects.js";
import activitiesRoutes from "./routes/activities.js";
import contactRoutes from "./routes/contact.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env.server") });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup: allow local dev and production frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    timestamp: new Date().toISOString(),
    firebaseConnected: isInitialized,
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/contact", contactRoutes);

// 404 Handler for API routes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 [API Server Error]:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 [API Server] Running at http://localhost:${PORT}`);
    console.log(`🔒 [Firebase Admin] Status: ${isInitialized ? "Connected" : "Fallback Mode"}`);
  });
}

export default app;
