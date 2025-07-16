

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xdxsddrorqsvsqeqhsco.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeHNkZHJvcnFzdnNxZXFoc2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTc2MjMsImV4cCI6MjA2ODE5MzYyM30.BBaHiLLsv0rbBkdllJ4ksn0RB4HUOzDpSnK17ARNsHg'
export const supabase = createClient(supabaseUrl, supabaseKey)