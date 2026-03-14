import { WsEvent, WsEventHandler } from "@/schemas/ws.event.schema.js";
import { Reading } from "@/models/reading.model.js";
import { ReadingCreateSchema } from "@/schemas/reading.schema.js";
import appWebsocket from "@/websockets/app.websocket.js";

//

const onCreateReading: WsEventHandler<ReadingCreateSchema> = async (data) => {
    const readings = await Reading.bulkCreate(data)
    const values = readings.map((r) => r.dataValues)
    const event: WsEvent = { name: "Reading", query: "Create", data: values }
    await appWebsocket.broadcast(event)
}

//

export default { onCreateReading }
