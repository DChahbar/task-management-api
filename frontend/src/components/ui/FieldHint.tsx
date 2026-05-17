import type { ReactNode } from 'react'

interface FieldHintProps {
  children: ReactNode
}

export function FieldHint({ children }: FieldHintProps) {
  return (
    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{children}</p>
  )
}
