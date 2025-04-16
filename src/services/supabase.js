import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qsnpzrhsvwanbhezdsaz.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("SUPABASE_KEY is missing in the environment!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
