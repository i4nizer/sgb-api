import z from "zod";

//

const UserRole = ["Admin", "Farmer"] as const
type UserRole = (typeof UserRole)[number]

//

const UserSchema = z.object({
    id: z.coerce.number().int(),
    name: z.string().min(1),
    role: z.enum(UserRole),
    email: z.email(),
    phone: z.string().length(11),
    password: z.string().min(8),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const UserSafeSchema = UserSchema.omit({ password: true })
const UserQuerySchema = UserSchema.partial()
const UserSignInSchema = UserSchema.pick({ email: true, password: true })
const UserCreateSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true })
const UserUpdateSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial()

//

type UserSchema = z.infer<typeof UserSchema>
type UserSafeSchema = z.infer<typeof UserSafeSchema>
type UserQuerySchema = z.infer<typeof UserQuerySchema>
type UserSignInSchema = z.infer<typeof UserSignInSchema>
type UserCreateSchema = z.infer<typeof UserCreateSchema>
type UserUpdateSchema = z.infer<typeof UserUpdateSchema>

//

export {
    UserSchema, 
    UserSafeSchema, 
    UserQuerySchema, 
    UserSignInSchema,
    UserCreateSchema,
    UserUpdateSchema,
}
