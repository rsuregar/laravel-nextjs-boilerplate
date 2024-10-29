import Axios, { AxiosInstance } from "axios"
import { LoginCredentials, User } from "../types"

const api: AxiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
})

export const csrf = (): Promise<void> => api.get("/sanctum/csrf-cookie")

export const login = async (credentials: LoginCredentials): Promise<void> => {
  await csrf() // Ensure CSRF cookie is set before login
  return api.post("/api/login", credentials)
}

export const logout = (): Promise<void> => api.post("/logout")

export const fetchUser = (): Promise<{ data: User }> => api.get("/api/user")
