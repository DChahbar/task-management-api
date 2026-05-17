import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useFocusMainOnNavigate() {
  const { pathname } = useLocation()

  useEffect(() => {
    const main = document.getElementById('main-content')
    if (main instanceof HTMLElement) {
      main.focus({ preventScroll: true })
    }
  }, [pathname])
}
