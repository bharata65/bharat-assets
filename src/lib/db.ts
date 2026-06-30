import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  query,
  where,
  orderBy,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebase"
import { COLLECTIONS } from "./constants"
import type { AppUser, Transaction, RequestStatus } from "./types"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a random 6-digit id as a string (100000 - 999999). */
function randomSixDigit(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

/** Generate a 6-digit user id that does not already exist in Firestore. */
export async function generateUniqueUserId(): Promise<string> {
  // Try a handful of times before giving up (collisions are extremely rare).
  for (let i = 0; i < 10; i++) {
    const candidate = randomSixDigit()
    const snap = await getDoc(doc(db, COLLECTIONS.users, candidate))
    if (!snap.exists()) return candidate
  }
  throw new Error("Could not generate a unique User ID. Please try again.")
}

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export async function getUser(userId: string): Promise<AppUser | null> {
  const snap = await getDoc(doc(db, COLLECTIONS.users, userId))
  return snap.exists() ? (snap.data() as AppUser) : null
}

export async function findUserByMobile(mobile: string): Promise<AppUser | null> {
  const q = query(collection(db, COLLECTIONS.users), where("mobile", "==", mobile))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return snap.docs[0].data() as AppUser
}

export interface RegisterInput {
  name: string
  mobile: string
  pin: string
}

export async function registerUser(input: RegisterInput): Promise<AppUser> {
  const existing = await findUserByMobile(input.mobile)
  if (existing) {
    throw new Error("An account with this mobile number already exists.")
  }

  const userId = await generateUniqueUserId()
  const user: AppUser = {
    userId,
    name: input.name.trim(),
    mobile: input.mobile.trim(),
    pin: input.pin.trim(),
    balance: 0,
    createdAt: Date.now(),
  }
  await setDoc(doc(db, COLLECTIONS.users, userId), user)
  return user
}

export async function loginUser(userId: string, pin: string): Promise<AppUser> {
  const user = await getUser(userId)
  if (!user) throw new Error("No account found for this User ID.")
  if (user.pin !== pin) throw new Error("Incorrect PIN. Please try again.")
  return user
}

export async function getAllUsers(): Promise<AppUser[]> {
  const snap = await getDocs(query(collection(db, COLLECTIONS.users), orderBy("createdAt", "desc")))
  return snap.docs.map((d) => d.data() as AppUser)
}

// ---------------------------------------------------------------------------
// Transactions (deposits & withdrawals)
// ---------------------------------------------------------------------------

function collectionFor(kind: "deposit" | "withdrawal") {
  return kind === "deposit" ? COLLECTIONS.deposits : COLLECTIONS.withdrawals
}

export async function createDepositRequest(
  user: AppUser,
  amount: number,
  note?: string,
): Promise<void> {
  await addDoc(collection(db, COLLECTIONS.deposits), {
    userId: user.userId,
    userName: user.name,
    amount,
    status: "pending" as RequestStatus,
    createdAt: Date.now(),
    note: note ?? "",
    _ts: serverTimestamp(),
  })
}

export async function createWithdrawalRequest(
  user: AppUser,
  amount: number,
  note?: string,
): Promise<void> {
  if (amount > user.balance) {
    throw new Error("Withdrawal amount exceeds your available balance.")
  }
  await addDoc(collection(db, COLLECTIONS.withdrawals), {
    userId: user.userId,
    userName: user.name,
    amount,
    status: "pending" as RequestStatus,
    createdAt: Date.now(),
    note: note ?? "",
    _ts: serverTimestamp(),
  })
}

function mapTx(d: { id: string; data: () => Record<string, unknown> }): Transaction {
  const data = d.data()
  return {
    id: d.id,
    userId: String(data.userId ?? ""),
    userName: String(data.userName ?? ""),
    amount: Number(data.amount ?? 0),
    status: (data.status as RequestStatus) ?? "pending",
    createdAt: Number(data.createdAt ?? 0),
    resolvedAt: data.resolvedAt ? Number(data.resolvedAt) : undefined,
    note: data.note ? String(data.note) : undefined,
  }
}

export async function getUserTransactions(
  kind: "deposit" | "withdrawal",
  userId: string,
): Promise<Transaction[]> {
  const q = query(collection(db, collectionFor(kind)), where("userId", "==", userId))
  const snap = await getDocs(q)
  return snap.docs.map(mapTx).sort((a, b) => b.createdAt - a.createdAt)
}

export async function getAllTransactions(kind: "deposit" | "withdrawal"): Promise<Transaction[]> {
  const snap = await getDocs(collection(db, collectionFor(kind)))
  return snap.docs.map(mapTx).sort((a, b) => b.createdAt - a.createdAt)
}

/**
 * Approve or reject a pending request. On approval the user's balance is
 * updated atomically (credited for deposits, debited for withdrawals).
 */
export async function resolveRequest(
  kind: "deposit" | "withdrawal",
  txId: string,
  status: "approved" | "rejected",
): Promise<void> {
  const txRef = doc(db, collectionFor(kind), txId)

  await runTransaction(db, async (trx) => {
    const txSnap = await trx.get(txRef)
    if (!txSnap.exists()) throw new Error("Request no longer exists.")
    const txData = txSnap.data() as Transaction
    if (txData.status !== "pending") throw new Error("This request was already processed.")

    if (status === "approved") {
      const userRef = doc(db, COLLECTIONS.users, txData.userId)
      const userSnap = await trx.get(userRef)
      if (!userSnap.exists()) throw new Error("User account not found.")
      const current = userSnap.data() as AppUser
      const delta = kind === "deposit" ? txData.amount : -txData.amount
      const newBalance = current.balance + delta
      if (newBalance < 0) throw new Error("User has insufficient balance for this withdrawal.")
      trx.update(userRef, { balance: newBalance })
    }

    trx.update(txRef, { status, resolvedAt: Date.now() })
  })
}
