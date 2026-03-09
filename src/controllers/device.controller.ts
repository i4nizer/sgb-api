import { type RequestHandler } from "express"
import { Device } from "@/models/device.model.js"
import { DeviceCreateSchema } from "@/schemas/device.schema.js"
import firebaseService from "@/services/firebase.service.js"

//

const post: RequestHandler = async (req, res) => {
    if (!req.user) return res.status(400).send("User not found.")
    
    const { data, error, success } = DeviceCreateSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)
    
    const defaults = { ...data, userId: Number(req.user.id) }
    const [device, created] = await Device.findOrCreate({ where: { userId: req.user.id }, defaults })

    if (created) await firebaseService.fcm.send({ token: data.token, notification: { title: "Welcome to SGB!" } })
    await device.update(data)
    res.send(device.dataValues)
}

//

export default { post }
