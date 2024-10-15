export function formatCurrency(currencyCode, value) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode,
    });
  
    return formatter.format(value);
  }