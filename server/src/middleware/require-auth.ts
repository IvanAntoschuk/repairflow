import type { RequestHandler } from "express";
import { readTokenCookie, verifyToken } from "../lib/auth.js";

export const requireAuth: RequestHandler = async (req, res, next) => {
  const userId = await verifyToken(readTokenCookie(req.headers.cookie));
  if (!userId) return res.status(401).json({ ok: false, error: "Unauthorized" });
  next();
};
