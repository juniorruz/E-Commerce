import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ProductProvider } from "./contexts/productContext"
import { CartProvider } from "./contexts/cartContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Commerce",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ProductProvider>
          <CartProvider>{children}</CartProvider>
        </ProductProvider>
      </body>
    </html>
  )
}
