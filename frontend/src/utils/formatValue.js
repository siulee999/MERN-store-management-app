export const formatValue = (value, format) => {
  if (format === 'currency') {
    if (value === 0) return '0';
    if (value >= 1000000) return `${value < 0 ? '-' : ''}$${(Math.abs(value) / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `${value < 0 ? '-' : ''}$${(Math.abs(value) / 1000).toFixed(0)}K`;
    return `${value < 0 ? '-' : ''}$${Math.abs(value).toLocaleString()}`;
  }
  return value.toLocaleString();
};