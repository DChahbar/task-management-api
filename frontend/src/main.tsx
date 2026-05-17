import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { RouteFocusManager } from './components/RouteFocusManager'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RouteFocusManager />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
