export type RequestStatus = "pending" | "approved" | "rejected"

export interface AppUser {
  /** 6-digit unique user id (also the Firestore document id). */
  userId: string
  name: string
  /** 10-digit mobile number. */
  mobile: string
  /** 4-digit PIN. Stored in plaintext for this demo only. */
  pin: string
  balance: number
  /** Epoch millis of account creation. */
  createdAt: number
}

export interface Transaction {
  id: string
  userId: string
  userName: string
  amount: number
  status: RequestStatus
  createdAt: number
  /** Epoch millis of approval / rejection. */
  resolvedAt?: number
  /** Optional UPI reference / note entered by the user. */
  note?: string
}

export type TxKind = "deposit" | "withdrawal"
