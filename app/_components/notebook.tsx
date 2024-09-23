import { currencyFormat } from "../contexts/currencyFormat"
import { NotebookData } from "../interfaces/notebookData"
import { Card, CardContent, CardHeader } from "./ui/card"

interface NotebookProps {
  notebooks: NotebookData[]
}

export const Notebook = ({ notebooks = [] }: NotebookProps) => {
  return (
    <div className="grid w-full gap-2 px-4 md:grid-cols-2 lg:grid-cols-3 xl:px-52">
      {!notebooks.length
        ? [1, 2, 3, 4].map((n) => (
            <Card key={n}>
              <CardContent>Loading...</CardContent>
            </Card>
          ))
        : notebooks.map((notebook) => (
            <div className="mt-3 grid w-full gap-2" key={notebook.id}>
              <Card className="border-none">
                <CardHeader>
                  <h3>{notebook.model}</h3>
                </CardHeader>
                <CardContent>
                  <div></div>
                  <span className="text-sm text-gray-400">
                    {notebook.description}
                  </span>
                  <div>
                    <strong className="text-green-600">
                      {currencyFormat(notebook.price)}
                    </strong>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
    </div>
  )
}
