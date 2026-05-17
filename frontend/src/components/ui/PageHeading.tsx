interface PageHeadingProps {
  title: string
  description?: string
  titleId?: string
  className?: string
}

export function PageHeading({
  title,
  description,
  titleId,
  className = 'mb-8',
}: PageHeadingProps) {
  return (
    <header className={className}>
      <h1
        id={titleId}
        className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50"
      >
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>
      )}
    </header>
  )
}
