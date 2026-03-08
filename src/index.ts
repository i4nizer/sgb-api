import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import logMiddleware from "@/middlewares/log.middleware.js"
import env from "@/config/env.config.js"
import sequelizeBoot from "@/boot/sequelize.boot.js"
import apiRoute from "@/routes/api.route.js"
import adminBoot from "@/boot/admin.boot.js"

//

// --- Server
const api = express()

// --- Middlewares
const origin = [
    "http://localhost",
    "ionic://localhost",
    "http://localhost:3000",
    "capacitor://localhost",
    "https://smart-germination-box.vercel.app",
]
api.use(cors({ origin, credentials: true }))
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

//

// --- Server Ignition
api.listen(env.port, env.host, () => console.info(`[Api]: Active on ${env.protocol}://${env.host}:${env.port}.`))
