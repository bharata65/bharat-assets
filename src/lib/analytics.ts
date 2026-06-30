import type { AppUser, Transaction } from "./types"

export interface DailyPoint {
  /** Short label e.g. "Mon 24". */
  label: string
  dayStart: number
  newUsers: number
  deposits: number
  withdrawals: number
}

export interface AnalyticsSummary {
  newUsers: number
  depositTotal: number
  withdrawalTotal: number
  depositCount: number
  withdrawalCount: number
  daily: DailyPoint[]
}

const DAY_MS = 24 * 60 * 60 * 1000

function startOfDay(ms: number): number {
  const d = new Date(ms)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

/**
 * Build automated 7-day analytics from raw users and approved transactions.
 * Only APPROVED deposits/withdrawals count toward the money totals.
 */
export function buildSevenDayAnalytics(
  users: AppUser[],
  deposits: Transaction[],
  withdrawals: Transaction[],
): AnalyticsSummary {
  const todayStart = startOfDay(Date.now())
  const windowStart = todayStart - 6 * DAY_MS

  // Seed 7 day buckets (oldest -> newest).
  const daily: DailyPoint[] = []
  for (let i = 0; i < 7; i++) {
    const dayStart = windowStart + i * DAY_MS
    const date = new Date(dayStart)
    daily.push({
      label: date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" }),
      dayStart,
      newUsers: 0,
      deposits: 0,
      withdrawals: 0,
    })
  }

  const bucketIndex = (ms: number): number => {
    const idx = Math.floor((startOfDay(ms) - windowStart) / DAY_MS)
    return idx >= 0 && idx < 7 ? idx : -1
  }

  let newUsers = 0
  for (const u of users) {
    const idx = bucketIndex(u.createdAt)
    if (idx !== -1) {
      daily[idx].newUsers += 1
      newUsers += 1
    }
  }

  let depositTotal = 0
  let depositCount = 0
  for (const t of deposits) {
    if (t.status !== "approved") continue
    const idx = bucketIndex(t.resolvedAt ?? t.createdAt)
    if (idx !== -1) {
      daily[idx].deposits += t.amount
      depositTotal += t.amount
      depositCount += 1
    }
  }

  let withdrawalTotal = 0
  let withdrawalCount = 0
  for (const t of withdrawals) {
    if (t.status !== "approved") continue
    const idx = bucketIndex(t.resolvedAt ?? t.createdAt)
    if (idx !== -1) {
      daily[idx].withdrawals += t.amount
      withdrawalTotal += t.amount
      withdrawalCount += 1
    }
  }

  return {
    newUsers,
    depositTotal,
    withdrawalTotal,
    depositCount,
    withdrawalCount,
    daily,
  }
}
