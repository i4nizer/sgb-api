import express from "express"
import cors from "cors"
import authRoute from "@/routes/auth.route.js"
import adminRoute from "@/routes/admin.route.js"

//

const router = express.Router()
router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use("/auth", authRoute.router)
router.use("/admin", adminRoute.router)

//

export default { router }
