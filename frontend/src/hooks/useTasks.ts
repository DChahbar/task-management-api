import { useCallback, useEffect, useRef, useState } from 'react'
import { listTasks } from '../api/tasks'
import type { Task } from '../types/api'
import { getApiErrorMessage } from '../utils/errors'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefetching, setIsRefetching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const hasLoadedRef = useRef(false)

  const refetch = useCallback(async () => {
    const isSubsequentLoad = hasLoadedRef.current

    if (isSubsequentLoad) {
      setIsRefetching(true)
      setFetchError(null)
    } else {
      setIsLoading(true)
      setError(null)
    }

    try {
      const data = await listTasks()
      setTasks(data)
      hasLoadedRef.current = true
      setError(null)
      setFetchError(null)
    } catch (err) {
      const message = getApiErrorMessage(err, 'Failed to load tasks.')
      if (isSubsequentLoad) {
        setFetchError(message)
      } else {
        setError(message)
      }
    } finally {
      setIsLoading(false)
      setIsRefetching(false)
    }
  }, [])

  const replaceTask = useCallback((updated: Task) => {
    setTasks((current) =>
      current.map((task) => (task.id === updated.id ? updated : task)),
    )
  }, [])

  const removeTask = useCallback((taskId: number) => {
    setTasks((current) => current.filter((task) => task.id !== taskId))
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return {
    tasks,
    setTasks,
    isLoading,
    isRefetching,
    error,
    fetchError,
    clearFetchError: () => setFetchError(null),
    refetch,
    replaceTask,
    removeTask,
  }
}
