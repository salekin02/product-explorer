import { createContext } from 'react';

export type Currency = 'USD' | 'GBP' | 'EUR';

export interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const exchangeRates: Record<Currency, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
};

export const currencySymbols: Record<Currency, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
};
