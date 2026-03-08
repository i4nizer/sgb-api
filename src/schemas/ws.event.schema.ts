import { z } from "zod"

//

const WsEventQuery = ["Create", "Retrieve", "Update", "Delete"] as const
type WsEventQuery = (typeof WsEventQuery)[number]

//

type WsEventHandler<T extends object = object> = (data: T[]) => Promise<void> | void

type WsEventOptions<T extends object = object> = {
	name: string
	query: WsEventQuery
	handler: WsEventHandler<T>
}

type WsEvent<T extends object = object> = {
	name: string
	data: T[]
	query: WsEventQuery
}

//

const WsEventSchema = z.object({
    name: z.string().min(1),
    data: z.array(z.unknown()),
    query: z.enum(WsEventQuery),
})

type WsEventSchema = z.infer<typeof WsEventSchema>

//

export { WsEventQuery, WsEventSchema }
export type { WsEvent, WsEventOptions, WsEventHandler }
