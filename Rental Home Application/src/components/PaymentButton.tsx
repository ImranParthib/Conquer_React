import React from 'react';
import { CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { initiatePayment } from '../services/payment';
import { toast } from 'react-hot-toast';

interface PaymentButtonProps {
  propertyId: string;
  amount: number;
  disabled?: boolean;
}

export default function PaymentButton({ propertyId, amount, disabled }: PaymentButtonProps) {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please log in to make a payment');
      return;
    }

    try {
      setLoading(true);
      await initiatePayment({
        propertyId,
        tenantId: user.id,
        amount
      });
    } catch (error) {
      toast.error('Failed to initiate payment');
      console.error('Payment initiation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || loading}
      className="flex items-center justify-center gap-2 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <CreditCard className="h-5 w-5" />
      {loading ? 'Processing...' : 'Pay Now'}
    </button>
  );
} 