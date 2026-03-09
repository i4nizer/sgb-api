import env from "@/config/env.config.js"
import admin from "firebase-admin"

//

admin.initializeApp({ credential: admin.credential.cert(env.firebase as admin.ServiceAccount) })
const fcm = admin.messaging()

//

const connect = async () => {
    return await fcm.send({ topic: "test", notification: { title: "FCM Test" } }, true)
}

//

export default { fcm, connect }
