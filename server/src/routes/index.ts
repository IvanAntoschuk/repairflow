import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { authRouter } from "./auth.js";
import { healthRouter } from "./health.js";
import { ordersRouter } from "./orders.js";

export const router = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/orders", requireAuth, ordersRouter);
