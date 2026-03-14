import bcrypt from "bcrypt"
import { Op } from "sequelize"
import { User } from "@/models/user.model.js"
import { RequestHandler } from "express"
import { PaginationSchema } from "@/schemas/pagination.schema.js"
import { UserCreateSchema, UserQuerySchema, UserUpdateSchema } from "@/schemas/user.schema.js"

//

const get: RequestHandler = async (req, res) => {
    const { data, error, success } = PaginationSchema.and(UserQuerySchema).safeParse(req.query)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const keys = Object.keys(PaginationSchema.shape)
    const entries = Object.entries(data).filter(([k, v]) => !keys.includes(k) && v != undefined)

    const { alpha, omega, limit, offset } = data
    const where: any = Object.fromEntries(entries)
    const createdAt = { ...(alpha && { [Op.gte]: alpha }), ...(omega && { [Op.lte]: omega }) }
    if (Object.keys(createdAt).length) where.createdAt = createdAt

    const users = await User.findAll({ where, raw: true, limit, offset })
    res.send(users)
}

const post: RequestHandler = async (req, res) => {
    const { data, error, success } = UserCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const exists = await User.count({ where: { email: data.email } }) > 0
    if (exists) return res.status(400).send(`User email already in use.`)

    const hashed = await bcrypt.hash(data.password, 10)
    const user = await User.create({ ...data, password: hashed })
    res.send(user.dataValues)
}

const patch: RequestHandler = async (req, res) => {
    const uid = req.params.uid as string
    if (!uid) return res.status(400).send("User id required.")

    const { data, error, success } = UserUpdateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)
    
    const user = await User.findByPk(uid)
    if (!user) return res.status(404).send("User not found.")

    const hashed = data.password ? await bcrypt.hash(data.password, 10) : user?.password
    await user.update({ ...data, password: hashed })
    res.send(user.dataValues)
}

const destroy: RequestHandler = async (req, res) => {
    const uid = req.params.uid as string
    if (!uid) return res.status(400).send("User id required.")

    const user = await User.findByPk(uid)
    if (!user) return res.status(404).send("User not found.")
    
    await user.destroy()
    res.status(204).send("User deleted successfully.")
}

//

export default { get, post, patch, destroy }
