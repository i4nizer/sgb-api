import { UserSafeSchema } from "@/schemas/user.schema.ts";

//

declare global {
    namespace Express {
        interface Request {
            user?: UserSafeSchema
        }
    }
}

//

export { }
