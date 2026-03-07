import express from "express"
import thresholdController from "@/controllers/threshold.controller.js"

//

const router = express.Router()
router.get("/", thresholdController.get)
router.post("/", thresholdController.post)
router.patch("/:tid(\\d+)", thresholdController.patch)
router.delete("/:tid(\\d+)", thresholdController.destroy)

//

export default { router }
