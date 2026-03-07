import env from "@/config/env.config.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from "@/models/user.model.js"
import { RequestHandler } from "express"
import { UserSafeSchema, UserSignInSchema } from "@/schemas/user.schema.js"

//

const signIn: RequestHandler = async (req, res) => {
    const { data, error, success } = UserSignInSchema.safeParse(req.body)
    if (!success) return res.status(400).send(error.issues.at(0)?.message)

    const user = await User.findOne({ where: { email: data.email }, raw: true })
    if (!user) return res.status(400).send("Incorrect credentials provided.")

    const matched = await bcrypt.compare(data.password, user.password)
    if (!matched) return res.status(400).send("Incorrect credentials provided.")

    const payload = UserSafeSchema.parse(user)
    const token = jwt.sign(payload, env.jwt.secret, { expiresIn: "1Day" })
    res.send({ user: payload, token })
}

const signOut: RequestHandler = async (req, res) => {
    if (!req.user) return res.status(401).send("Authorization is required.")
    res.status(204).send("User signed-out successfully.")
}

//

export default { signIn, signOut }
