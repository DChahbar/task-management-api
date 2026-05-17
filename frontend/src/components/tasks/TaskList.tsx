import type { Task } from '../../types/api'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (task: Task) => void
  onDelete: (taskId: number) => void
  togglingId: number | null
  deletingId: number | null
  id?: string
}

export function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  togglingId,
  deletingId,
  id = 'task-list-panel',
}: TaskListProps) {
  return (
    <ul
      id={id}
      role="tabpanel"
      aria-label="Filtered tasks"
      className="space-y-3"
    >
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
