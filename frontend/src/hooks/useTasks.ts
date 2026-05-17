import { useCallback, useEffect, useState } from 'react'
import { listTasks } from '../api/tasks'
import type { Task } from '../types/api'
import { getApiErrorMessage } from '../utils/errors'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await listTasks()
      setTasks(data)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load tasks.'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { tasks, isLoading, error, refetch }
}
