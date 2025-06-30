import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lgbimqwsoibwfdlpbsmw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnYmltcXdzb2lid2ZkbHBic213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNDE0MTgsImV4cCI6MjA2NjgxNzQxOH0.NOjoTn-gNY62Xv6maWVDxvDt6Tkfaw9nUPlBjFsHs1U';

export const supabase = createClient(supabaseUrl, supabaseKey);
