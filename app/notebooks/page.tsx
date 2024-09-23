"use client"

import { Notebook } from "../_components/notebook"
import { useNoteBook } from "../hooks/useNoteBook"

const NotebookPage = () => {
  const { notebooks } = useNoteBook()
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
