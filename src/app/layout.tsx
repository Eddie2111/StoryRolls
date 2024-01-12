import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from "@/components/theme-provider"
import { EdgeStoreProvider } from '../lib/edgestore'
import { Toaster } from 'sonner';

import Navbar from "@/components/ui/navigation-menu/navbar"
import RouteProtector from '@/lib/routeProtector';

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: {
    template: '%s | Story Rolls on your journey',
    default: 'Story Rolls on your journey',
    absolute: 'Story Rolls on your journey',
  },
  description: 'StoryRolls is a blog about stories, policy, and anything.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RouteProtector />
        <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="light">
          <Navbar />
          <EdgeStoreProvider>
            {children}
          </EdgeStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
