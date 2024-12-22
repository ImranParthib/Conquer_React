export interface Property {
  id: string;
  owner_id: string;
  title: string;
  property_type: 'family' | 'bachelor_male' | 'bachelor_female';
  room_count: number;
  bathroom_count: number;
  price: number;
  description: string;
  address: string;
  city: string;
  area: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  property_images?: Array<{
    image_url: string;
  }>;
  property_amenities?: Array<{
    amenities: {
      name: string;
      icon: string;
    };
  }>;
}