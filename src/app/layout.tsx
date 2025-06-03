import type React from "react"
import type { Metadata } from "next"
import { Roboto } from 'next/font/google'
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import ThemeProvider from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "CuisineQuest",
  description: "Discover the flavors of great cuisine",
  generator: "v0.dev",
}

const roboto = Roboto({
  subsets : ['latin'],
  weight : ['400', '600', '700', '800', '900']
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-br ${roboto.className} from-orange-50 to-red-50 min-h-screen`}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </AuthProvider>
      </body>
    </html>
  )
}
