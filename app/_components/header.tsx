"use client"

import { MenuIcon, Search, ShoppingCart, XIcon } from "lucide-react"
import { Button } from "./ui/button"
import { HeartFilledIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import Link from "next/link"
import { Input } from "./ui/input"

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleToggleMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <header className="xl:px-48">
      <div className="items-center lg:flex lg:flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="lg:hidden">
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
                className={`fixed left-0 top-0 z-40 flex h-full w-[60%] flex-col items-center justify-center bg-background transition-transform duration-300 ${isOpenMenu ? "translate-x-0" : "-translate-x-full"}`}
              >
                <nav className="mt-16 flex-1">
                  <ul>
                    <li>
                      <Link href="/#">Computadores</Link>
                    </li>
                    <li>
                      <Link href="/#">Computadores</Link>
                    </li>
                    <li>
                      <Link href="/#">Computadores</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          </div>
          <div className="lg:pl-4">
            <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-900 bg-clip-text text-3xl font-bold text-transparent lg:text-5xl">
              <Link href="/">Neon Tech</Link>
            </h1>
          </div>
          <div className="relative hidden w-[350px] lg:block 2xl:w-[500px]">
            <Input type="text" placeholder="Digite o que você procura" />
            <Search className="absolute right-2 top-3" width={20} height={20} />
          </div>
          <div className="flex items-center space-x-4 lg:p-4">
            <Button className="border-none" variant="outline">
              <HeartFilledIcon
                width={28}
                height={28}
                className="lg:text-red-500"
              />
              <span className="ml-2 hidden lg:block">Favoritos</span>
            </Button>
            <Button
              className="h-16 border-none lg:bg-green-500 lg:hover:border-green-500 lg:hover:bg-green-800"
              variant="outline"
            >
              <ShoppingCart width={28} height={28} />
              <span className="hidden lg:block">Meu carrinho</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
