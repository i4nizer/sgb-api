import env from '@/config/env.config.js'
import { createClient } from '@supabase/supabase-js'

//

const supabase = createClient(env.supabase.url, env.supabase.key)

//

export default { supabase }
