import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Krishana Pearls',
  description: 'Exquisite pearl jewelry for every occasion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

