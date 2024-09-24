import { createContext, ReactNode, useState } from "react"
import { ProductData } from "../interfaces/productData"
import { useRouter } from "next/router"

interface Product extends ProductData {
  quantity: number
  subtotal: number
}

interface CartContextProps {
  cart: Product[]
  addProductIntoCart: (product: ProductData) => void
  removeProductFromCart: (product: Product) => void
  productCartIncrement: (product: Product) => void
  productCartDecrement: (product: Product) => void
  confirmOrder: () => void
  clearCart: () => void
  payOrder: () => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

const localStorageKey = "@E-Commerce:cart"

export const CartProvider = ({ children }: CartProviderProps) => {
  const router = useRouter()
  const [cart, setCart] = useState<Product[]>(() => {
    const value = localStorage.getItem(localStorageKey)

    if (value) return JSON.parse(value)

    return []
  })

  const saveCart = (items: Product[]) => {
    setCart(items)
    localStorage.setItem(localStorageKey, JSON.stringify(items))
  }

  const clearCart = () => {
    localStorage.removeItem(localStorageKey)
  }

  const addProductIntoCart = (product: ProductData): void => {
    const productExistentInCart = cart.find(
      (item) => item.product === product.product && item.id === product.id,
    )

    if (productExistentInCart) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          const quantity = item.quantity + 1
          const subtotal = item.price * quantity

          return { ...item, quantity, subtotal }
        }

        return item
      })
      saveCart(newCart)

      return
    }

    const newProduct = { ...product, quantity: 1, subtotal: product.price }
    const newCart = [...cart, newProduct]
    saveCart(newCart)
  }

  const removeProductFromCart = (product: ProductData): void => {
    const newCart = cart.filter(
      (item) => !(item.id === product.id && item.product === product.product),
    )
    saveCart(newCart)
  }

  const updateProductQuantity = (product: ProductData, newQuantity: number) => {
    if (newQuantity < 0) return

    const productExistentInCart = cart.find(
      (item) => item.id === product.id && item.product === product.product,
    )

    if (!productExistentInCart) return

    const newCart = cart.map((item) => {
      if (
        item.id === productExistentInCart.id &&
        item.product === productExistentInCart.product
      ) {
        return {
          ...item,
          quantity: newQuantity,
          subtotal: product.price * newQuantity,
        }
      }

      return item
    })

    saveCart(newCart)
  }

  const productCartIncrement = (product: Product) => {
    updateProductQuantity(product, product.quantity + 1)
  }

  const productCartDecrement = (product: Product) => {
    updateProductQuantity(product, product.quantity - 1)
  }

  const confirmOrder = () => {
    router.push("/payment")
  }

  const payOrder = () => {
    console.log("Payment")

    clearCart()

    return
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductIntoCart,
        removeProductFromCart,
        productCartIncrement,
        productCartDecrement,
        confirmOrder,
        clearCart,
        payOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
