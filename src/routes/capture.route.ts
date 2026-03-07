import captureController from "@/controllers/capture.controller.js"
import detectionController from "@/controllers/detection.controller.js"
import detectionRoute from "@/routes/detection.route.js"
import express from "express"

//

const router = express.Router()
router.get("/", captureController.get)
router.post("/", captureController.post)
router.patch("/:cid(\\d+)", captureController.patch)
router.delete("/:cid(\\d+)", captureController.destroy)
router.get("/image/:filename", captureController.serve)
router.use("/detection", detectionRoute.router)
router.post("/:cid(\\d+)/detection", detectionController.post)

//

export default { router }
