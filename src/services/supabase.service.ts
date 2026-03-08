import env from '@/config/env.config.js'
import { createClient } from '@supabase/supabase-js'

//

// --- Instance
const supabase = createClient(env.supabase.url, env.supabase.key)

const connect = async () => await supabase.rpc("now")

//

export default { supabase, connect }
