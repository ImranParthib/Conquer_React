import { supabase } from '../lib/supabase';

interface SSLCommerzConfig {
  store_id: string;
  store_passwd: string;
  is_live: boolean;
}

const SSLCOMMERZ_CONFIG: SSLCommerzConfig = {
  store_id: import.meta.env.VITE_SSLCOMMERZ_STORE_ID,
  store_passwd: import.meta.env.VITE_SSLCOMMERZ_STORE_PASSWORD,
  is_live: import.meta.env.VITE_SSLCOMMERZ_IS_LIVE === 'true'
};

interface InitiatePaymentParams {
  propertyId: string;
  tenantId: string;
  amount: number;
  currency?: string;
}

export async function initiatePayment({
  propertyId,
  tenantId,
  amount,
  currency = 'BDT'
}: InitiatePaymentParams) {
  try {
    // Create payment record in database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        property_id: propertyId,
        tenant_id: tenantId,
        amount,
        currency,
        status: 'pending'
      })
      .select()
      .single();

    if (paymentError) throw paymentError;

    // Get tenant and property details for the payment
    const { data: tenant } = await supabase
      .from('profiles')
      .select('full_name, phone_number')
      .eq('id', tenantId)
      .single();

    const { data: property } = await supabase
      .from('properties')
      .select('title, address')
      .eq('id', propertyId)
      .single();

    // Prepare SSLCOMMERZ parameters
    const sslczParams = {
      store_id: SSLCOMMERZ_CONFIG.store_id,
      store_passwd: SSLCOMMERZ_CONFIG.store_passwd,
      total_amount: amount,
      currency,
      tran_id: payment.id,
      success_url: `${window.location.origin}/payment/success`,
      fail_url: `${window.location.origin}/payment/fail`,
      cancel_url: `${window.location.origin}/payment/cancel`,
      ipn_url: `${import.meta.env.VITE_API_URL}/payment/webhook`,
      product_name: property.title,
      product_category: 'Rent',
      cus_name: tenant.full_name,
      cus_phone: tenant.phone_number,
      shipping_method: 'NO',
      product_profile: 'non-physical-goods'
    };

    // Initialize SSLCOMMERZ session
    const response = await fetch(
      `${SSLCOMMERZ_CONFIG.is_live ? 'https://securepay.sslcommerz.com' : 'https://sandbox.sslcommerz.com'}/gwprocess/v4/api.php`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(sslczParams)
      }
    );

    const result = await response.json();

    if (result.status === 'SUCCESS') {
      // Update payment with SSLCOMMERZ session details
      await supabase
        .from('payments')
        .update({
          sslcommerz_transaction_id: result.sessionkey,
          payment_details: result
        })
        .eq('id', payment.id);

      // Redirect to payment gateway
      window.location.href = result.GatewayPageURL;
    } else {
      throw new Error('Failed to initialize payment');
    }
  } catch (error) {
    console.error('Payment initiation failed:', error);
    throw error;
  }
}

export async function handlePaymentCallback(status: 'success' | 'fail' | 'cancel', params: any) {
  try {
    const { val_id, tran_id, amount, card_type, bank_tran_id } = params;

    const { error } = await supabase
      .from('payments')
      .update({
        status: status === 'success' ? 'paid' : 'failed',
        sslcommerz_status: status,
        payment_method: card_type,
        payment_details: {
          ...params,
          validation_id: val_id,
          bank_transaction_id: bank_tran_id
        }
      })
      .eq('id', tran_id);

    if (error) throw error;

    // Record payment history
    await supabase
      .from('payment_history')
      .insert({
        payment_id: tran_id,
        status: status === 'success' ? 'paid' : 'failed',
        notes: `Payment ${status} via ${card_type}`
      });

  } catch (error) {
    console.error('Payment callback handling failed:', error);
    throw error;
  }
} 