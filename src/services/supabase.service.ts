import env from '@/config/env.config.js'
import { createClient } from '@supabase/supabase-js'

//

// --- Instance
const supabase = createClient(env.supabase.url, env.supabase.key)

const connect = async () => {
    return await supabase
        .from("users")
        .select("*")
        .limit(1)
}

//

export default { supabase, connect }
