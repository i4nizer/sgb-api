import userRoute from "@/routes/user.route.js"
import express from "express"

//

const router = express.Router()
router.use("/user", userRoute.router)

//

export default { router }
