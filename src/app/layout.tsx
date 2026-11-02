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

const mazegin = localFont({
  src: '../../public/fonts/MAZEGIN.woff2',
  variable: '--font-mazegin',
  weight: '100 900',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SyncERP - Enterprise Resource Planning',
  description: 'Enterprise ERP System',
  icons: {
    icon: '/Sync-ERP(transparent).webp',
    apple: '/Sync-ERP(transparent).webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${prodigy.variable} ${spaceGrotesk.variable} ${mazegin.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#151515] text-white"
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
