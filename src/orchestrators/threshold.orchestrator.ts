import { Device } from "@/models/device.model.js";
import { Threshold } from "@/models/threshold.model.js";
import { ReadingSchema } from "@/schemas/reading.schema.js";
import { ThresholdSchema } from "@/schemas/threshold.schema.js";
import { Notification } from "firebase-admin/messaging";
import firebaseService from "@/services/firebase.service.js";

//

const evaluate = async (reading: ReadingSchema) => {
    const tprms = Threshold.findAll({ where: { reading: reading.name } })
    const dprms = Device.findAll({ attributes: ["token"] })
    const [thresholds, devices] = await Promise.all([tprms, dprms])
    
    const triggereds = thresholds.filter((t) => isTriggered(reading, ThresholdSchema.parse(t.dataValues)))
    const tokens = devices.map((d) => d.token)
    
    const notifications = triggereds.map((t) => createNotification(ThresholdSchema.parse(t.dataValues)))
    const nprms = notifications.map((n) => firebaseService.fcm.sendEachForMulticast({ tokens, notification: n }))
    await Promise.all(nprms).then((res) => console.table(res))
}

const isTriggered = (reading: ReadingSchema, threshold: ThresholdSchema) => {
    return (reading.value > threshold.value && threshold.operator == ">")
        || (reading.value >= threshold.value && threshold.operator == ">=")
        || (reading.value <= threshold.value && threshold.operator == "<=")
        || (reading.value < threshold.value && threshold.operator == "<")
        || (reading.value == threshold.value && threshold.operator == "=")
        || (reading.value != threshold.value && threshold.operator == "!=")
}

const createNotification = (threshold: ThresholdSchema) => ({
    title: `${threshold.reading} Threshold Reached!`,
    body: `${threshold.message}. ${threshold.reading} is ${threshold.operator} ${threshold.value}.`
} as Notification)

//

export default { evaluate }
