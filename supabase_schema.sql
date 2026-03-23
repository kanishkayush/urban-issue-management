-- Run this SQL in your Supabase SQL Editor to create the necessary table and policies.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL,
  description TEXT,
  location TEXT,
  "priorityScore" DOUBLE PRECISION,
  status TEXT DEFAULT 'Pending Review',
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image TEXT,
  "aiKeywords" TEXT[]
);

-- Enable Row Level Security (RLS)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert reports (for our citizen portal simulation)
CREATE POLICY "Allow anonymous inserts" ON reports 
  FOR INSERT TO anon WITH CHECK (true);

-- Create policy to allow reading reports (for both citizen and gov portals)
CREATE POLICY "Allow anonymous selects" ON reports 
  FOR SELECT TO anon USING (true);
