# Forexaaa Firebase 2-file project

Files:
- `index.html` — user side
- `admin.html` — admin side
- `firestore.rules` — Firebase security rules

## Firebase setup
1. Enable Authentication → Email/Password.
2. Create Firestore Database.
3. Deploy `firestore.rules`.
4. Create an admin user in Firebase Authentication.
5. In Firestore create `admins/{ADMIN_UID}` with:
   `active: true`
6. Open `admin.html` through GitHub Pages/HTTP hosting and log in with that admin account.
7. In Admin → System Settings configure UPI ID, display name, min/max deposit and banner URL.
8. For banners, upload manually to Firebase Storage and paste the download URL into Admin → CMS Management.

## Manual UPI flow
User enters INR amount → QR is generated from current admin UPI ID + exact amount → user pays externally → "I Have Paid" creates Pending deposit → admin Approve/Reject → approval credits wallet, creates transaction and notification.

## Important production note
The HTML files are intentionally only two application source files, but `firestore.rules` is included because Firebase authorization must be enforced server-side. Do not deploy a real-money service with permissive rules.
