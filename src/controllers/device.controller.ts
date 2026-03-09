import { type RequestHandler } from "express"
import { Device } from "@/models/device.model.js"
import { DeviceCreateSchema } from "@/schemas/device.schema.js"

//

const post: RequestHandler = async (req, res) => {
    if (!req.user) return res.status(400).send("User not found.")
    
    const { data, error, success } = DeviceCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)
    
    const device = await Device.create({ ...data, userId: Number(req.user.id) })
    res.send(device.dataValues)
}

//

export default { post }
