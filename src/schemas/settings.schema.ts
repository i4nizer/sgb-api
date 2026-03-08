import z from "zod"

//

const SettingsSchema = z.object({
    id: z.coerce.number().int(),
    sms: z.boolean().default(true),
    email: z.boolean().default(true),
    userId: z.coerce.number().int(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const SettingsQuerySchema = SettingsSchema
    .omit({ sms: true, email: true })
    .extend({ sms: z.boolean(), email: z.boolean() })
    .partial()

const SettingsCreateSchema = SettingsSchema.pick({ sms: true, email: true })
const SettingsUpdateSchema = SettingsSchema.pick({ sms: true, email: true }).partial()

//

type SettingsSchema = z.infer<typeof SettingsSchema>
type SettingsQuerySchema = z.infer<typeof SettingsQuerySchema>
type SettingsCreateSchema = z.infer<typeof SettingsCreateSchema>
type SettingsUpdateSchema = z.infer<typeof SettingsUpdateSchema>

//

export { SettingsSchema, SettingsQuerySchema, SettingsCreateSchema, SettingsUpdateSchema }
