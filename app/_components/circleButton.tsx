"use client"

import { CircleMinus, CirclePlus } from "lucide-react"
import { useCart } from "../hooks/useCart"
import { Product } from "../contexts/cartContext"

export const CircleButton = ({ item }: { item: Product }) => {
  const { productCartDecrement, productCartIncrement } = useCart()

  return (
    <div className="flex items-center text-sm md:py-5">
      <button
        onClick={() => productCartDecrement(item)}
        className="rounded-l px-2 py-1"
      >
        <CircleMinus width={18} height={18} />
      </button>
      <span className="px-3 py-1">{item.quantity}</span>
      <button
        onClick={() => productCartIncrement(item)}
        disabled={item.quantity >= 3}
        className={`rounded-r px-3 py-1 ${
          item.quantity >= 3
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        }`}
      >
        <CirclePlus width={18} height={18} />
      </button>
    </div>
  )
}
