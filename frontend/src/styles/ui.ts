export const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400'

export const btnPrimary = [
  'inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white no-underline',
  'hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60',
  'dark:bg-blue-500 dark:hover:bg-blue-400',
  focusRing,
].join(' ')

export const btnSecondary = [
  'inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 no-underline',
  'hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
  focusRing,
].join(' ')

export const linkMuted = [
  'text-sm font-medium text-blue-600 no-underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
  focusRing,
].join(' ')
