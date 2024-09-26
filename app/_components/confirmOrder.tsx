import { currencyFormat } from "../helpers/currencyFormat"
import { useCart } from "../hooks/useCart"

export const ConfirmOrder = () => {
  const { cart } = useCart()

  const totalAmount = cart.reduce((acc, item) => acc + item.subtotal, 0)

  return (
    <div className="flex w-full flex-col items-center justify-between space-x-4 rounded-md bg-zinc-800 py-3 md:sticky md:top-0 md:h-[400px] md:min-w-[200px] md:space-y-5">
      <div className="flex h-full w-full flex-col items-center">
        <div className="w-full border-b border-zinc-500 pb-2 text-center">
          <h2 className="text-gray-400">Resumo</h2>
        </div>
        <div className="mt-3 flex items-center justify-center pr-2 md:mt-auto md:pr-0">
          <strong className="text-lg">
            Total: {currencyFormat(totalAmount)}
          </strong>
        </div>
      </div>
    </div>
  )
}
