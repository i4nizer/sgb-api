import { type RequestHandler } from "express";
import { UserRole } from "@/schemas/user.schema.js";

//

const requireUserRole = (role: UserRole): RequestHandler => async (req, res, next) => {
    if (!req.user) return res.status(401).send("Authorization required.")
    if (req.user.role != role) return res.status(403).send("Current user type is not allowed.")
    return next()
}

//

export default { requireUserRole }
