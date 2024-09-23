import { NotebookProvider } from "./contexts/notebookContext"
import Header from "./_components/header"
import NotebookPage from "./notebooks/page"

export default function Home() {
  return (
    <NotebookProvider>
      <Header />
      <NotebookPage />
    </NotebookProvider>
  )
}
