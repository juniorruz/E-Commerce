"use client"

import { createContext, useEffect, useState } from "react"

import { getNotebooks } from "@/services/api"
import { ProductData } from "../interfaces/productData"

interface ProductContextProps {
  notebooks: ProductData[]
}

interface ProductProviderProps {
  children: React.ReactNode
}

export const ProductContext = createContext({} as ProductContextProps)

export function ProductProvider({ children }: ProductProviderProps) {
  const [notebooks, setNotebooks] = useState<ProductData[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const notebookRequest = await getNotebooks()

        const request = notebookRequest.data
        setNotebooks(request)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <ProductContext.Provider value={{ notebooks }}>
      {children}
    </ProductContext.Provider>
  )
}
