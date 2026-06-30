import { ADMIN_UPI_ID, ADMIN_UPI_NAME } from "./constants"

/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ")
}

/** Format a number as Indian Rupees. */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount)
}

/** Format an epoch-millis timestamp as a readable date + time. */
export function formatDateTime(ms: number): string {
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * Build a UPI deep-link string for the given amount.
 * Format: upi://pay?pa=<vpa>&pn=<name>&am=<amount>&cu=INR
 */
export function buildUpiUri(amount: number, note?: string): string {
  const params = new URLSearchParams({
    pa: ADMIN_UPI_ID,
    pn: ADMIN_UPI_NAME,
    am: amount.toFixed(2),
    cu: "INR",
  })
  if (note) params.set("tn", note)
  return `upi://pay?${params.toString()}`
}

/**
 * Build a dynamic QR image URL via api.qrserver.com that encodes the UPI URI.
 */
export function buildQrUrl(amount: number, size = 240, note?: string): string {
  const data = encodeURIComponent(buildUpiUri(amount, note))
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${data}`
}
