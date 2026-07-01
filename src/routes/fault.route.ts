import express from "express"
import faultController from "@/controllers/fault.controller.js"

//

const router = express.Router()
router.get("/", faultController.get)

//

export default { router }
