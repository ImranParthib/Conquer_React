import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { handlePaymentCallback } from '../../services/payment';

type PaymentStatus = 'success' | 'fail' | 'cancel';

interface StatusConfig {
  icon: React.ElementType;
  title: string;
  message: string;
  buttonText: string;
  iconClass: string;
}

const STATUS_CONFIG: Record<PaymentStatus, StatusConfig> = {
  success: {
    icon: CheckCircle,
    title: 'Payment Successful',
    message: 'Your payment has been processed successfully.',
    buttonText: 'View Dashboard',
    iconClass: 'text-green-500'
  },
  fail: {
    icon: XCircle,
    title: 'Payment Failed',
    message: 'Your payment could not be processed. Please try again.',
    buttonText: 'Try Again',
    iconClass: 'text-red-500'
  },
  cancel: {
    icon: AlertCircle,
    title: 'Payment Cancelled',
    message: 'You have cancelled the payment process.',
    buttonText: 'Return to Property',
    iconClass: 'text-yellow-500'
  }
};

interface PaymentResultProps {
  status: PaymentStatus;
}

export default function PaymentResult({ status }: PaymentResultProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const config = STATUS_CONFIG[status];

  React.useEffect(() => {
    async function processPaymentResult() {
      try {
        const params = Object.fromEntries(searchParams.entries());
        await handlePaymentCallback(status, params);
      } catch (error) {
        console.error('Error processing payment result:', error);
      } finally {
        setLoading(false);
      }
    }

    processPaymentResult();
  }, [status, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  const handleButtonClick = () => {
    if (status === 'success') {
      navigate('/dashboard');
    } else {
      const propertyId = searchParams.get('property_id');
      navigate(propertyId ? `/properties/${propertyId}` : '/properties');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <config.icon className={`h-16 w-16 ${config.iconClass}`} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{config.title}</h2>
        <p className="text-gray-600 mb-6">{config.message}</p>
        {status === 'success' && searchParams.get('tran_id') && (
          <p className="text-sm text-gray-500 mb-6">
            Transaction ID: {searchParams.get('tran_id')}
          </p>
        )}
        <button
          onClick={handleButtonClick}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          {config.buttonText}
        </button>
      </div>
    </div>
  );
} 