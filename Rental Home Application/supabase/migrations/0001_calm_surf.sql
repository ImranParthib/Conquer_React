/*
  # Initial Schema for Rental Property Platform

  1. New Tables
    - `profiles`
      - Extends Supabase auth with additional user information
      - Stores user role and contact details
    
    - `properties`
      - Stores property listings
      - Includes all property details like type, rooms, price
      - Links to owner's profile
    
    - `property_images`
      - Stores image URLs for properties
      - Links to property listings
      
    - `amenities`
      - Stores available amenity options
    
    - `property_amenities`
      - Junction table linking properties and amenities
    
    - `payments`
      - Tracks payment transactions
      - Links to properties and tenants

  2. Security
    - RLS policies for each table
    - Role-based access control
    - Owner-specific policies for property management
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('tenant', 'owner', 'admin');
CREATE TYPE property_type AS ENUM ('family', 'bachelor_male', 'bachelor_female');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');

-- Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role user_role NOT NULL DEFAULT 'tenant',
  full_name text,
  phone_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Properties table
CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  property_type property_type NOT NULL,
  room_count smallint NOT NULL,
  bathroom_count smallint NOT NULL,
  price decimal(10,2) NOT NULL,
  description text,
  address text NOT NULL,
  city text NOT NULL,
  area text NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Property images table
CREATE TABLE property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Amenities table
CREATE TABLE amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  icon text NOT NULL
);

-- Property amenities junction table
CREATE TABLE property_amenities (
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  amenity_id uuid REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (property_id, amenity_id)
);

-- Payments table
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id),
  tenant_id uuid REFERENCES profiles(id),
  amount decimal(10,2) NOT NULL,
  status payment_status DEFAULT 'pending',
  transaction_id text,
  payment_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Properties policies
CREATE POLICY "Properties are viewable by everyone"
  ON properties FOR SELECT
  USING (true);

CREATE POLICY "Owners can insert their own properties"
  ON properties FOR INSERT
  WITH CHECK (
    auth.uid() = owner_id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'owner'
    )
  );

CREATE POLICY "Owners can update their own properties"
  ON properties FOR UPDATE
  USING (
    auth.uid() = owner_id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'owner'
    )
  );

-- Property images policies
CREATE POLICY "Property images are viewable by everyone"
  ON property_images FOR SELECT
  USING (true);

CREATE POLICY "Owners can manage their property images"
  ON property_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_images.property_id
      AND properties.owner_id = auth.uid()
    )
  );

-- Insert default amenities
INSERT INTO amenities (name, icon) VALUES
  ('Wi-Fi', 'wifi'),
  ('AC', 'fan'),
  ('TV', 'tv'),
  ('Elevator', 'elevator'),
  ('Parking', 'car'),
  ('Generator', 'zap'),
  ('Security', 'shield'),
  ('Water Supply', 'droplets'),
  ('Gas Connection', 'flame');

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();