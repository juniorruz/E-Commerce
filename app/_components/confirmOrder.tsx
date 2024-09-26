import { currencyFormat } from "../helpers/currencyFormat"
import { useCart } from "../hooks/useCart"
import { Button } from "./ui/button"

export const ConfirmOrder = () => {
  const { cart, confirmOrder } = useCart()

  const totalAmount = cart.reduce((acc, item) => acc + item.subtotal, 0)

  return (
    <div className="flex items-center justify-end space-x-4 rounded-md py-3 md:h-[400px] md:flex-col md:space-y-5 md:bg-zinc-800">
      <strong className="text-lg">Total: {currencyFormat(totalAmount)}</strong>
      <div className="md:pr-4">
        <Button
          className="h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-900 uppercase"
          onClick={confirmOrder}
        >
          Confirmar pedido
        </Button>
      </div>
    </div>
  )
}
