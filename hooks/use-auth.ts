"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { login, logout, fetchUser } from "../lib/api"
import { User, LoginCredentials, CustomError } from "../types"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useEffect } from "react"

interface IUseAuth {
  middleware?: "auth" | "guest"
  redirectIfAuthenticated?: string
}

export function useAuth({
  middleware,
  redirectIfAuthenticated,
}: IUseAuth = {}) {
  const queryClient = useQueryClient()
  const router = useRouter()
  // Query for fetching user
  const {
    data: user,
    isLoading: isLoadingUser,
    isPending: isPendingUser,
    isError: error,
  } = useQuery<{ data: User }, CustomError>({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
    // throwOnError: true,
  })

  // Mutation for login
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return login(credentials)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
    onError: (error: CustomError) => {
      loginMutation.reset() // Reset the mutation state
      toast.error(error?.response?.data?.message || "Login failed")
    },
  })

  // Mutation for logout
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear() // Clear the cache after logging out
      router.push("/login") // Redirect to the login page
    },
    onError: (error) => {
      // console.error("Logout error:", error)
      toast.error(error?.message || "Logout failed")
    },
  })

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated)
    }

    if (middleware === "auth" && error) {
      router.push("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error, middleware, redirectIfAuthenticated])

  return {
    user: user?.data,
    isAuthenticated: !!user?.data,
    isLoadingUser,
    isPendingUser,
    login: (credentials: LoginCredentials) =>
      loginMutation.mutateAsync(credentials),
    logout: () => logoutMutation.mutateAsync(),
  }
}
