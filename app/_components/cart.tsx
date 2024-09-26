"use client"

import Image from "next/image"
import Header from "./header"
import { useCart } from "../hooks/useCart"
import { currencyFormat } from "../helpers/currencyFormat"
import { FaTrashAlt } from "react-icons/fa"
import { ConfirmOrder } from "./confirmOrder"
import { CircleButton } from "./circleButton"

export const Cart = () => {
  const { cart, removeProductFromCart } = useCart()

  return (
    <>
      <Header />
      <div className="mt-5 flex-col px-4 xl:px-52">
        <div>
          <div className="flex w-full">
            <h1 className="pb-2 uppercase">Produtos no carrinho</h1>
          </div>
        </div>
        <div className="flex h-32 items-center justify-center md:hidden">
          <ConfirmOrder />
        </div>
        <div>
          {cart.length > 0 ? (
            <div className="flex flex-col md:flex-row">
              <div className="w-full rounded-md bg-zinc-800 p-2">
                <table className="w-full items-center justify-center">
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={`${item.product}-${index}`} className="border-b">
                        <td className="flex-col py-4">
                          <div className="relative h-[100px] w-[100px]">
                            <Image
                              src={item.imageUrl}
                              alt={item.model}
                              width={200}
                              height={200}
                              className="object-cover pl-2"
                            />
                          </div>
                          <div className="md:hidden">
                            <CircleButton item={item} />
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <h2 className="text-sm font-semibold">
                            {item.brand}, {item.model}, {item.processor},{" "}
                            {item.ram}GB, {item.graphicsCard}, {item.storage}
                          </h2>

                          <strong className="text-green-500">
                            {currencyFormat(item.price)}
                          </strong>
                        </td>
                        <div className="flex items-center">
                          <td className="hidden px-4 py-12 md:flex">
                            <CircleButton item={item} />
                          </td>
                          <td className="hidden px-4 py-4 md:flex">
                            <p className="font-semibold">
                              Subtotal:{" "}
                              {currencyFormat(item.quantity * item.price)}
                            </p>
                          </td>
                        </div>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => removeProductFromCart(item)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="y flex-row md:space-x-4 md:pl-3">
                <ConfirmOrder />
              </div>
            </div>
          ) : (
            <p className="py-8 text-center">Carrinho está vazio</p>
          )}
        </div>
      </div>
    </>
  )
}
