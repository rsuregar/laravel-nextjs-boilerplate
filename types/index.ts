// types/index.ts
export interface User {
  id: number
  name: string
  email: string
  avatar: string
}

export interface LoginCredentials {
  email: string
  password: string
}
