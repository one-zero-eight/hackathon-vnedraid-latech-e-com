'use client'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import ReactQueryProvider from '../components/Providers'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuth = pathname.startsWith('/auth')
  return (
    <>
      {!isAuth && <Header />}
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </>
  )
}
