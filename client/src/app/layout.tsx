import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "./widgets/Header"
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
      <body className="min-h-full bg-surface font-body-default text-on-surface">
        <div className="flex min-h-screen">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Header />
            <main className="flex-1 px-gutter-desktop">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
