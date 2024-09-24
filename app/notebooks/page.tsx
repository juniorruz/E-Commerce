"use client"

import { Notebook } from "../_components/notebook"
import { useProduct } from "../hooks/useProduct"

const NotebookPage = () => {
  const { notebooks } = useProduct()
  return (
    <>
      {" "}
      <div className="flex w-full flex-col items-center">
        <Notebook notebooks={notebooks} />
      </div>
    </>
  )
}

export default NotebookPage
