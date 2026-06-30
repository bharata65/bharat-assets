import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { ReactNode } from "react"
import { getUser, loginUser, registerUser } from "../lib/db"
import type { RegisterInput } from "../lib/db"
import type { AppUser } from "../lib/types"
import { ADMIN_USER_ID, SESSION_KEY } from "../lib/constants"

interface AuthContextValue {
  user: AppUser | null
  loading: boolean
  isAdmin: boolean
  login: (userId: string, pin: string) => Promise<AppUser>
  register: (input: RegisterInput) => Promise<AppUser>
  logout: () => void
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Restore the session on first load.
  useEffect(() => {
    const sessionId = localStorage.getItem(SESSION_KEY)
    if (!sessionId) {
      setLoading(false)
      return
    }
    getUser(sessionId)
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (userId: string, pin: string) => {
    const u = await loginUser(userId, pin)
    localStorage.setItem(SESSION_KEY, u.userId)
    setUser(u)
    return u
  }, [])

  const register = useCallback(async (input: RegisterInput) => {
    const u = await registerUser(input)
    localStorage.setItem(SESSION_KEY, u.userId)
    setUser(u)
    return u
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  const refresh = useCallback(async () => {
    if (!user) return
    const fresh = await getUser(user.userId)
    setUser(fresh)
  }, [user])

  const value: AuthContextValue = {
    user,
    loading,
    isAdmin: user?.userId === ADMIN_USER_ID,
    login,
    register,
    logout,
    refresh,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
