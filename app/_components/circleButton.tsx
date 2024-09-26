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
        className="rounded-r px-3 py-1"
      >
        <CirclePlus width={18} height={18} />
      </button>
    </div>
  )
}
