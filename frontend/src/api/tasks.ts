import type {
  Task,
  TaskCreatePayload,
  TaskUpdatePayload,
} from '../types/api'
import { api } from './client'

export async function listTasks(): Promise<Task[]> {
  const { data } = await api.get<Task[]>('/tasks')
  return data
}

export async function getTask(taskId: number): Promise<Task> {
  const { data } = await api.get<Task>(`/tasks/${taskId}`)
  return data
}

export async function createTask(payload: TaskCreatePayload): Promise<Task> {
  const { data } = await api.post<Task>('/tasks', payload)
  return data
}

export async function updateTask(
  taskId: number,
  payload: TaskUpdatePayload,
): Promise<Task> {
  const { data } = await api.patch<Task>(`/tasks/${taskId}`, payload)
  return data
}

export async function deleteTask(taskId: number): Promise<void> {
  await api.delete(`/tasks/${taskId}`)
}
