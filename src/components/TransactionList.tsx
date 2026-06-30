import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { Badge } from "./ui"
import { formatINR, formatDateTime } from "../lib/utils"
import type { Transaction, TxKind } from "../lib/types"

interface Row extends Transaction {
  kind: TxKind
}

export default function TransactionList({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
        No transactions yet. Make your first deposit to get started.
      </p>
    )
  }

  return (
    <ul className="flex flex-col divide-y divide-border">
      {rows.map((tx) => {
        const isDeposit = tx.kind === "deposit"
        return (
          <li key={`${tx.kind}-${tx.id}`} className="flex items-center gap-3 py-3">
            <div
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                isDeposit ? "bg-success/15 text-success" : "bg-accent/15 text-accent-foreground"
              }`}
            >
              {isDeposit ? (
                <ArrowDownLeft className="h-4 w-4" />
              ) : (
                <ArrowUpRight className="h-4 w-4" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold capitalize text-foreground">{tx.kind}</p>
              <p className="truncate text-xs text-muted-foreground">{formatDateTime(tx.createdAt)}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className={`text-sm font-bold ${isDeposit ? "text-success" : "text-foreground"}`}
              >
                {isDeposit ? "+" : "-"}
                {formatINR(tx.amount)}
              </span>
              <Badge status={tx.status} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
