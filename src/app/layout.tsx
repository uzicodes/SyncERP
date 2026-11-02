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
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
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
