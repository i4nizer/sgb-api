import { WsEvent, WsEventHandler } from "@/schemas/ws.event.schema.js";
import { Reading } from "@/models/reading.model.js";
import { ReadingCreateSchema } from "@/schemas/reading.schema.js";
import appWebsocket from "@/websockets/app.websocket.js";
import thresholdOrchestrator from "@/orchestrators/threshold.orchestrator.js";
import { ThresholdUpdateSchema } from "@/schemas/threshold.schema.js";
import { Threshold } from "@/models/threshold.model.js";
import espWebsocket from "@/websockets/esp.websocket.js";

//

const onCreateReading: WsEventHandler<ReadingCreateSchema> = async (data) => {
    const readings = await Reading.bulkCreate(data)
    const values = readings.map((r) => r.dataValues)
    const event: WsEvent = { name: "Reading", query: "Create", data: values }
    await appWebsocket.broadcast(event)
    
    const eprms = readings.map((r) => thresholdOrchestrator.evaluate(r.dataValues))
    await Promise.all(eprms)
}

const onRetrieveThreshold: WsEventHandler = async () => {
    const thresholds = await Threshold.findAll({ raw: true })
    const event: WsEvent = { name: "Threshold", query: "Update", data: thresholds }
    await espWebsocket.broadcast(event)
}

//

export default { onCreateReading, onRetrieveThreshold }
