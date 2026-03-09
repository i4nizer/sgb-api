import express from "express"
import http from "http"
import cors from "cors"
import cookieParser from "cookie-parser"
import logMiddleware from "@/middlewares/log.middleware.js"
import env from "@/config/env.config.js"
import sequelizeBoot from "@/boot/sequelize.boot.js"
import apiRoute from "@/routes/api.route.js"
import adminBoot from "@/boot/admin.boot.js"
import websocketService from "@/services/websocket.service.js"
import supabaseBoot from "@/boot/supabase.boot.js"
import firebaseBoot from "@/boot/firebase.boot.js"

//

// --- Server
const api = express()

// --- Middlewares
api.use(cors({ origin: env.cors.origin, credentials: true }))
api.use(cookieParser())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(logMiddleware.log)

// --- Routes
api.get("/", (_, res) => res.send("I am api only."))
api.use("/api", apiRoute.router)

// --- Bootstrapping
await sequelizeBoot.boot()
await adminBoot.boot()
await supabaseBoot.boot()
await firebaseBoot.boot()

// --- Websocket Server
const server = http.createServer(api)
server.on("upgrade", websocketService.connect)
server.listen(env.port, env.host, () => console.log(`[Api]: Active on ${env.protocol}://${env.host}:${env.port}.`))
