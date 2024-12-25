-- Add payment-related fields to payments table
ALTER TABLE payments
ADD COLUMN payment_method text,
ADD COLUMN currency text DEFAULT 'BDT',
ADD COLUMN sslcommerz_transaction_id text,
ADD COLUMN sslcommerz_status text,
ADD COLUMN payment_details jsonb;

-- Create payment_history table for tracking payment status changes
CREATE TABLE payment_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id uuid REFERENCES payments(id) ON DELETE CASCADE,
  status payment_status NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on payment_history
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for payment_history
CREATE POLICY "Owners can view payment history for their properties"
  ON payment_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM payments
      JOIN properties ON properties.id = payments.property_id
      WHERE payment_history.payment_id = payments.id
      AND properties.owner_id = auth.uid()
    )
  );

CREATE POLICY "Tenants can view their own payment history"
  ON payment_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM payments
      WHERE payment_history.payment_id = payments.id
      AND payments.tenant_id = auth.uid()
    )
  ); 