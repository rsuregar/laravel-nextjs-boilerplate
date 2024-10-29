import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ReactQueryClientProvider } from "@/providers/QueryClients"
import { Toaster } from "@/components/ui/sonner"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Next.js with Laravel Sanctum",
  description: "Next.js with Laravel Sanctum",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main>{children}</main>
          <Toaster richColors />
        </body>
      </html>
    </ReactQueryClientProvider>
  )
}
