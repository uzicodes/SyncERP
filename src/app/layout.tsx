import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { AuthProvider } from '@/components/auth'
import './globals.css'

const prodigy = localFont({
  src: '../../public/fonts/ProdigySans.woff2',
  variable: '--font-prodigy',
  display: 'swap',
})

const spaceGrotesk = localFont({
  src: '../../public/fonts/SpaceGrotesk.woff2',
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SyncERP - Enterprise Resource Planning',
  description: 'Enterprise ERP System',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${prodigy.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#575B61]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
