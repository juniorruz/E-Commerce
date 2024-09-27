"use client"

import Image from "next/image"

import { useCart } from "../hooks/useCart"
import { currencyFormat } from "../helpers/currencyFormat"
import { FaTrashAlt } from "react-icons/fa"
import { ConfirmOrder } from "./confirmOrder"
import { CircleButton } from "./circleButton"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { IoChevronBack } from "react-icons/io5"
import { ButtonConfirmOrder } from "./buttonConfirmOrder"

export const Cart = () => {
  const { cart, removeProductFromCart } = useCart()

  return (
    <>
      <header className="xl:px-48">
        <div className="flex">
          <div className="flex w-full items-center justify-between p-4 pt-5">
            <div>
              <button>
                <Link className="flex items-center justify-center" href="/">
                  <IoChevronBack className="md:text-xl" />
                  <span className="text-xs">Voltar </span>
                </Link>
              </button>
            </div>
            <div>
              <h1 className="text-center text-2xl uppercase">Carrinho</h1>
            </div>
            <div className="items-center justify-center">
              <button>
                <div className="relative flex justify-center">
                  <ShoppingCart width={28} height={28} />

                  <span className="absolute -right-2 -top-4 flex pl-2">
                    <span className="relative h-6 w-6 items-center justify-center rounded-full bg-red-600 pt-0.5 text-sm">
                      {cart.length}
                    </span>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="mt-5 flex-col px-4 xl:px-52">
        <div>
          {cart.length > 0 ? (
            <>
              <div>
                <div className="hidden w-full md:block">
                  <h1 className="pb-2 uppercase">Produtos no carrinho</h1>
                </div>
              </div>
              <div className="pb-2 md:hidden">
                <ButtonConfirmOrder />
              </div>
              <div className="flex items-center justify-center pb-2 md:hidden">
                <ConfirmOrder />
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full rounded-md bg-zinc-800">
                  <table className="w-full">
                    <tbody>
                      {cart.map((item, index) => (
                        <tr key={`${item.product}-${index}`}>
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

                <div>
                  <div className="flex-row space-y-2 md:sticky md:top-0 md:pl-3">
                    <div className="hidden md:block">
                      <ConfirmOrder />
                    </div>
                    <div>
                      <ButtonConfirmOrder />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="py-8 text-center">Carrinho está vazio</p>
          )}
        </div>
      </div>
    </>
  )
}
