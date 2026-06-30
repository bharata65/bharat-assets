import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, RefreshCw, Check, X, ShieldAlert } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { Button, Card, Badge, Spinner } from "../components/ui"
import AnalyticsPanel from "../components/AnalyticsPanel"
import { getAllUsers, getAllTransactions, resolveRequest } from "../lib/db"
import { buildSevenDayAnalytics } from "../lib/analytics"
import type { AnalyticsSummary } from "../lib/analytics"
import { formatINR, formatDateTime } from "../lib/utils"
import type { AppUser, Transaction, TxKind } from "../lib/types"

type Tab = "requests" | "users" | "analytics"
type PendingRow = Transaction & { kind: TxKind }

export default function AdminPage() {
  const { isAdmin, user } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>("requests")
  const [loading, setLoading] = useState(true)
  const [actingId, setActingId] = useState<string | null>(null)

  const [users, setUsers] = useState<AppUser[]>([])
  const [deposits, setDeposits] = useState<Transaction[]>([])
  const [withdrawals, setWithdrawals] = useState<Transaction[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const [u, d, w] = await Promise.all([
      getAllUsers(),
      getAllTransactions("deposit"),
      getAllTransactions("withdrawal"),
    ])
    setUsers(u)
    setDeposits(d)
    setWithdrawals(w)
    setAnalytics(buildSevenDayAnalytics(u, d, w))
    setLoading(false)
  }, [])

  useEffect(() => {
    if (isAdmin) load()
  }, [isAdmin, load])

  async function act(kind: TxKind, id: string, status: "approved" | "rejected") {
    setActingId(id)
    try {
      await resolveRequest(kind, id, status)
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Action failed.")
    } finally {
      setActingId(null)
    }
  }

  // Security gate: only the admin User ID may view this page.
  if (!isAdmin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <ShieldAlert className="h-12 w-12 text-danger" />
        <h1 className="text-xl font-bold text-foreground">Access Denied</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          The Admin Panel is restricted. {user ? "Your account" : "You"} do not have permission to
          view this page.
        </p>
        <Button onClick={() => navigate(user ? "/dashboard" : "/")}>Go back</Button>
      </main>
    )
  }

  const pending: PendingRow[] = [
    ...deposits.filter((t) => t.status === "pending").map((t) => ({ ...t, kind: "deposit" as TxKind })),
    ...withdrawals
      .filter((t) => t.status === "pending")
      .map((t) => ({ ...t, kind: "withdrawal" as TxKind })),
  ].sort((a, b) => a.createdAt - b.createdAt)

  const tabs: { key: Tab; label: string }[] = [
    { key: "requests", label: `Requests (${pending.length})` },
    { key: "users", label: `Users (${users.length})` },
    { key: "analytics", label: "Analytics" },
  ]

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="h-5 w-5" /> Admin Panel
          </button>
          <button
            onClick={load}
            aria-label="Refresh"
            className="rounded-md p-2 transition hover:bg-primary-foreground/10"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-5 px-4 pt-5">
        <div className="grid grid-cols-3 gap-1 rounded-md bg-muted p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded px-2 py-2 text-xs font-semibold transition sm:text-sm ${
                tab === t.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <Spinner label="Loading admin data…" />
        ) : tab === "requests" ? (
          <section className="flex flex-col gap-3">
            {pending.length === 0 ? (
              <Card>
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No pending requests. All caught up.
                </p>
              </Card>
            ) : (
              pending.map((req) => (
                <Card key={`${req.kind}-${req.id}`} className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold capitalize text-foreground">
                          {req.kind}
                        </span>
                        <Badge status={req.status} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {req.userName} · ID {req.userId}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatDateTime(req.createdAt)}</p>
                      {req.note && (
                        <p className="mt-1 text-xs text-foreground">Note: {req.note}</p>
                      )}
                    </div>
                    <span className="text-lg font-extrabold text-foreground">
                      {formatINR(req.amount)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="success"
                      disabled={actingId === req.id}
                      onClick={() => act(req.kind, req.id, "approved")}
                    >
                      <Check className="h-4 w-4" /> Approve
                    </Button>
                    <Button
                      variant="danger"
                      disabled={actingId === req.id}
                      onClick={() => act(req.kind, req.id, "rejected")}
                    >
                      <X className="h-4 w-4" /> Reject
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </section>
        ) : tab === "users" ? (
          <Card className="overflow-x-auto p-0">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.userId} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-mono font-semibold text-foreground">{u.userId}</td>
                    <td className="px-4 py-3 text-foreground">{u.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">+91 {u.mobile}</td>
                    <td className="px-4 py-3 text-right font-semibold text-foreground">
                      {formatINR(u.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : (
          analytics && <AnalyticsPanel data={analytics} />
        )}
      </main>
    </div>
  )
}
