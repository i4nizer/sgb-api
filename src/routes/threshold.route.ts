import express from "express"
import thresholdController from "@/controllers/threshold.controller.js"

//

const router = express.Router()
router.get("/", thresholdController.get)
router.post("/", thresholdController.post)
router.patch("/:tid", thresholdController.patch)
router.delete("/:tid", thresholdController.destroy)

//

export default { router }
