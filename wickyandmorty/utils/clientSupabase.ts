import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./db_types";

const API_URL = "https://pqiohvmdtknipfcwaxmd.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxaW9odm1kdGtuaXBmY3dheG1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwOTkwNjgsImV4cCI6MjAyNTY3NTA2OH0.e7_OLfYAumgBotXCplkHlJTlivEzvxMSFfGPhmjGjIo";

export const supabase = createClient<Database>(API_URL, API_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
