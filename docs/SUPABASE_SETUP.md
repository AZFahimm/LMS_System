# Supabase Setup Guide

## 1. Create Supabase Project

1. Visit [Supabase](https://supabase.com)
2. Click "New Project"
3. Select your organization or create one
4. Fill in:
   - Project Name: `educoach-coaching-center`
   - Database Password: (Create a secure password)
   - Region: (Select closest to your location)
5. Click "Create new project"

## 2. Get Your Credentials

After the project is created:

1. Go to **Settings > API**
2. Copy the following:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

3. Create `.env.local` file in project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_OPENAI_API_KEY=your_openai_key_here
```

## 3. Create Tables

1. Go to **SQL Editor** in Supabase dashboard
2. Click **New Query**
3. Copy and paste the entire SQL from `docs/DATABASE_SCHEMA.sql`
4. Click **Run**

## 4. Enable Authentication

1. Go to **Authentication > Providers**
2. Enable **Email** provider
3. Configure email settings as needed

## 5. Set Up RLS (Row Level Security)

1. Go to **Authentication > Policies**
2. For each table, create policies:
   - Users can only see their own data
   - Admins can see all data
   - Teachers can see their batch data

Example policy for students table:
```sql
CREATE POLICY "Users can view their own student record"
ON students
FOR SELECT
USING (user_id = auth.uid());
```

## 6. Set Up Storage Bucket

1. Go to **Storage** in Supabase dashboard
2. Click **Create new bucket**
3. Name it: `worksheets`
4. Make it **Private**
5. Create another bucket named: `certificates`

## 7. Configure Storage Policies

For `worksheets` bucket:
```sql
CREATE POLICY "Teachers can upload worksheets"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'worksheets' AND auth.uid()::text IN (
  SELECT teachers.id::text FROM teachers
));
```

## 8. Create Functions (Optional)

Create helper functions for common operations:

```sql
-- Function to get student statistics
CREATE OR REPLACE FUNCTION get_student_stats(p_student_id UUID)
RETURNS TABLE (
  total_classes INT,
  present INT,
  absent INT,
  late INT,
  attendance_percentage NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::INT,
    COUNT(CASE WHEN status = 'present' THEN 1 END)::INT,
    COUNT(CASE WHEN status = 'absent' THEN 1 END)::INT,
    COUNT(CASE WHEN status = 'late' THEN 1 END)::INT,
    ROUND(
      (COUNT(CASE WHEN status IN ('present', 'late') THEN 1 END)::NUMERIC / 
       NULLIF(COUNT(*), 0)) * 100, 2
    )
  FROM attendance
  WHERE student_id = p_student_id;
END;
$$ LANGUAGE plpgsql;
```

## 9. Test Connection

To verify your connection works:

1. Run: `npm run dev`
2. Open browser console
3. You should see no errors related to Supabase

## Troubleshooting

### "Missing environment variables"
- Check `.env.local` exists in project root
- Verify keys are correct (no extra spaces)
- Restart dev server after creating `.env.local`

### "Connection refused"
- Verify VITE_SUPABASE_URL is correct
- Check internet connection
- Make sure project is not paused in Supabase

### "Authentication failed"
- Verify anon key is correct
- Check if Email provider is enabled
- Ensure user exists in auth.users table

## Useful Supabase Links

- Dashboard: https://app.supabase.com
- Documentation: https://supabase.com/docs
- API Reference: https://supabase.com/docs/reference/javascript
