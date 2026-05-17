interface PageHeadingProps {
  title: string
  description?: string
}

export function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>
      )}
    </header>
  )
}
