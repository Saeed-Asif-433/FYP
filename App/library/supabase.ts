import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ovofsewryvpqkieqtncm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92b2ZzZXdyeXZwcWtpZXF0bmNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NDUxNjQsImV4cCI6MjA2MjUyMTE2NH0.pDgwPJ-f6j9AdDwJjwuC5xOZa_bnsZP-Ku3lcTz1wRY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})