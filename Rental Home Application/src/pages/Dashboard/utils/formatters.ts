export function formatPropertyType(type: string): string {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatCurrency(amount: number): string {
  return `৳${amount.toLocaleString()}`;
}