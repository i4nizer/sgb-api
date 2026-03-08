import express from "express"
import jwtMiddleware from "@/middlewares/jwt.middleware.js"
import authRoute from "@/routes/auth.route.js"
import userRoute from "@/routes/user.route.js"
import captureRoute from "@/routes/capture.route.js"
import readingRoute from "@/routes/reading.route.js"
import thresholdRoute from "@/routes/threshold.route.js"

//

const router = express.Router()
router.use("/auth", authRoute.router)
router.use("/user", jwtMiddleware.requireAuthToken, userRoute.router)
router.use("/capture", jwtMiddleware.requireAuthToken, captureRoute.router)
router.use("/reading", jwtMiddleware.requireAuthToken, readingRoute.router)
router.use("/threshold", jwtMiddleware.requireAuthToken, thresholdRoute.router)

//

export default { router }
