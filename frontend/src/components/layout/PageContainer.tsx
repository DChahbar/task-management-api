import type { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
  narrow?: boolean
}

export function PageContainer({
  children,
  className = '',
  narrow = false,
}: PageContainerProps) {
  const widthClass = narrow ? 'max-w-md' : 'max-w-5xl'

  return (
    <div
      className={`mx-auto w-full px-4 py-8 sm:px-6 sm:py-10 ${widthClass} ${className}`}
    >
      {children}
    </div>
  )
}
