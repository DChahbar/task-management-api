import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loginUser, registerUser } from '../api/auth'
import type { StoredUser } from '../utils/storage'
import {
  clearAuthStorage,
  tokenStorage,
  userStorage,
} from '../utils/storage'

interface AuthContextValue {
  user: StoredUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

function persistSession(token: string, user: StoredUser) {
  tokenStorage.set(token)
  userStorage.set(user)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = tokenStorage.get()
    const storedUser = userStorage.get()

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(storedUser)
    }

    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    clearAuthStorage()
    setToken(null)
    setUser(null)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { access_token } = await loginUser({ email, password })
    const sessionUser = { email }
    persistSession(access_token, sessionUser)
    setToken(access_token)
    setUser(sessionUser)
  }, [])

  const register = useCallback(async (email: string, password: string) => {
    await registerUser({ email, password })
    const { access_token } = await loginUser({ email, password })
    const sessionUser = { email }
    persistSession(access_token, sessionUser)
    setToken(access_token)
    setUser(sessionUser)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, token, isLoading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
