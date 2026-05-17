import type { TokenResponse, User } from '../types/api'
import { api } from './client'

export interface RegisterPayload {
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export async function registerUser(payload: RegisterPayload): Promise<User> {
  const { data } = await api.post<User>('/auth/register', payload)
  return data
}

export async function loginUser(payload: LoginPayload): Promise<TokenResponse> {
  const body = new URLSearchParams()
  body.set('username', payload.email)
  body.set('password', payload.password)

  const { data } = await api.post<TokenResponse>('/auth/login', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  return data
}
