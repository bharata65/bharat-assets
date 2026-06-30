import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TrendingUp, ShieldCheck } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { Button, Field, Card } from "../components/ui"

type Mode = "login" | "register"

export default function AuthPage() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>("login")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newId, setNewId] = useState<string | null>(null)

  // Form fields
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [pin, setPin] = useState("")
  const [userId, setUserId] = useState("")

  function reset() {
    setError(null)
    setNewId(null)
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    reset()
    if (name.trim().length < 2) return setError("Please enter your full name.")
    if (!/^\d{10}$/.test(mobile)) return setError("Mobile number must be exactly 10 digits.")
    if (!/^\d{4}$/.test(pin)) return setError("PIN must be exactly 4 digits.")

    setBusy(true)
    try {
      const u = await register({ name, mobile, pin })
      setNewId(u.userId)
      // Briefly show the generated id, then go to dashboard.
      setTimeout(() => navigate("/dashboard"), 1800)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.")
    } finally {
      setBusy(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    reset()
    if (!/^\d{6}$/.test(userId)) return setError("User ID must be exactly 6 digits.")
    if (!/^\d{4}$/.test(pin)) return setError("PIN must be exactly 4 digits.")

    setBusy(true)
    try {
      await login(userId, pin)
      navigate("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        <header className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <TrendingUp className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Bharat Shares</h1>
          <p className="mt-1 text-sm text-muted-foreground text-balance">
            Your trusted investment wallet. Deposit, grow, and withdraw with ease.
          </p>
        </header>

        <Card>
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-md bg-muted p-1">
            <button
              onClick={() => {
                setMode("login")
                reset()
              }}
              className={`rounded px-3 py-2 text-sm font-semibold transition ${
                mode === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setMode("register")
                reset()
              }}
              className={`rounded px-3 py-2 text-sm font-semibold transition ${
                mode === "register" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Register
            </button>
          </div>

          {newId ? (
            <div className="flex flex-col items-center gap-3 rounded-md bg-success/10 p-6 text-center">
              <ShieldCheck className="h-10 w-10 text-success" />
              <p className="text-sm text-muted-foreground">Account created! Your User ID is</p>
              <p className="text-3xl font-extrabold tracking-[0.2em] text-success">{newId}</p>
              <p className="text-xs text-muted-foreground">
                Save this ID — you&apos;ll need it to log in. Redirecting&hellip;
              </p>
            </div>
          ) : mode === "register" ? (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <Field
                id="name"
                label="Full Name"
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              <Field
                id="mobile"
                label="Mobile Number (10 digits)"
                inputMode="numeric"
                placeholder="9876543210"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                autoComplete="tel"
              />
              <Field
                id="pin"
                label="Create 4-digit PIN"
                inputMode="numeric"
                type="password"
                placeholder="••••"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              />
              {error && <p className="text-sm font-medium text-danger">{error}</p>}
              <Button type="submit" fullWidth disabled={busy}>
                {busy ? "Creating account…" : "Create Account"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <Field
                id="userId"
                label="User ID (6 digits)"
                inputMode="numeric"
                placeholder="123456"
                maxLength={6}
                value={userId}
                onChange={(e) => setUserId(e.target.value.replace(/\D/g, ""))}
              />
              <Field
                id="loginPin"
                label="PIN (4 digits)"
                inputMode="numeric"
                type="password"
                placeholder="••••"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              />
              {error && <p className="text-sm font-medium text-danger">{error}</p>}
              <Button type="submit" fullWidth disabled={busy}>
                {busy ? "Signing in…" : "Login"}
              </Button>
            </form>
          )}
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Admin access is restricted to authorised User IDs only.
        </p>
      </div>
    </main>
  )
}
