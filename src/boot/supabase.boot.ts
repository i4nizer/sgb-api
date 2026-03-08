import supabaseService from "@/services/supabase.service.js"

//

const boot = async () => {
    const { error } = await supabaseService.connect()
    console.info(`[Boot.Supabase]: Supabase service connection ${error ? `failed` : `successful`}.`)
}

//

export default { boot }
