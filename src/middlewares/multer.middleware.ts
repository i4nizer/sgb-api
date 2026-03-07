import env from "@/config/env.config.js"
import multer from "multer"
import crypto from "crypto"

//

const filter: multer.Options["fileFilter"] = (_, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true)
    else cb(new Error("Only images are allowed."))
}

const filename: multer.DiskStorageOptions["filename"] = (_, file, cb) => {
    cb(null, `${10000000000000 - Date.now()}-${crypto.randomUUID()}-${file.originalname}`)
}

const storage = multer.diskStorage({
    filename,
    destination: `${process.cwd()}/${env.multer.path}`,
})

const upload = multer({
    storage,
    limits: { fieldSize: 5 * 1024 * 1024 },
    fileFilter: filter,
})

//

export default { upload }
