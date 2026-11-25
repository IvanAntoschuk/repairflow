import { Router } from "express";
import { signToken, TOKEN_COOKIE, TOKEN_MAX_AGE_SECONDS } from "../lib/auth.js";
import { prisma } from "../lib/prisma.js";
import { verifyPassword } from "../lib/password.js";

export const authRouter = Router();

// shortcut: per-process counter only, use a shared store when running multiple instances
const attempts = new Map<string, { count: number; resetAt: number }>();

authRouter.post("/login", async (req, res, next) => {
  try {
    const { login, password } = (req.body ?? {}) as Record<string, unknown>;
    if (
      typeof login !== "string" || typeof password !== "string" ||
      !login.trim() || !password || login.length > 200 || password.length > 200
    ) {
      return res.status(400).json({ ok: false, error: "Login and password are required" });
    }

    const key = login.trim().toLowerCase();
    const now = Date.now();
    const entry = attempts.get(key);
    if (!entry || now >= entry.resetAt) {
      attempts.set(key, { count: 1, resetAt: now + 15 * 60_000 });
    } else if (++entry.count > 10) {
      return res.status(429).json({ ok: false, error: "Too many attempts" });
    }

    const user = await prisma.user.findUnique({ where: { login: key } });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return res.status(401).json({ ok: false, error: "Invalid login or password" });
    }

    attempts.delete(key);
    const token = await signToken(user.id);
    res.cookie(TOKEN_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: TOKEN_MAX_AGE_SECONDS * 1000,
      path: "/",
    });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});
