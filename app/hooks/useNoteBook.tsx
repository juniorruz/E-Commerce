"use client"

import { useContext } from "react"

import { NotebookContext } from "@/app/contexts/notebookContext"

export const useNoteBook = () => {
  return useContext(NotebookContext)
}
