import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "npm:@supabase/supabase-js"

const supabase = createClient (
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

);

function IsMondayMidnight(timezone){

    const now = Temporal.Now.zonedDateTimeISO(timezone);

    if(now.dayOfWeek === 1 && now.hour === 0){
        return true
    } else {
        return false
    }

}

Deno.serve(async()=>{

    const {data:users,errors} = await supabase.from('profiles').select("id, timezone");

    if(errors){
        console.log(errors)
        return new Response("Error",{status:500});
    }

    for(const user of users){
        const timeZone = user.timezone;

        if(IsMondayMidnight(timeZone)){
            console.log(`Would delete habits for user: ${user.id}`);
        }


    }


    return new Response("Checked all users", { status: 200 });



})
