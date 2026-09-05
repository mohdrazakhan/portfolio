import { Router } from "express";
import { generateToken, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Default admin credentials (override with .env.server)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "mohdrazakhan@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@12345";

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user = { email: ADMIN_EMAIL, role: "admin", name: "Mohd Raza Khan" };
      const token = generateToken(user);
      return res.json({ token, user, message: "Authentication successful" });
    }

    return res.status(401).json({ error: "Invalid email or password" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/verify (Token verification)
router.get("/verify", requireAdmin, (req, res) => {
  return res.json({ valid: true, user: req.user });
});

export default router;
