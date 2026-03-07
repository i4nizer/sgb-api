import express from "express"
import settingsController from "@/controllers/settings.controller.js"

//

const router = express.Router({ mergeParams: true })
router.get("/", settingsController.get)
router.post("/", settingsController.post)
router.patch("/", settingsController.patch)
router.delete("/", settingsController.destroy)

//

export default { router }
