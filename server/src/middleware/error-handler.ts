import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err);

  if (err && typeof err === "object" && "status" in err && typeof err.status === "number") {
    const message = err instanceof Error ? err.message : "Request error";
    return res.status(err.status).json({ ok: false, error: message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    return res.status(409).json({ ok: false, error: "Unique field already exists" });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
    return res.status(404).json({ ok: false, error: "Not found" });
  }

  const message = err instanceof Error ? err.message : "Internal server error";
  res.status(500).json({ ok: false, error: message });
}
