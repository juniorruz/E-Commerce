"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ProductData } from "../interfaces/productData"
import { searchProducts } from "@/services/api"
import { ProductCard } from "../_components/productCard"
import Header from "../_components/header"
import { LoaderCircle } from "lucide-react"

const SearchPage = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""

  const [searchProduct, setSearchProduct] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await searchProducts(query)
        setSearchProduct(response.data)
        console.log("data", response)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query])
  return (
    <>
      <Header />
      <div>
        <h3 className="pl-4 pt-2 text-gray-400">Resultados para: {query}</h3>{" "}
        {loading ? (
          <div>
            <LoaderCircle className="flex h-20 w-20 animate-spin items-center justify-center" />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {searchProduct.length > 0 ? (
              searchProduct.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="pl-4">Nenhum resultado encontrado.</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default SearchPage
