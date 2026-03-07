import express from "express"
import env from "@/config/env.config.js"
import sequelizeBoot from "@/boot/sequelize.boot.js"

//

// --- Server
const api = express()

// --- Bootstrapping
await sequelizeBoot.boot()

//

api.get("/", (_, res) => res.send("I am api only."))
api.listen(env.port, env.host, () => console.info(`[Api]: Active on ${env.protocol}://${env.host}:${env.port}.`))
