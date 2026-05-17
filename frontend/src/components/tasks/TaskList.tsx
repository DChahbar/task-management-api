import type { Task } from '../../types/api'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  onDelete: (taskId: number) => void
  deletingId: number | null
}

export function TaskList({ tasks, onDelete, deletingId }: TaskListProps) {
  return (
    <ul className="space-y-3" aria-label="Task list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          isDeleting={deletingId === task.id}
        />
      ))}
    </ul>
  )
}
