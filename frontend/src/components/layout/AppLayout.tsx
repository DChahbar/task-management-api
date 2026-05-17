import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { PageContainer } from './PageContainer'

interface AppLayoutProps {
  children: ReactNode
  headerVariant?: 'guest' | 'app'
  narrow?: boolean
  className?: string
}

export function AppLayout({
  children,
  headerVariant = 'guest',
  narrow = false,
  className,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant={headerVariant} />
      <main id="main-content" className="flex-1">
        <PageContainer narrow={narrow} className={className}>
          {children}
        </PageContainer>
      </main>
      <Footer />
    </div>
  )
}
