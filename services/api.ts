/* eslint-disable @typescript-eslint/no-unused-vars */
import ApiResponse from "@/app/interfaces/apiResponse"
import { ProductData } from "@/app/interfaces/productData"
import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})
export const postLogin = async (data: {
  email: string
  password: string
}): Promise<{
  success: boolean
  message: string
  data?: { id: string; email: string; password: string }
}> => {
  try {
    const response = await api.post("/auth/login", data)
    if (response.data.success) {
      return {
        success: true,
        message: "Login realizado com sucesso",
        data: response.data.data,
      }
    } else {
      return {
        success: false,
        message: "Usuário ou senha inválidos",
        data: response.data.user,
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Erro no login:", error.response.data)
      return {
        success: false,
        message: error.response.data.message || "Erro de autenticação",
      }
    }
    console.error("Erro desconhecido no login:", error)
    return {
      success: false,
      message: "Erro desconhecido no login",
    }
  }
}
export const postNewUser = async (data: {
  name: string
  email: string
  password: string
}): Promise<ApiResponse> => {
  try {
    const response = await api.post("/auth/signup", data)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status
      const message = error.response.data.message || "Erro ao criar usuário"

      if (status === 400) {
        return {
          success: false,
          message,
        }
      } else {
        return {
          success: false,
          message: "Erro desconhecido",
        }
      }
    }
    return {
      success: false,
      message: "Erro desconhecido",
    }
  }
}

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
