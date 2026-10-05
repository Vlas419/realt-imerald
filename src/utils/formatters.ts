import { Currency } from '../types/property';
import { USD_TO_BYN, USD_TO_EUR } from '../data/properties';

export function convertPrice(priceUSD: number, currency: Currency): number {
  switch (currency) {
    case 'BYN':
      return Math.round(priceUSD * USD_TO_BYN);
    case 'EUR':
      return Math.round(priceUSD * USD_TO_EUR);
    case 'USD':
    default:
      return priceUSD;
  }
}

export function formatPrice(priceUSD: number, currency: Currency, dealType: 'sale' | 'rent' = 'sale'): string {
  const converted = convertPrice(priceUSD, currency);
  const formatted = new Intl.NumberFormat('ru-RU').format(converted);
  
  const suffix = dealType === 'rent' ? '/мес' : '';

  switch (currency) {
    case 'BYN':
      return `${formatted} руб.${suffix}`;
    case 'EUR':
      return `€${formatted}${suffix}`;
    case 'USD':
    default:
      return `$${formatted}${suffix}`;
  }
}

export function formatPricePerMeter(priceUSD: number, totalArea: number, currency: Currency): string {
  if (!totalArea || totalArea <= 0) return '';
  const pricePerMeter = Math.round(priceUSD / totalArea);
  const converted = convertPrice(pricePerMeter, currency);
  const formatted = new Intl.NumberFormat('ru-RU').format(converted);

  switch (currency) {
    case 'BYN':
      return `${formatted} руб./м²`;
    case 'EUR':
      return `€${formatted}/м²`;
    case 'USD':
    default:
      return `$${formatted}/м²`;
  }
}
