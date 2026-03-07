import jwt from "jsonwebtoken"
import env from "@/config/env.config.js";
import { type RequestHandler } from "express";
import { type UserSafeSchema } from "@/schemas/user.schema.js";

//

const requireAuthToken: RequestHandler = async (req, res, next) => {
    const token = (req.headers.authorization || "").split(" ").at(1)
    if (!token) return res.status(401).send("Authorization is required.")

    await Promise
        .resolve()
        .then(() => jwt.verify(token, env.jwt.secret))
        .then((res) => req.user = res as UserSafeSchema)
        .then(() => next())
        .catch(() => res.status(401).send("Invalid authorization provided."))
}

//

export default { requireAuthToken }
