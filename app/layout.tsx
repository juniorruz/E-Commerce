import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ProductProvider } from "./contexts/productContext"
import { CartProvider } from "./contexts/cartContext"
import { Footer } from "./_components/footer"

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
          <CartProvider>
            <div className="flex h-full flex-col">
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  )
}
