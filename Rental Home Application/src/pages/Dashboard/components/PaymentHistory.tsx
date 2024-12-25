import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { usePaymentHistory } from '../hooks/usePaymentHistory';
import { formatCurrency } from '../utils/formatters';

const STATUS_ICONS = {
  paid: { icon: CheckCircle, className: 'text-green-500' },
  pending: { icon: Clock, className: 'text-yellow-500' },
  failed: { icon: XCircle, className: 'text-red-500' }
};

export default function PaymentHistory() {
  const { payments, loading, error } = usePaymentHistory();

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading payment history</p>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900">No payment history</h3>
        <p className="text-gray-600">Your payment transactions will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => {
              const StatusIcon = STATUS_ICONS[payment.status].icon;
              return (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(payment.created_at), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.property.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.property.area}, {payment.property.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <StatusIcon className={`h-5 w-5 mr-2 ${STATUS_ICONS[payment.status].className}`} />
                      <span className="text-sm text-gray-900 capitalize">
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.sslcommerz_transaction_id || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 