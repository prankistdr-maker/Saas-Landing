/*
  # Create generations table for StartupForge AI

  1. New Tables
    - `generations`
      - `id` (uuid, primary key)
      - `idea` (text) - the original startup idea input
      - `startup_name` (text) - AI-generated startup name
      - `tagline` (text) - AI-generated tagline
      - `target_audience` (text) - AI-generated target audience description
      - `landing_copy` (text) - AI-generated landing page copy
      - `features` (jsonb) - array of AI-generated features
      - `pricing_plans` (jsonb) - array of pricing plan objects
      - `mvp_roadmap` (jsonb) - array of roadmap phase objects
      - `created_at` (timestamptz) - creation timestamp

  2. Security
    - Enable RLS on `generations` table
    - Add policy for public read access (anonymous users can view all generations)
    - Add policy for public insert access (anyone can create generations)

  3. Notes
    - This app uses anonymous/public access for demo purposes
    - The jsonb columns store structured arrays of objects
*/

CREATE TABLE IF NOT EXISTS generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idea text NOT NULL DEFAULT '',
  startup_name text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  target_audience text NOT NULL DEFAULT '',
  landing_copy text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]',
  pricing_plans jsonb NOT NULL DEFAULT '[]',
  mvp_roadmap jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read generations"
  ON generations FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert generations"
  ON generations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
