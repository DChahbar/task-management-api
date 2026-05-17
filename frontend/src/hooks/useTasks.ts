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
    error,
    refetch,
    replaceTask,
    removeTask,
  }
}
