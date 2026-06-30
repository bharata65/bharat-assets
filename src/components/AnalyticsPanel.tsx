import { Users, ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { Card } from "./ui"
import { formatINR } from "../lib/utils"
import type { AnalyticsSummary } from "../lib/analytics"

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
}) {
  return (
    <Card className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-extrabold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </Card>
  )
}

export default function AnalyticsPanel({ data }: { data: AnalyticsSummary }) {
  const maxVal = Math.max(
    1,
    ...data.daily.map((d) => Math.max(d.deposits, d.withdrawals)),
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          icon={<Users className="h-4 w-4" />}
          label="New Users"
          value={String(data.newUsers)}
          sub="Last 7 days"
        />
        <StatCard
          icon={<ArrowDownLeft className="h-4 w-4 text-success" />}
          label="Deposits"
          value={formatINR(data.depositTotal)}
          sub={`${data.depositCount} approved`}
        />
        <StatCard
          icon={<ArrowUpRight className="h-4 w-4 text-accent-foreground" />}
          label="Withdrawals"
          value={formatINR(data.withdrawalTotal)}
          sub={`${data.withdrawalCount} approved`}
        />
      </div>

      {/* Simple bar chart */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">7-Day Money Flow</h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-success" /> Deposits
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-accent" /> Withdrawals
            </span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2" style={{ height: 160 }}>
          {data.daily.map((d) => (
            <div key={d.dayStart} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 items-end justify-center gap-1">
                <div
                  className="w-1/2 rounded-t bg-success transition-all"
                  style={{ height: `${(d.deposits / maxVal) * 100}%` }}
                  title={`Deposits: ${formatINR(d.deposits)}`}
                />
                <div
                  className="w-1/2 rounded-t bg-accent transition-all"
                  style={{ height: `${(d.withdrawals / maxVal) * 100}%` }}
                  title={`Withdrawals: ${formatINR(d.withdrawals)}`}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{d.label}</span>
              <span className="text-[10px] font-semibold text-foreground">{d.newUsers}u</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Number below each bar = new users that day
        </p>
      </Card>
    </div>
  )
}
