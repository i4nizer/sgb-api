import z from "zod";

//

const DeviceSchema = z.object({
    id: z.coerce.number().int(),
    token: z.string(),
    userId: z.coerce.number().int(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const DeviceQuerySchema = DeviceSchema.partial()
const DeviceCreateSchema = DeviceSchema.pick({ token: true })
const DeviceUpdateSchema = DeviceSchema.pick({ token: true }).partial()

//

type DeviceSchema = z.infer<typeof DeviceSchema>
type DeviceQuerySchema = z.infer<typeof DeviceQuerySchema>
type DeviceCreateSchema = z.infer<typeof DeviceCreateSchema>
type DeviceUpdateSchema = z.infer<typeof DeviceUpdateSchema>

//

export { DeviceSchema, DeviceQuerySchema, DeviceCreateSchema, DeviceUpdateSchema }
