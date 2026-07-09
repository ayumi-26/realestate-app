import { createClient } from '@supabase/supabase-js'

// SupabaseのProject URLとPublishable keyは.envファイルで管理する
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
