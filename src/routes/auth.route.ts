import authController from "@/controllers/auth.controller.js"
import express from "express"

//

const router = express.Router()
router.post("/sign-in", authController.signIn)
router.post("/sign-out", authController.signOut)

//

export default { router }
