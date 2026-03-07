import { RequestHandler } from "express";

//

const log: RequestHandler = async (req, res, next) => {
    const { method, originalUrl } = req
    const origin = req.headers.origin || req.ip || "unknown";
    const alpha = new Date()
    res.on("finish", onFinish(res as any, originalUrl, alpha, method, origin))
    return next()
}

const onFinish = (
    res: Response,
    url: string,
    alpha: Date,
    method: string,
    origin: string
) => () => {
    const timestamp = alpha.toISOString()
    const duration = Date.now() - alpha.getTime()
    const status = (res as any).statusCode as number
    const data = `[Log.Mid]: ${origin} ${method} ${url} - ${status} - ${duration}ms - ${timestamp}`
    console.info(data)
}

//

export default { log }
