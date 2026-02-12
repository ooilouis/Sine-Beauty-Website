import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseClientKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseClientKey) {
    throw new Error('Missing Supabase environment variables (URL + publishable/anon key).');
}

export const supabase = createClient(supabaseUrl, supabaseClientKey);
