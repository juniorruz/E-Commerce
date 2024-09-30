import { useCart } from "../hooks/useCart"
import { Button } from "./ui/button"

export const ButtonConfirmOrder = () => {
  const { confirmOrder } = useCart()
  return (
    <div>
      <Button
        className="h-12 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-900 uppercase hover:opacity-90"
        onClick={confirmOrder}
      >
        Confirmar pedido
      </Button>
    </div>
  )
}
