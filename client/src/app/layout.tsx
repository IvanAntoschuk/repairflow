import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AppSidebar from "./widgets/Sidebar/sidebar"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "RepairFlow",
  description: "CMS for repair shops",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppSidebar />
        <div className="pl-64 min-h-screen">{children}</div>
      </body>
    </html>
  )
}
