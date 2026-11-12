export function formatCurrency(value) {
  const numericValue = Number(value || 0);
  return `₹${numericValue.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}
