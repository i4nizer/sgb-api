import captureController from "@/controllers/capture.controller.js"
import express from "express"

//

const router = express.Router()
router.get("/", captureController.get)
router.post("/", captureController.post)
router.patch("/:cid(\\d+)", captureController.patch)
router.delete("/:cid(\\d+)", captureController.destroy)
router.get("/image/:filename", captureController.serve)

//

export default { router }
