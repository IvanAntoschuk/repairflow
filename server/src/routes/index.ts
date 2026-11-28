import { Router } from "express"
import { requireAuth } from "../middleware/require-auth.js"
import { authRouter } from "./auth.js"
import { healthRouter } from "./health.js"
import { ordersRouter } from "./orders.js"
import { publicOrdersRouter } from './publicOrders.js'

export const router = Router()

router.use(healthRouter)
router.use("/auth", authRouter)
router.use("/orders", requireAuth, ordersRouter)
router.use("/public-orders", publicOrdersRouter)
