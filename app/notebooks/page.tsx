"use client"

import { Product } from "../_components/product"
import { useProduct } from "../hooks/useProduct"

const NotebookPage = () => {
  const { notebooks } = useProduct()
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <Product products={notebooks} />
      </div>
    </>
  )
}

export default NotebookPage
