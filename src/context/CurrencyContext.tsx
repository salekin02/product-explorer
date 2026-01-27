import { useState } from 'react';
import type { ReactNode } from 'react';
import { CurrencyContext, exchangeRates, currencySymbols } from './currencyConfig';
import type { Currency } from './currencyConfig';

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');

  const formatPrice = (price: number): string => {
    const convertedPrice = price * exchangeRates[currency];
    return `${currencySymbols[currency]}${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}
