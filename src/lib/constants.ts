// ---------------------------------------------------------------------------
// Application-wide constants
// ---------------------------------------------------------------------------

// Default UPI ID that deposits are paid into.
export const ADMIN_UPI_ID = "7186024384801SB1024@mairtel"

// Payee name shown inside UPI apps when scanning the QR code.
export const ADMIN_UPI_NAME = "Bharat Shares"

// The single User ID that is allowed to access the Admin Panel.
export const ADMIN_USER_ID = "123456"

// Firestore collection names.
export const COLLECTIONS = {
  users: "users",
  deposits: "deposits",
  withdrawals: "withdrawals",
} as const

// LocalStorage key used to keep the logged-in session (the 6-digit user id).
export const SESSION_KEY = "bharat_shares_session"
