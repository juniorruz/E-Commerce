import { MdAddShoppingCart } from "react-icons/md"
import { currencyFormat } from "../helpers/currencyFormat"
import { ProductData } from "../interfaces/productData"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import Image from "next/image"
import { useCart } from "../hooks/useCart"

interface ProductCardProps {
  product: ProductData
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addProductIntoCart } = useCart()
  const specificationsLabel = [
    "Processador",
    "Memória RAM",
    "Armazenamento",
    "Placa de vídeo",
    "Sistema operacional",
  ]

  if (!product) return null

  return (
    <div className="mt-3 grid w-full gap-2">
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
              {(product.specification || "").split(",").map((item, index) => (
                <li key={index}>
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
  )
}
