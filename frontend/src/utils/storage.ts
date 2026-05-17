const TOKEN_KEY = 'task_manager_token'
const USER_KEY = 'task_manager_user'

export interface StoredUser {
  email: string
}

export const tokenStorage = {
  get(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },
  set(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  },
  remove() {
    localStorage.removeItem(TOKEN_KEY)
  },
}

export const userStorage = {
  get(): StoredUser | null {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as StoredUser
    } catch {
      return null
    }
  },
  set(user: StoredUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },
  remove() {
    localStorage.removeItem(USER_KEY)
  },
}

export function clearAuthStorage() {
  tokenStorage.remove()
  userStorage.remove()
}
