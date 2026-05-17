import type { Task } from '../../types/api'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (task: Task) => void
  onDelete: (taskId: number) => void
  togglingId: number | null
  deletingId: number | null
}

export function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  togglingId,
  deletingId,
}: TaskListProps) {
  return (
    <ul className="space-y-3" aria-label="Task list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          isToggling={togglingId === task.id}
          isDeleting={deletingId === task.id}
        />
      ))}
    </ul>
  )
}
