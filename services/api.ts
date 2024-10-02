import { ProductData } from "@/app/interfaces/productData"
import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export const getNotebooks = () => api.get<ProductData[]>("/products")

export default api
