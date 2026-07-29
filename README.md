# Bharat Assets — UI + Manual Payment Gateway

This adds a simple React frontend and Express backend to support:
- User and Admin UIs (single repo, client/server)
- Manual payment gateway (UPI) flow: create deposit, show UPI QR with amount, user marks "I have paid"
- Admin controls: update UPI ID, view deposits, verify/approve/decline deposits
- QR code generation (server-side) using UPI payload (data URL)

Run locally:

1) Server

cd server
npm install
node index.js

Server runs on http://localhost:4000

2) Client

cd client
npm install
npm run dev

Client runs on http://localhost:5173 (Vite default)

Notes:
- This is a minimal demo implementation intended to be hooked into your real auth and production DB.
- Data is stored in server/db.json (file-based) for demo purposes.
