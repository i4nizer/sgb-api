import { type IncomingMessage } from "http"
import { type Duplex } from "stream";
import espWebsocket from "@/websockets/esp.websocket.js";
import appWebsocket from "@/websockets/app.websocket.js";

//

const connect = async (req: IncomingMessage, socket: Duplex, head: NonSharedBuffer) => {
    const pathname = new URL(req.url!, "http://localhost").pathname
    if (pathname.startsWith("/ws/esp")) espWebsocket.upgrade(req, socket, head)
    else if (pathname.startsWith("/ws/app")) appWebsocket.upgrade(req, socket, head)
    else socket.destroy(new Error("Path provided doesn't handle websocket."))
}

//

export default { connect }
