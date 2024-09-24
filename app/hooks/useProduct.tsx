"use client"

import { useContext } from "react"
import { ProductContext } from "../contexts/productContext"

export const useProduct = () => {
  return useContext(ProductContext)
}
