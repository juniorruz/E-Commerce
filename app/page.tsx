import Header from "./_components/header"
import { ProductProvider } from "./contexts/productContext"
import NotebookPage from "./notebooks/page"

export default function Home() {
  return (
    <ProductProvider>
      <Header />
      <NotebookPage />
    </ProductProvider>
  )
}
