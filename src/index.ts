import express from "express"
import env from "@/config/env.config.js"
import sequelizeBoot from "@/boot/sequelize.boot.js"
import apiRoute from "@/routes/api.route.js"

//

// --- Server
const api = express()

// --- Routes
api.get("/", (_, res) => res.send("I am api only."))
api.use("/api", apiRoute.router)

// --- Bootstrapping
await sequelizeBoot.boot()

//

// --- Server Ignition
api.listen(env.port, env.host, () => console.info(`[Api]: Active on ${env.protocol}://${env.host}:${env.port}.`))
