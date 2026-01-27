npm install
npm run dev
```

The app should open at `http://localhost:5173`

## What I Built

This is a product explorer that pulls from the DummyJSON API. You can browse products, search for specific items, filter by category, and switch between different currencies. I tried to keep the UI clean and responsive - works on both desktop and mobile.

## Trade-offs I Made

1. No real-time currency rates. I hardcoded exchange rates (USD, GBP, EUR). In a real app, I'd pull from an API like exchangerate-api.io and cache the results daily.

2. Basic error messages. Right now errors just say "something went wrong." I wanted to show variations for different type scenario.

3. Skipped unit tests. I manually tested everything pretty thoroughly, but didn't write Jest tests. The infinite scroll logic and URL state management would benefit from automated tests.

4. Simple loading states. I added skeleton loaders but they're pretty basic. Could've made them match the exactly actual content layout better.

