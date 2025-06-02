import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import ThemeProvider from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "CuisineQuest",
  description: "Discover the flavors of great cuisine",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-orange-50 to-red-50 min-h-screen">
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </AuthProvider>
      </body>
    </html>
  )
}
