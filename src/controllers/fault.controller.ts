import { Fault } from "@/models/fault.model.js"
import { PaginationSchema } from "@/schemas/pagination.schema.js"
import { FaultQuerySchema } from "@/schemas/fault.schema.js"
import { type RequestHandler } from "express"
import { Op } from "sequelize"

//

const get: RequestHandler = async (req, res) => {
	const { data, error, success } = PaginationSchema.and(FaultQuerySchema).safeParse(req.query)
	if (!success) return res.status(400).send(error.issues.at(0)?.message)

	const keys = Object.keys(PaginationSchema.shape)
	const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

	const { alpha, omega, limit, offset } = data
	const where: any = Object.fromEntries(entries)
	const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
	if (Object.keys(createdAt).length) where.createdAt = createdAt

	const faults = await Fault.findAll({ where, raw: true, limit, offset, order: [["createdAt", "DESC"]] })
	res.send(faults)
}

//

export default { get }
