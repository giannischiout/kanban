import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ReactQueryProvider } from '@/app/_components/react-query-provider'

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'greek'],
  weight: ['200', '300', '400', '500', '600', '700'],
})

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={`${interFont.variable} ${robotoMono.variable} font-roboto-mono antialiased`}>
          <TooltipProvider>{children}</TooltipProvider>
        </body>
      </ReactQueryProvider>
    </html>
  )
}
