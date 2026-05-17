import { useCallback, useEffect, useState } from 'react'
import { getTask } from '../api/tasks'
import type { Task } from '../types/api'
import { getApiErrorMessage } from '../utils/errors'

export function useTask(taskId: number | undefined) {
  const [task, setTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(taskId))
  const [isRetrying, setIsRetrying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTask = useCallback(
    async (options?: { retry?: boolean }) => {
      if (taskId === undefined) {
        setTask(null)
        setIsLoading(false)
        setError(null)
        return
      }

      if (options?.retry) {
        setIsRetrying(true)
      } else {
        setIsLoading(true)
      }
      setError(null)

      try {
        const data = await getTask(taskId)
        setTask(data)
      } catch (err) {
        setTask(null)
        setError(getApiErrorMessage(err, 'Failed to load task.'))
      } finally {
        setIsLoading(false)
        setIsRetrying(false)
      }
    },
    [taskId],
  )

  useEffect(() => {
    void fetchTask()
  }, [fetchTask])

  const refetch = useCallback(() => fetchTask({ retry: true }), [fetchTask])

  return { task, isLoading, isRetrying, error, refetch }
}
