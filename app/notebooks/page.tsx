"use client"

import { ProductList } from "../_components/ProductList"
import { useProduct } from "../hooks/useProduct"

const NotebookPage = () => {
  const { notebooks } = useProduct()
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <ProductList products={notebooks} />
      </div>
    </>
  )
}

export default NotebookPage
