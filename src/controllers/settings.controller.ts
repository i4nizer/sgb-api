import { Settings } from "@/models/settings.model.js"
import { SettingsCreateSchema, SettingsUpdateSchema } from "@/schemas/settings.schema.js"
import { type RequestHandler } from "express"

//

const get: RequestHandler = async (req, res) => {
    const uid = req.params.uid as string
    if (!uid) return res.status(400).send("User id required.")
    
    const defaults = { sms: true, email: true, userId: Number(uid) }
    const [settings] = await Settings.findOrCreate({ where: { userId: uid }, defaults })
    
    res.send(settings.dataValues)
}

const post: RequestHandler = async (req, res) => {
    const uid = req.params.uid as string
    if (!uid) return res.status(400).send("User id required.")
    
    const { data, error, success } = SettingsCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const settings = await Settings.create({ ...data, userId: Number(uid) })
    res.send(settings.dataValues)
}

const patch: RequestHandler = async (req, res) => {
    const uid = req.params.uid as string
    if (!uid) return res.status(400).send("User id required.")

    const { data, error, success } = SettingsUpdateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const settings = await Settings.findOne({ where: { userId: uid } })
    if (!settings) return res.status(404).send("Settings not found.")

    await settings.update(data)
    res.send(settings.dataValues)
}

const destroy: RequestHandler = async (req, res) => {
    const uid = req.params.uid as string
    if (!uid) return res.status(400).send("User id required.")

    const count = await Settings.destroy({ where: { userId: uid } })
    if (count <= 0) return res.status(404).send("Settings not found.")

    return res.status(204).send("Settings deleted successfully.")
}

//

export default { get, post, patch, destroy }
