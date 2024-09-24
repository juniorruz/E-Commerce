import Image from "next/image"

import { Card, CardContent, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
import { MdAddShoppingCart } from "react-icons/md"
import { currencyFormat } from "../helpers/currencyFormat"
import { ProductData } from "../interfaces/productData"

interface NotebookProps {
  notebooks: ProductData[]
}

export const Notebook = ({ notebooks = [] }: NotebookProps) => {
  return (
    <div className="grid w-full gap-2 px-4 md:grid-cols-2 lg:grid-cols-3 xl:px-52">
      {!notebooks.length
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
        : notebooks.map((notebook) => (
            <div className="mt-3 grid w-full gap-2" key={notebook.id}>
              <Card className="border-none bg-transparent p-2 shadow-none">
                <CardHeader className="relative h-64 w-full">
                  <Image
                    src={notebook.imageUrl}
                    fill
                    alt={notebook.model}
                    className="rounded-t-lg object-cover"
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-1">
                    <h1>{notebook.brand}</h1>
                    <h1>{notebook.model}</h1>
                  </div>
                  <div className="p-2">
                    <ul className="list-inside list-disc text-sm text-gray-400">
                      <li>Processador: {notebook.processor}</li>
                      <li>Memória RAM: {notebook.ram} GB</li>
                      <li>Armazenamento: {notebook.storage}</li>
                      <li>Tela: {notebook.screenSize} polegadas</li>
                      <li>Gráficos: {notebook.graphicsCard}</li>
                      <li>Bateria: {notebook.batteryLife} horas</li>
                      <li>Peso: {notebook.weight} kg</li>
                      <li>Sistema Operacional: {notebook.operatingSystem}</li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-green-600">
                        {currencyFormat(notebook.price)}
                      </strong>
                    </div>
                    <div>
                      <Button className="h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-900">
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
