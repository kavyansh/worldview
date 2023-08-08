import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uagzrgqjxbitwewaoapt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhZ3pyZ3FqeGJpdHdld2FvYXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1MTE4NDgsImV4cCI6MjAwNzA4Nzg0OH0.ilNVKOaSeZzV0kY87yghopvXK2qhbSPb5krZnpf0bjk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
