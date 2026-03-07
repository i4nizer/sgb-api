import { Op } from "sequelize"
import { Threshold } from "@/models/threshold.model.js"
import { PaginationSchema } from "@/schemas/pagination.schema.js"
import { type RequestHandler } from "express"
import { ThresholdCreateSchema, ThresholdQuerySchema, ThresholdUpdateSchema } from "@/schemas/threshold.schema.js"

//

const get: RequestHandler = async (req, res) => {
    const { data, error, success } = PaginationSchema.and(ThresholdQuerySchema).safeParse(req.query)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const keys = Object.keys(PaginationSchema.shape)
    const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

    const { alpha, omega, limit, offset } = data
    const where: any = Object.fromEntries(entries)
    const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
    if (Object.keys(createdAt).length) where.createdAt = createdAt

    const thresholds = await Threshold.findAll({ where: data, raw: true, limit, offset })
    res.send(thresholds)
}

const post: RequestHandler = async (req, res) => {
    const { data, error, success } = ThresholdCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const threshold = await Threshold.create(data)
    res.send(threshold.dataValues)
}

const patch: RequestHandler = async (req, res) => {
    const tid = req.params.tid as string
    if (!tid) return res.status(400).send("Threshold id required.")

    const { data, error, success } = ThresholdUpdateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const threshold = await Threshold.findByPk(tid)
    if (!threshold) return res.status(404).send("Threshold not found.")

    await threshold.update(data)
    res.send(threshold.dataValues)
}

const destroy: RequestHandler = async (req, res) => {
    const tid = req.params.tid as string
    if (!tid) return res.status(400).send("Threshold id required.")

    const count = await Threshold.destroy({ where: { id: tid } })
    if (count <= 0) return res.status(404).send("Threshold not found.")

    return res.status(204).send("Threshold deleted successfully.")
}

//

export default { get, post, patch, destroy }
