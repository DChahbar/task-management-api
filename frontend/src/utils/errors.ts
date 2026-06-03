import axios from 'axios'

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) {
    return fallback
  }

  if (!error.response) {
    return 'Cannot reach the API. Check that uvicorn is running on port 8000 and only one copy is active.'
  }

  const detail = error.response?.data?.detail

  if (typeof detail === 'string') {
    return detail
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (typeof item === 'string') return item
        if (item && typeof item === 'object' && 'msg' in item) {
          return String(item.msg)
        }
        return 'Validation error'
      })
      .join(' ')
  }

  return fallback
}
