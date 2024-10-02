"use client"

import { MenuIcon, Search, ShoppingCart, XIcon } from "lucide-react"
import { Button } from "./ui/button"
import { HeartFilledIcon } from "@radix-ui/react-icons"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { useCart } from "../hooks/useCart"

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const { cart } = useCart()
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)

  const handleToggleMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  const handleCartPage = () => {
    router.push("/cart")
  }

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpenMenu(false)
      }
    }
    if (isOpenMenu) {
      document.addEventListener("mousedown", clickOutsideHandler)
    }
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler)
    }
  }, [isOpenMenu])

  return (
    <header className="xl:px-48">
      <div className="items-center lg:flex lg:flex-col">
        <div className="flex w-full items-center justify-between pt-[2px]">
          <div>
            <div className="left-2 top-[15px] z-50 flex">
              <Button
                className="z-50 border-none"
                variant="outline"
                onClick={handleToggleMenu}
              >
                {isOpenMenu ? (
                  <XIcon width={28} height={28} />
                ) : (
                  <MenuIcon width={28} height={28} />
                )}
              </Button>
            </div>

            <>
              <div
                className={`fixed inset-0 z-30 bg-black opacity-0 transition-opacity duration-300 ${
                  isOpenMenu ? "opacity-50" : "pointer-events-none opacity-0"
                }`}
              ></div>

              <div
                ref={menuRef}
                className={`fixed left-0 top-0 z-40 flex h-full w-[300px] flex-col items-center justify-center bg-background transition-transform duration-300 ${isOpenMenu ? "translate-x-0" : "-translate-x-full"}`}
              >
                <nav className="mt-16 flex-1">
                  <ul>
                    <li>
                      <Link onClick={handleToggleMenu} href="/#">
                        notebooks
                      </Link>
                    </li>
                    <li>
                      <Link onClick={handleToggleMenu} href="/#">
                        Computadores
                      </Link>
                    </li>
                    <li>
                      <Link onClick={handleToggleMenu} href="/#">
                        Computadores
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          </div>
          <div className="lg:pl-4">
            <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-900 bg-clip-text pl-4 text-3xl font-bold text-transparent md:pl-0 lg:text-5xl">
              <Link href="/">Neon Tech</Link>
            </h1>
          </div>
          <div className="relative hidden w-[350px] lg:block 2xl:w-[500px]">
            <Input type="text" placeholder="Digite o que você procura" />
            <Search className="absolute right-2 top-3" width={20} height={20} />
          </div>
          <div className="flex items-center lg:space-x-2 lg:p-4">
            <Button className="border-none" variant="outline">
              <HeartFilledIcon
                width={28}
                height={28}
                className="lg:text-red-500"
              />
              <span className="ml-2 hidden lg:block">Favoritos</span>
            </Button>

            <div className="items-center justify-center">
              <Button
                className="relative flex h-16 justify-center border-none lg:border-solid lg:bg-green-700 lg:hover:border-green-700 lg:hover:bg-green-800"
                variant="outline"
                onClick={handleCartPage}
              >
                <div className="relative flex justify-center">
                  <ShoppingCart width={28} height={28} />

                  <span className="absolute -right-2 -top-4 flex pl-2 lg:-right-16 lg:top-5 lg:text-center">
                    <div className="relative h-6 w-6 items-center justify-center rounded-full bg-red-600 pt-0.5 lg:flex lg:bg-transparent">
                      {cart.length}
                      {cart.length > 0 && (
                        <span className="hidden pl-2 lg:block">
                          {cart.length <= 1 ? "item" : "itens"}
                        </span>
                      )}
                    </div>
                  </span>
                </div>
                <h3 className="hidden uppercase lg:block lg:pl-2">carrinho</h3>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative w-full flex-col px-3 lg:hidden 2xl:w-[500px]">
          <Input type="text" placeholder="Digite o que você procura" />
          <Search className="absolute right-5 top-3" width={20} height={20} />
        </div>
      </div>
    </header>
  )
}

export default Header
