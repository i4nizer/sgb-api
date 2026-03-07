import env from "@/config/env.config.js"
import { User } from "@/models/user.model.js"
import bcrypt from "bcrypt"

//

const boot = async () => {
    const { name, reset, email, phone, password } = env.admin
    const hashed = await bcrypt.hash(password, 10)
    
    const defaults = { name, role: "Admin", email, phone, password: hashed }
    const [user] = await User.findOrCreate({ where: {}, defaults })
    
    if (reset) await user.update(defaults)
    console.info(`[Boot.Admin]: Admin ${reset ? 're-' : ''}created successfully.`)
}

//

export default { boot }
