import authController from "@/controllers/auth.controller.js"
import express from "express"

//

const router = express.Router()
router.get("/me", authController.getMe)
router.post("/sign-in", authController.signIn)
router.post("/sign-out", authController.signOut)

//

export default { router }
