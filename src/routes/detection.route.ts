import express from "express"
import detectionController from "@/controllers/detection.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", detectionController.get)
router.patch("/:did(\\d+)", detectionController.patch)
router.delete("/:did(\\d+)", detectionController.destroy)

//

export default { router }
