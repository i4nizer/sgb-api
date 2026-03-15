import captureController from "@/controllers/capture.controller.js"
import detectionController from "@/controllers/detection.controller.js"
import multerMiddleware from "@/middlewares/multer.middleware.js"
import detectionRoute from "@/routes/detection.route.js"
import express from "express"

//

const router = express.Router()
router.get("/", captureController.get)
router.post("/", multerMiddleware.upload.single("image"), captureController.post)
router.patch("/:cid", captureController.patch)
router.delete("/:cid", captureController.destroy)
router.get("/image/:filename", captureController.serve)
router.use("/detection", detectionRoute.router)
router.post("/:cid/detection", detectionController.post)
router.post("/:cid/detection/bulk", detectionController.postBulk)

//

export default { router }
