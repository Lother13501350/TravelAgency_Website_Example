# Travel Agency Website

A responsive travel agency frontend built with **React, TypeScript, Vite, and Tailwind CSS**. It demonstrates a complete catalog browsing flow: discover destinations, filter travel packages, inspect itineraries, and open an enquiry form.

這是一個旅行社網站前端作品，展示行程探索、條件篩選、詳情頁與詢問表單。內容使用本機 mock data，適合用來理解元件設計與旅遊商品瀏覽流程。

## Features

- Package search by name, with destination, difficulty, price, and duration filters.
- Sorting by popularity, rating, and price, plus an empty state when no packages match.
- Package detail pages with itinerary information and departure dates.
- An enquiry modal with client-side validation and a simulated submission state.
- Home, destinations, about, FAQ, and blog pages.
- Responsive layouts, reusable package cards, ratings, navigation, and a testimonial carousel.

## Tech stack

| Layer | Technology |
| --- | --- |
| UI | React, TypeScript |
| Routing | React Router |
| Styling | Tailwind CSS, PostCSS |
| Development & build | Vite, TypeScript compiler |
| Code checks | ESLint |
| Deployment configuration | Vercel with SPA rewrites |

## Run locally

Use a Node.js version supported by the locked Vite release; Node.js 22.12+ or 24 is suitable.

```bash
git clone https://github.com/Lother13501350/TravelAgency_Website_Example.git
cd TravelAgency_Website_Example
npm ci
npm run dev
```

Open the local URL printed by Vite. No environment variables or database are required.

## Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Run TypeScript project checks and build into `dist/`. |
| `npm run lint` | Run ESLint. |
| `npm run preview` | Preview the production build locally. |

## Project structure

```text
src/
├── components/       # Shared layout, navigation, cards, and enquiry modal
├── pages/            # Route-level screens
├── data/mock-data.json
├── utils/            # Price formatting
├── App.tsx           # Route definitions
└── main.tsx          # Application entry
vercel.json           # Build settings and SPA route fallback
```

Filtering and sorting happen in the browser against `src/data/mock-data.json`. React Router connects the screens, while shared components keep package presentation and navigation consistent.

## Current scope

This is a **frontend demo**, with sample packages, reviews, and editorial content. The enquiry form validates input and displays a success state locally; it does not send a request, create a booking, process a payment, or trigger a real follow-up.

For deployment, run `npm run build` and serve `dist/`. Hosts must rewrite application routes to `index.html`; the included `vercel.json` configures this for Vercel.
