import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, Plus, Minus, Wallet, ShieldCheck, RefreshCw } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { Button, Card, Spinner } from "../components/ui"
import DepositModal from "../components/DepositModal"
import WithdrawModal from "../components/WithdrawModal"
import TransactionList from "../components/TransactionList"
import { getUserTransactions } from "../lib/db"
import { formatINR } from "../lib/utils"
import type { Transaction, TxKind } from "../lib/types"

type Row = Transaction & { kind: TxKind }

export default function DashboardPage() {
  const { user, isAdmin, logout, refresh } = useAuth()
  const navigate = useNavigate()
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)

  const load = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const [deposits, withdrawals] = await Promise.all([
      getUserTransactions("deposit", user.userId),
      getUserTransactions("withdrawal", user.userId),
    ])
    const merged: Row[] = [
      ...deposits.map((d) => ({ ...d, kind: "deposit" as TxKind })),
      ...withdrawals.map((w) => ({ ...w, kind: "withdrawal" as TxKind })),
    ].sort((a, b) => b.createdAt - a.createdAt)
    setRows(merged)
    setLoading(false)
  }, [user])

  useEffect(() => {
    load()
  }, [load])

  async function handleRefresh() {
    await refresh()
    await load()
  }

  function handleLogout() {
    logout()
    navigate("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            <span className="text-lg font-extrabold">Bharat Shares</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleRefresh}
              aria-label="Refresh"
              className="rounded-md p-2 transition hover:bg-primary-foreground/10"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="rounded-md p-2 transition hover:bg-primary-foreground/10"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-2xl flex-col gap-5 px-4 pt-5">
        {/* Balance card */}
        <Card className="bg-primary text-primary-foreground">
          <p className="text-sm opacity-80">Total Balance</p>
          <p className="mt-1 text-4xl font-extrabold tracking-tight">{formatINR(user.balance)}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm opacity-90">
            <span>
              ID: <span className="font-bold tracking-wider">{user.userId}</span>
            </span>
            <span>{user.name}</span>
            <span>+91 {user.mobile}</span>
          </div>
        </Card>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="success" onClick={() => setShowDeposit(true)}>
            <Plus className="h-4 w-4" /> Deposit
          </Button>
          <Button variant="accent" onClick={() => setShowWithdraw(true)}>
            <Minus className="h-4 w-4" /> Withdraw
          </Button>
        </div>

        {isAdmin && (
          <Button variant="outline" onClick={() => navigate("/admin")}>
            <ShieldCheck className="h-4 w-4" /> Open Admin Panel
          </Button>
        )}

        {/* Transaction history */}
        <section>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Transaction History
          </h2>
          <Card>
            {loading ? <Spinner label="Loading transactions…" /> : <TransactionList rows={rows} />}
          </Card>
        </section>
      </main>

      <DepositModal
        open={showDeposit}
        user={user}
        onClose={() => setShowDeposit(false)}
        onSubmitted={load}
      />
      <WithdrawModal
        open={showWithdraw}
        user={user}
        onClose={() => setShowWithdraw(false)}
        onSubmitted={load}
      />
    </div>
  )
}
