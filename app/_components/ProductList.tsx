import { Card, CardContent, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import { ProductData } from "../interfaces/productData"
import { ProductCard } from "./productCard"

interface ProductsProps {
  products?: ProductData[]
  product?: ProductData
}

export const ProductList = ({ products }: ProductsProps) => {
  if (products) {
    return (
      <div className="grid w-full gap-2 px-2 md:grid-cols-2 lg:grid-cols-3 2xl:px-[192px]">
        {products.length === 0
          ? [...Array(15)].map((_, index) => (
              <div className="mt-3 grid w-full gap-2" key={index}>
                <Card className="border-none bg-transparent shadow-none">
                  <CardHeader>
                    <Skeleton className="h-64 w-full rounded-t-lg" />
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Skeleton className="mb-2 h-6 w-full" />
                    </div>
                    <div className="p-2">
                      <Skeleton className="h-6 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          : products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
      </div>
    )
  }
}
