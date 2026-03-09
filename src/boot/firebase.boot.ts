import firebaseService from "@/services/firebase.service.js"

//

const boot = async () => {
    await firebaseService
        .connect()
        .then(() => console.info(`[Boot.Firebase]: Firebase connection successful.`))
        .catch(() => console.info(`[Boot.Firebase]: Firebase connection failed.`))
}

//

export default { boot }
