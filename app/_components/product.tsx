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
  return (
    <div className="grid w-full gap-2 px-4 md:grid-cols-2 lg:grid-cols-3 xl:px-52">
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
                    fill
                    alt={product.model}
                    className="rounded-t-lg object-cover"
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-1">
                    <h1>{product.brand}</h1>
                    <h1>{product.model}</h1>
                  </div>
                  <div className="p-2">
                    <ul className="list-inside list-disc text-sm text-gray-400">
                      <li>Processador: {product.processor}</li>
                      <li>Memória RAM: {product.ram} GB</li>
                      <li>Armazenamento: {product.storage}</li>
                      <li>Tela: {product.screenSize} polegadas</li>
                      <li>Gráficos: {product.graphicsCard}</li>
                      <li>Bateria: {product.batteryLife} horas</li>
                      <li>Peso: {product.weight} kg</li>
                      <li>Sistema Operacional: {product.operatingSystem}</li>
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
                        className="h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-900"
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
