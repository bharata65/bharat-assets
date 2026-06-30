# Bharat Shares

A mobile-first investment wallet built with **Vite + React + TypeScript + Tailwind CSS**, backed by **Firebase Firestore**.

## Features

- **Auth** — Register with Name, 10-digit mobile, and a 4-digit PIN. A unique 6-digit User ID is generated for every account.
- **Dashboard** — Shows User ID, name, balance, Deposit / Withdraw actions, and full transaction history.
- **Dynamic UPI QR** — Deposits generate a live UPI QR code via `api.qrserver.com` encoding the entered amount.
- **Admin Panel** — Restricted to User ID `123456`. Approve/reject requests, view all users, and see automated 7-day analytics (new users, deposits, withdrawals).

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Configuration

- **Firebase**: edit `src/lib/firebase.ts` and replace the placeholder `apiKey` with your real Web API key (Firebase Console → Project settings → General → Web app).
- **UPI ID / Admin ID**: edit `src/lib/constants.ts` (`ADMIN_UPI_ID`, `ADMIN_USER_ID`).

### Firestore collections

| Collection    | Document shape                                                        |
| ------------- | --------------------------------------------------------------------- |
| `users`       | `userId, name, mobile, pin, balance, createdAt`                       |
| `deposits`    | `userId, userName, amount, status, createdAt, resolvedAt?, note?`     |
| `withdrawals` | `userId, userName, amount, status, createdAt, resolvedAt?, note?`     |

## Deploying to GitHub Pages

1. In `vite.config.ts`, uncomment and set `base` to your repository name, e.g. `base: "/bharat-assets/"`.
2. Push to `main`. The included GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and publishes `dist/` to Pages.
3. In your repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Routing uses `HashRouter`, so deep links work on GitHub Pages without extra server config. All asset paths are relative.

## Security note

This is a prototype. The 4-digit PIN, client-side admin gate, and direct browser access to Firestore are **not safe for real money**. Before production, move balance changes and approvals to a trusted backend (Firebase Cloud Functions), add Firebase Auth + Firestore Security Rules, and hash PINs server-side.
