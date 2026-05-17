/** Mirrors backend `schemas.UserOut` */
export interface User {
  id: number
  email: string
  created_at: string
  updated_at: string
}

/** Mirrors backend `schemas.Token` */
export interface TokenResponse {
  access_token: string
  token_type: string
}

/** Mirrors backend `schemas.TaskOut` */
export interface Task {
  id: number
  title: string
  description: string | null
  completed: boolean
  created_at: string
  updated_at: string
}

export interface TaskCreatePayload {
  title: string
  description?: string | null
}

export interface TaskUpdatePayload {
  title?: string
  description?: string | null
  completed?: boolean
}
