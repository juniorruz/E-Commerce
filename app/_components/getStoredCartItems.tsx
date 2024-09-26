export const getStoredCartItems = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("@E-Commerce:cart")
    if (value !== null) {
      try {
        const cartItems = JSON.parse(value)
        return cartItems
      } catch (error) {
        console.error(error)
      }
    }
  }

  return []
}
