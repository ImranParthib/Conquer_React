-- Create saved_properties table
CREATE TABLE saved_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Add contact fields to properties table
ALTER TABLE properties 
ADD COLUMN contact_phone text,
ADD COLUMN contact_email text;

-- Enable RLS on saved_properties
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;

-- RLS policies for saved_properties
CREATE POLICY "Users can view their own saved properties"
  ON saved_properties FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save properties"
  ON saved_properties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved properties"
  ON saved_properties FOR DELETE
  USING (auth.uid() = user_id); 