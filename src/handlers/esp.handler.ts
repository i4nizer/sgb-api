import { WsEvent, WsEventHandler } from "@/schemas/ws.event.schema.js"
import { Reading } from "@/models/reading.model.js"
import { ReadingCreateSchema } from "@/schemas/reading.schema.js"
import appWebsocket from "@/websockets/app.websocket.js"
import thresholdOrchestrator from "@/orchestrators/threshold.orchestrator.js"
import faultOrchestrator from "@/orchestrators/fault.orchestrator.js"
import { Threshold } from "@/models/threshold.model.js"
import espWebsocket from "@/websockets/esp.websocket.js"

//

type NullableReadingCreateSchema = Omit<ReadingCreateSchema, "value"> & { value: number | null }

//

const onCreateReading: WsEventHandler<NullableReadingCreateSchema> = async data => {
	const faultReadings = data.filter(isNullValueReading)
	const validReadings = data.filter(isValidValueReading)

	const fprms = faultReadings.map(createNullReadingFault)
	const readings = validReadings.length ? await Reading.bulkCreate(validReadings) : []
	const values = readings.map(r => r.dataValues)

	if (values.length) {
		const event: WsEvent = { name: "Reading", query: "Create", data: values }
		await appWebsocket.broadcast(event)
	}

	const eprms = readings.map(r => thresholdOrchestrator.evaluate(r.dataValues))
	await Promise.all([...eprms, ...fprms])
}

const onRetrieveThreshold: WsEventHandler = async () => {
	const thresholds = await Threshold.findAll({ raw: true })
	const event: WsEvent = { name: "Threshold", query: "Update", data: thresholds }
	await espWebsocket.broadcast(event)
}

const isNullValueReading = (reading: NullableReadingCreateSchema) => reading.value == null

const isValidValueReading = (reading: NullableReadingCreateSchema): reading is ReadingCreateSchema =>
	reading.value != null

const createNullReadingFault = async (reading: NullableReadingCreateSchema) => {
	const title = `${reading.name} Reading Fault`
	const message = "DHT22 sensor reading is null."
	return await faultOrchestrator.create({ title, message })
}

//

export default { onCreateReading, onRetrieveThreshold }
