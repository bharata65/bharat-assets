import { useState } from "react"
import Modal from "./Modal"
import { Button, Field } from "./ui"
import { formatINR } from "../lib/utils"
import { createWithdrawalRequest } from "../lib/db"
import type { AppUser } from "../lib/types"

interface Props {
  open: boolean
  user: AppUser
  onClose: () => void
  onSubmitted: () => void
}

export default function WithdrawModal({ open, user, onClose, onSubmitted }: Props) {
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleClose() {
    setAmount("")
    setNote("")
    setError(null)
    onClose()
  }

  async function submit() {
    setError(null)
    const numericAmount = Number(amount)
    if (!numericAmount || numericAmount < 1) {
      setError("Enter a valid withdrawal amount.")
      return
    }
    if (numericAmount > user.balance) {
      setError("Amount exceeds your available balance.")
      return
    }
    setBusy(true)
    try {
      await createWithdrawalRequest(user, numericAmount, note)
      onSubmitted()
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit withdrawal request.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal open={open} title="Withdraw Funds" onClose={handleClose}>
      <div className="flex flex-col gap-4">
        <div className="rounded-lg bg-muted p-4 text-sm">
          <span className="text-muted-foreground">Available balance</span>
          <p className="text-xl font-bold text-foreground">{formatINR(user.balance)}</p>
        </div>

        <Field
          id="withdrawAmount"
          label="Amount (INR)"
          inputMode="numeric"
          placeholder="500"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
        />

        <Field
          id="withdrawNote"
          label="Payout UPI / Bank note (optional)"
          placeholder="Where should we send the money?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {error && <p className="text-sm font-medium text-danger">{error}</p>}

        <p className="text-xs text-muted-foreground">
          Your withdrawal will be reviewed by an admin. The amount is debited from your balance only
          after approval.
        </p>

        <Button onClick={submit} variant="accent" fullWidth disabled={busy}>
          {busy ? "Submitting…" : "Request Withdrawal"}
        </Button>
      </div>
    </Modal>
  )
}
