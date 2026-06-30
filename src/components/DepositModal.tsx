import { useState } from "react"
import { Copy, Check } from "lucide-react"
import Modal from "./Modal"
import { Button, Field } from "./ui"
import { buildQrUrl, buildUpiUri, formatINR } from "../lib/utils"
import { ADMIN_UPI_ID } from "../lib/constants"
import { createDepositRequest } from "../lib/db"
import type { AppUser } from "../lib/types"

interface Props {
  open: boolean
  user: AppUser
  onClose: () => void
  onSubmitted: () => void
}

export default function DepositModal({ open, user, onClose, onSubmitted }: Props) {
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const numericAmount = Number(amount)
  const showQr = numericAmount > 0

  function handleClose() {
    setAmount("")
    setNote("")
    setError(null)
    setCopied(false)
    onClose()
  }

  async function copyUpi() {
    await navigator.clipboard.writeText(ADMIN_UPI_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  async function submit() {
    setError(null)
    if (!numericAmount || numericAmount < 1) {
      setError("Enter a valid deposit amount.")
      return
    }
    setBusy(true)
    try {
      await createDepositRequest(user, numericAmount, note)
      onSubmitted()
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit deposit request.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal open={open} title="Add Funds" onClose={handleClose}>
      <div className="flex flex-col gap-4">
        <Field
          id="depositAmount"
          label="Amount (INR)"
          inputMode="numeric"
          placeholder="500"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
        />

        {showQr && (
          <div className="flex flex-col items-center gap-3 rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Scan to pay <span className="font-semibold text-foreground">{formatINR(numericAmount)}</span>
            </p>
            <img
              src={buildQrUrl(numericAmount, 220, `Deposit ${user.userId}`)}
              alt={`UPI QR code for ${formatINR(numericAmount)}`}
              width={220}
              height={220}
              className="rounded-lg bg-card p-2"
            />
            <button
              onClick={copyUpi}
              className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              {ADMIN_UPI_ID}
            </button>
            <a
              href={buildUpiUri(numericAmount, `Deposit ${user.userId}`)}
              className="text-xs font-semibold text-primary underline"
            >
              Open in UPI app
            </a>
          </div>
        )}

        <Field
          id="depositNote"
          label="UPI Reference / Note (optional)"
          placeholder="Transaction reference id"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {error && <p className="text-sm font-medium text-danger">{error}</p>}

        <p className="text-xs text-muted-foreground">
          After paying, submit the request. Your balance updates once an admin approves the deposit.
        </p>

        <Button onClick={submit} fullWidth disabled={busy}>
          {busy ? "Submitting…" : "I have paid — Submit request"}
        </Button>
      </div>
    </Modal>
  )
}
