export function formatCurrency(value: number, currency: 'IDR' | 'USD') {
  // value is in Billions IDR
  const actualValue = value * 1_000_000_000;

  if (currency === 'IDR') {
    const absValue = Math.abs(actualValue);
    let formattedNumber = '';
    let suffix = '';

    if (absValue >= 1_000_000_000_000) {
      formattedNumber = (absValue / 1_000_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
      suffix = ' T';
    } else if (absValue >= 1_000_000_000) {
      formattedNumber = (absValue / 1_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
      suffix = ' M';
    } else if (absValue >= 1_000_000) {
      formattedNumber = (absValue / 1_000_000).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
      suffix = ' jt';
    } else {
      formattedNumber = absValue.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }

    return `${actualValue < 0 ? '-' : ''}Rp ${formattedNumber}${suffix}`;
  } else {
    // Convert Billions IDR to USD (approx 15,000 IDR/USD)
    const usdValue = actualValue / 15000;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short',
    }).format(usdValue);
  }
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatPercent(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}
