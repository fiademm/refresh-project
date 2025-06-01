const cron = require('node-cron');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Schedule: every Monday & Thursday at 9:00 AM UTC
cron.schedule('0 9 * * 1,4', async () => {
  try {
    const { data, error } = await supabase
      .from('your_table') // Replace with your table name
      .select('id')
      .limit(1);

    if (error) {
      console.error('Error pinging Supabase:', error);
    } else {
      console.log('✅ Supabase ping successful at', new Date().toISOString());
    }
  } catch (err) {
    console.error('❌ Failed to ping Supabase:', err);
  }
});

console.log('⏰ Scheduled Supabase ping every Monday and Thursday at 9:00 AM UTC');