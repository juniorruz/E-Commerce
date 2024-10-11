/* eslint-disable @typescript-eslint/no-unused-vars */
import ApiResponse from "@/app/interfaces/apiResponse"
import { ProductData } from "@/app/interfaces/productData"
import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export const postNewUser = async (data: {
  name: string
  email: string
  password: string
}): Promise<ApiResponse> => {
  try {
    const response = await api.post("/auth/signup", data)
    return response.data
  } catch (error) {
    return { success: false, message: "Erro ao cadastrar" }
  }
}

export const getNotebooks = () => api.get<ProductData[]>("/products")

export default api
