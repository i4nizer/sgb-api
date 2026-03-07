import userController from "@/controllers/user.controller.js"
import express from "express"

//

const router = express.Router()
router.get("/", userController.get)
router.post("/", userController.post)
router.patch("/:uid(\\d+)", userController.patch)
router.delete("/:uid(\\d+)", userController.destroy)

//

export default { router }
