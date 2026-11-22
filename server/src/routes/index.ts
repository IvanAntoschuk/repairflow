import { Router } from "express";
import { healthRouter } from "./health.js";
import { ordersRouter } from "./orders.js";

export const router = Router();

router.use(healthRouter);
router.use("/orders", ordersRouter);
