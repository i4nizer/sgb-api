import z from "zod";

//

const ReadingSchema = z.object({
    id: z.coerce.number().int(),
    name: z.string().min(1),
    unit: z.string().default(""),
    icon: z.string().default("mdi-thermometer"),
    value: z.coerce.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})

const ReadingQuerySchema = ReadingSchema.partial()
const ReadingCreateSchema = ReadingSchema.pick({ name: true, unit: true, icon: true, value: true })
const ReadingUpdateSchema = ReadingSchema.pick({ name: true, unit: true, icon: true, value: true }).partial()

//

type ReadingSchema = z.infer<typeof ReadingSchema>
type ReadingQuerySchema = z.infer<typeof ReadingQuerySchema>
type ReadingCreateSchema = z.infer<typeof ReadingCreateSchema>
type ReadingUpdateSchema = z.infer<typeof ReadingUpdateSchema>

//

export { ReadingSchema, ReadingQuerySchema, ReadingCreateSchema, ReadingUpdateSchema }
