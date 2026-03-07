import express from "express"
import env from "@/config/env.config.js"

//

const api = express()

//

api.get("/", (_, res) => res.send("I am api only."))
api.listen(env.port, env.host, () => console.info(`[Api]: Active on ${env.protocol}://${env.host}:${env.port}.`))
