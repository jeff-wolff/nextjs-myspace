import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import NavMenu from './NavMenu'
import AuthProvider from './AuthProvider'

export const metadata: Metadata = {
  title: 'Next Space',
  description: 'the coolest new social media site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <div className="container">
            <NavMenu />
            <main>
              {children}
            </main>
          </div>
        </body>
      </html>
    </AuthProvider>
  )
}
