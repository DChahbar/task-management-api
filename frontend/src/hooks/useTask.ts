import { useCallback, useEffect, useState } from 'react'
import { getTask } from '../api/tasks'
import type { Task } from '../types/api'
import { getApiErrorMessage } from '../utils/errors'

export function useTask(taskId: number | undefined) {
  const [task, setTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(taskId))
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    if (taskId === undefined) {
      setTask(null)
      setIsLoading(false)
      setError(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await getTask(taskId)
      setTask(data)
    } catch (err) {
      setTask(null)
      setError(getApiErrorMessage(err, 'Failed to load task.'))
    } finally {
      setIsLoading(false)
    }
  }, [taskId])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { task, isLoading, error, refetch }
}
