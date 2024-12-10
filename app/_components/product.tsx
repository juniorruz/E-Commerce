import Image from "next/image"

import { Card, CardContent, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
import { MdAddShoppingCart } from "react-icons/md"
import { currencyFormat } from "../helpers/currencyFormat"
import { ProductData } from "../interfaces/productData"
import { useCart } from "../hooks/useCart"

interface ProductsProps {
  products: ProductData[]
}

export const Product = ({ products }: ProductsProps) => {
  const { addProductIntoCart } = useCart()

  const specificationsLabel = [
    "Processador",
    "Memória RAM",
    "Armazenamento",
    "Placa de vídeo",
    "Sistema operacional",
  ]

  return (
    <div className="grid w-full gap-2 px-2 md:grid-cols-2 lg:grid-cols-3 2xl:px-[192px]">
      {!products.length
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
        : products.map((product) => (
            <div className="mt-3 grid w-full gap-2" key={product.id}>
              <Card className="border-none bg-transparent p-2 shadow-none">
                <CardHeader className="relative h-64 w-full">
                  <Image
                    src={product.imageUrl}
                    fill={true}
                    alt={product.model}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-t-lg object-cover"
                    priority={false}
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-1">
                    <h1>{product.brand}</h1>
                    <h1>{product.model}</h1>
                  </div>
                  <div className="min-h-[100px] p-2">
                    <ul className="list-inside list-disc text-sm text-gray-400">
                      {product.specification.split(",").map((item, index) => (
                        <li key={item}>
                          <strong>{specificationsLabel[index]}:</strong> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-green-600">
                        {currencyFormat(product.price)}
                      </strong>
                    </div>
                    <div>
                      <Button
                        onClick={() => addProductIntoCart(product)}
                        className="h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-900 hover:opacity-90"
                      >
                        <MdAddShoppingCart className="text-xl" />
                        Comprar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
    </div>
  )
}
