import { RawData, WebSocket, WebSocketServer } from "ws";
import { type IncomingMessage } from "http"
import { type Duplex } from "stream";
import { WsEvent, WsEventHandler, WsEventOptions, WsEventQuery, WsEventSchema } from "@/schemas/ws.event.schema.js";

//

const wss = new WebSocketServer({ noServer: true, autoPong: true })
const sockets: WebSocket[] = []
const handlers: WsEventOptions<any>[] = []

wss.on("connection", (ws: WebSocket) => onConnect(ws))

//

const upgrade = async (
    req: IncomingMessage,
    socket: Duplex,
    head: NonSharedBuffer
) => {
    wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws))
}

const subscribe = async <T extends object = any>(
    name: string,
    query: WsEventQuery,
    handler: WsEventHandler<T>
) => {
    handlers.push({ name, query, handler })
}

const broadcast = async <T extends object = any>(msg: string | WsEvent<T>) => {
    const data = typeof msg == "string" ? msg : JSON.stringify(msg)
    const promises = sockets
        .filter((s) => s.readyState == s.OPEN)
        .map((s) => Promise.resolve().then(() => s.send(data)))
    await Promise.all(promises).catch(() => {})
}

//

const onConnect = async (ws: WebSocket) => {
    sockets.push(ws)
    ws.on("message", onMessage)
    ws.on("close", onDisconnect(ws))
    console.info(`[Ws.Esp]: Esp websocket device connected.`)
}

const onMessage = async (data: RawData, isBinary: boolean) => {
    if (isBinary) return console.info(`[Ws.Esp]: Esp websocket received binary.`)

    const dstr = data.toString()
    const json = await Promise
        .resolve()
        .then(() => JSON.parse(dstr))
        .catch(() => undefined)
    if (!json) return console.info(`[Ws.Esp]: Esp websocket received non-json message: ${dstr}.`)

    const { data: parsed, success } = WsEventSchema.safeParse(json)
    if (!success) return console.info(`[Ws.Esp]: Esp websocket received invalid event.`)

    const onError = (e: any) => console.error(`[Ws.Esp]: Esp websocket error: ${e?.message}.`)
    const promises = handlers
        .filter((h) => h.name == parsed.name && h.query == parsed.query)
        .map((h) => Promise.resolve().then(() => h.handler(parsed.data)).catch(onError))
    await Promise.all(promises)
}

const onDisconnect = (ws: WebSocket) => async (code: number, reason: Buffer) => {
    const index = sockets.indexOf(ws)
    if (index !== -1) sockets.splice(index, 1)
    console.info(`[Ws.Esp]: Esp websocket device disconnected - ${code} - ${reason.toString()}.`)
}

//

export default { upgrade, subscribe, broadcast }
