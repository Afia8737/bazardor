# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় পণ্যের দাম এক নজরে — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের বাজারদর, দামের ওঠানামা এবং বিভাগভিত্তিক বাজার তুলনা।

BazarDor is a Bangla-first grocery price tracker built with Next.js. It shows today's prices, who went up or down, and a market-by-market breakdown for every product.

- **Live:** _add your deployed link_
- **API:** `https://openapi.programming-hero.com/api/bazardor`

## ✨ Key features

1. **Live price ticker** — an infinitely scrolling strip with emoji, name, price per unit and ▲/▼ change, directly under the navbar.
2. **Risers & fallers** — the top 6 products whose price went up and the top 6 whose price went down today.
3. **Category pages with numeric sorting** — sort by default, price low→high, or high→low. Sorting uses real numeric values, so Bengali-digit prices (১,৮৫০) are ordered correctly.
4. **Protected product details** — sign in to see min / max / average price and a market-by-market table across divisions, plus yesterday / last week / last month history.
5. **Authentication with BetterAuth** — email + password, Google and GitHub login, toast feedback, and a profile page with an *Update name* flow.
6. **Fully responsive** — mobile, tablet and desktop, with skeleton loaders and friendly 404 states.

## 🧰 Technologies

- [Next.js 15](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI 5](https://daisyui.com/)
- [BetterAuth](https://better-auth.com/) with PostgreSQL
- [react-hot-toast](https://react-hot-toast.com/)
- Hind Siliguri (Bangla) via `next/font`

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local      # fill in the values
npm run auth:migrate            # creates BetterAuth tables in your database
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string (Neon, Supabase, Vercel Postgres…) |
| `BETTER_AUTH_SECRET` | Long random string |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | Your site URL (`http://localhost:3000` locally) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth (callback: `/api/auth/callback/google`) |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth (callback: `/api/auth/callback/github`) |

## ☁️ Deploying to Vercel

1. Push the repo to GitHub and import it in Vercel.
2. Add the environment variables above (set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your Vercel URL).
3. Add the Vercel URL's OAuth callback to your Google / GitHub apps.
4. Run `npm run auth:migrate` once against your production database.

Dynamic routes (`/category/[slug]`, `/product/[slug]`) are server-rendered, so refreshing any page works on Vercel.

## 🗂️ Structure

```
app/            routes (home, category, product, signin, signup, profile)
components/     Navbar, Ticker, ProductCard, SortableGrid, forms…
lib/            api.ts (data layer), bn.ts (Bengali digits), auth.ts / auth-client.ts
```
