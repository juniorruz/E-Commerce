"use client"

import {
  LogInIcon,
  MenuIcon,
  ShoppingCart,
  UserCircleIcon,
  XIcon,
} from "lucide-react"
import { Button } from "./ui/button"
import { HeartFilledIcon } from "@radix-ui/react-icons"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

import { useRouter } from "next/navigation"
import { useCart } from "../hooks/useCart"
import { useSession } from "next-auth/react"
import { InputSearch } from "./inputSearch"

const Header = () => {
  const { data: session } = useSession()
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

  const handleLoginPage = () => {
    router.push("/auth/login")
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
    <header className="2xl:px-[183px]">
      <div className="items-center lg:flex lg:flex-col">
        <div className="flex w-full items-center justify-between pt-[2px]">
          <div>
            <div className="left-2 top-[15px] flex">
              <Button
                className="border-none"
                variant="outline"
                onClick={handleToggleMenu}
              >
                <MenuIcon width={28} height={28} />
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
                className={`fixed left-0 top-0 z-40 flex h-full w-[300px] flex-col items-center bg-background transition-transform duration-300 ${isOpenMenu ? "translate-x-0" : "-translate-x-full"}`}
              >
                <div className="fixed right-2 top-2 flex justify-end">
                  <button onClick={handleToggleMenu} className="border-none">
                    <XIcon width={28} height={28} />
                  </button>
                </div>
                <div className="flex-col items-center">
                  <div className="mt-8 flex text-xl">
                    {session ? (
                      <p>Olá, bem vindo {session?.user?.name}!</p>
                    ) : (
                      <div>
                        <Link
                          className="flex items-center gap-1"
                          href={"/auth/login"}
                        >
                          <p>Faça seu login</p>
                          <LogInIcon />
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="flex">
                    <nav className="mt-4 flex-1">
                      <ul>
                        <li>
                          <Link onClick={handleToggleMenu} href="/#">
                            Notebooks
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
                </div>
              </div>
            </>
          </div>
          <div className="pl-16 lg:pl-4">
            <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-900 bg-clip-text pl-4 text-3xl font-bold text-transparent md:pl-0 lg:text-5xl">
              <Link href="/">Neon Tech</Link>
            </h1>
          </div>
          <div className="relative hidden w-[350px] lg:block 2xl:w-[500px]">
            <InputSearch />
          </div>
          <div className="flex">
            {" "}
            <div className="flex items-center lg:p-4">
              <Button
                className="border-none"
                variant="outline"
                onClick={handleLoginPage}
              >
                <UserCircleIcon width={28} height={28} />
                <span className="ml-2 hidden text-xs uppercase lg:block">
                  Entre/Cadastre-se
                </span>
              </Button>
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
                  <h3 className="hidden uppercase lg:block lg:pl-2">
                    carrinho
                  </h3>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full flex-col px-3 lg:hidden 2xl:w-[500px]">
          <InputSearch />
        </div>
      </div>
    </header>
  )
}

export default Header
