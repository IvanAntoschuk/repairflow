import { Router } from 'express'
import { prisma } from '../lib/prisma.js'

export const publicOrdersRouter = Router()

publicOrdersRouter.get('/track/:trackId', async (req, res, next) => {
	try {
		const order = await prisma.order.findUnique({
			where: { trackId: req.params.trackId },
			select: {
				trackId: true,
				currentStatus: true,
				createdAt: true,
				device: true,
				description: true,
				price: true,
			},
		})
		if (!order) return res.status(404).json({ ok: false, error: 'Not found' })
		res.json({ data: [{ ...order, price: order.price.toString() }] })
	} catch (err) {
		next(err)
	}
})
