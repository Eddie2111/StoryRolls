import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
import { ThemeProvider } from "@/components/theme-provider"
import { EdgeStoreProvider } from '../lib/edgestore';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    template: '%s | Next.js Blog Example with Markdown',
    default: 'Next.js Blog Example with Markdown',
    absolute: 'Next.js Blog Example with Markdown',
  },
  description: 'StoryRolls is a blog about stories, policy, and anything.',
}

import Navbar from "@/components/ui/navigation-menu/navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <EdgeStoreProvider>
          <Providers />
            {children}
          </EdgeStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
