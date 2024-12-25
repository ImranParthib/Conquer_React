import React from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

interface SavePropertyButtonProps {
  propertyId: string;
  initialSaved?: boolean;
}

export default function SavePropertyButton({ propertyId, initialSaved = false }: SavePropertyButtonProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = React.useState(initialSaved);
  const [loading, setLoading] = React.useState(false);

  const handleSaveToggle = async () => {
    if (!user) {
      toast.error('Please log in to save properties');
      return;
    }

    try {
      setLoading(true);
      if (isSaved) {
        const { error } = await supabase
          .from('saved_properties')
          .delete()
          .eq('property_id', propertyId)
          .eq('user_id', user.id);
        
        if (error) throw error;
        setIsSaved(false);
        toast.success('Property removed from saved list');
      } else {
        const { error } = await supabase
          .from('saved_properties')
          .insert({ property_id: propertyId, user_id: user.id });
        
        if (error) throw error;
        setIsSaved(true);
        toast.success('Property saved successfully');
      }
    } catch (error) {
      toast.error('Failed to save property');
      console.error('Error saving property:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSaveToggle}
      disabled={loading}
      className={`p-2 rounded-full ${
        isSaved 
          ? 'text-red-600 hover:bg-red-50' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
    </button>
  );
} 