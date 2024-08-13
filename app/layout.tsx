import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import SidebarCmp from "./(dashboard)/_components/sidebarCmp";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Toffee Code',
  description: 'Aprenda a criar projetos criativos do inicio ao fim aonde o céu é o limite.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          <div
            className="rounded-md flex flex-col md:flex-row bg-gray-100 min-h-screen h-auto dark:bg-neutral-800 flex-1 w-full mx-auto border border-neutral-200 dark:border-neutral-700"
          >
            <SidebarCmp />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
