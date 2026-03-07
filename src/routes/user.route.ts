import express from "express"
import userController from "@/controllers/user.controller.js"
import settingsRoute from "@/routes/settings.route.js"

//

const router = express.Router()
router.get("/", userController.get)
router.post("/", userController.post)
router.patch("/:uid(\\d+)", userController.patch)
router.delete("/:uid(\\d+)", userController.destroy)
router.use("/:uid(\\d+)/settings", settingsRoute.router)

//

export default { router }
