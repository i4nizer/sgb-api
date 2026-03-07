import express from "express"
import readingController from "@/controllers/reading.controller.js"

//

const router = express.Router()
router.get("/", readingController.get)
router.post("/", readingController.post)
router.patch("/:id", readingController.patch)
router.delete("/:id", readingController.destroy)

//

export default { router }
