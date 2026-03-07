import express from "express"
import cors from "cors"
import authRoute from "@/routes/auth.route.js"
import adminRoute from "@/routes/admin.route.js"
import logMiddleware from "@/middlewares/log.middleware.js"
import jwtMiddleware from "@/middlewares/jwt.middleware.js"
import captureRoute from "@/routes/capture.route.js"

//

const router = express.Router()
router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(logMiddleware.log)
router.use("/auth", authRoute.router)
router.use("/admin", jwtMiddleware.requireAuthToken, adminRoute.router)
router.use("/capture", jwtMiddleware.requireAuthToken, captureRoute.router)

//

export default { router }
