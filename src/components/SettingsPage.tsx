import { useCurrency } from '../context/useCurrency';
import type { Currency } from '../context/currencyConfig';

const currencies: { value: Currency; label: string; symbol: string }[] = [
  { value: 'USD', label: 'USD', symbol: '$' },
  { value: 'GBP', label: 'Pound', symbol: '£' },
  { value: 'EUR', label: 'Euro', symbol: '€' },
];

export function SettingsPage() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Currency</h2>
          <p className="text-sm text-gray-600 mb-4">
            Select your preferred currency for displaying prices
          </p>

          <div className="space-y-3">
            {currencies.map((curr) => (
              <label
                key={curr.value}
                className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="currency"
                  value={curr.value}
                  checked={currency === curr.value}
                  onChange={() => setCurrency(curr.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <div className="flex-1">
                  <div className="font-medium">{curr.label} {curr.symbol}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
