"use client"

import { createContext, useEffect, useState } from "react"

import { getNotebooks } from "@/services/api"
import { NotebookData } from "../interfaces/notebookData"

interface NotebookContextProps {
  notebooks: NotebookData[]
}

interface NotebookProviderProps {
  children: React.ReactNode
}

export const NotebookContext = createContext({} as NotebookContextProps)

export function NotebookProvider({ children }: NotebookProviderProps) {
  const [notebooks, setNotebooks] = useState<NotebookData[]>([])

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
    <NotebookContext.Provider value={{ notebooks }}>
      {children}
    </NotebookContext.Provider>
  )
}
