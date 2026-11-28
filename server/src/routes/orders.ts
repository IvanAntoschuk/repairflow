import { Prisma } from "@prisma/client"
import { Router } from "express"
import { prisma } from "../lib/prisma.js"

export const ordersRouter = Router()

function toOrderPayload(body: Record<string, unknown>) {
  const data: Record<string, unknown> = {}
  const str = (k: string) => (typeof body[k] === "string" ? body[k] : undefined)
  const req = (k: string) => {
    const v = str(k)
    if (!v) throw Object.assign(new Error(`${k} is required`), { status: 400 })
    return v
  }

  if ("trackId" in body) data.trackId = req("trackId")
  if ("customerPhone" in body) data.customerPhone = req("customerPhone")
  if ("customerName" in body) data.customerName = req("customerName")
  if ("master" in body) data.master = req("master")
  if ("device" in body) data.device = req("device")
  if ("description" in body) data.description = req("description")
  if ("currentStatus" in body) data.currentStatus = req("currentStatus")

  if ("phonePassword" in body)
    data.phonePassword = str("phonePassword") || null
  if ("imei" in body) data.imei = str("imei") || null
  if ("price" in body) {
    const raw = body.price
    const n = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN
    if (!Number.isFinite(n))
      throw Object.assign(new Error("price is required"), { status: 400 })
    data.price = new Prisma.Decimal(n)
  }

  return data
}

function serialize(order: any) {
  return { ...order, price: order.price?.toString?.() ?? order.price }
}

ordersRouter.get("/", async (req, res, next) => {
  try {
    const start = Number(req.query._start ?? 0)
    const end = Number(req.query._end ?? 10)
    const sort = typeof req.query._sort === "string" ? req.query._sort : "createdAt"
    const order = req.query._order === "ASC" ? "asc" : "desc"
    const q = typeof req.query.q === "string" ? req.query.q.trim() : ""
    const status =
      typeof req.query.currentStatus === "string" ? req.query.currentStatus : ""

    const allowedSort = new Set([
      "id",
      "trackId",
      "createdAt",
      "updatedAt",
      "customerPhone",
      "customerName",
      "master",
      "device",
      "currentStatus",
      "price",
    ])
    const sortField = allowedSort.has(sort) ? sort : "createdAt"

    const where: Prisma.OrderWhereInput = {}
    if (status) where.currentStatus = status
    if (q) {
      where.OR = [
        { trackId: { contains: q, mode: "insensitive" } },
        { customerName: { contains: q, mode: "insensitive" } },
        { customerPhone: { contains: q, mode: "insensitive" } },
        { device: { contains: q, mode: "insensitive" } },
        { imei: { contains: q, mode: "insensitive" } },
        { master: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ]
    }

    const [data, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { [sortField]: order } as any,
        skip: Number.isFinite(start) ? start : 0,
        take: Number.isFinite(end - start) ? Math.max(0, end - start) : 10,
      }),
      prisma.order.count({ where }),
    ])

    res.json({ data: data.map(serialize), total })
  } catch (err) {
    next(err)
  }
})

ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({ where: { id: req.params.id } })
    if (!order) return res.status(404).json({ ok: false, error: "Not found" })
    res.json({ data: serialize(order) })
  } catch (err) {
    next(err)
  }
})

ordersRouter.post("/", async (req, res, next) => {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>
    const required = [
      "trackId",
      "customerPhone",
      "customerName",
      "master",
      "device",
      "description",
      "currentStatus",
      "price",
    ]
    for (const k of required) if (!(k in body)) throw Object.assign(new Error(`${k} is required`), { status: 400 })
    const data = toOrderPayload(body) as Prisma.OrderCreateInput
    const order = await prisma.order.create({ data })
    res.status(201).json({ data: serialize(order) })
  } catch (err) {
    next(err)
  }
})

ordersRouter.put("/:id", async (req, res, next) => {
  try {
    const data = toOrderPayload((req.body ?? {}) as Record<string, unknown>) as Prisma.OrderUpdateInput
    const order = await prisma.order.update({ where: { id: req.params.id }, data })
    res.json({ data: serialize(order) })
  } catch (err) {
    next(err)
  }
})

ordersRouter.patch("/:id", async (req, res, next) => {
  try {
    const data = toOrderPayload((req.body ?? {}) as Record<string, unknown>) as Prisma.OrderUpdateInput
    const order = await prisma.order.update({ where: { id: req.params.id }, data })
    res.json({ data: serialize(order) })
  } catch (err) {
    next(err)
  }
})

ordersRouter.delete("/:id", async (req, res, next) => {
  try {
    const order = await prisma.order.delete({ where: { id: req.params.id } })
    res.json({ data: serialize(order) })
  } catch (err) {
    next(err)
  }
})
