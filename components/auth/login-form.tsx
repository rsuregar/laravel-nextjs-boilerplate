"use client"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import GoogleLoginButton from "./loginWithGoogle"

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email must be a valid email address",
    })
    .min(5, {
      message: "Email must be at least 5 characters",
    }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
})

export function LoginFormV2() {
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("error") === "email_domain_not_allowed") {
      setError(
        `You are not authorized to log in with this (${urlParams.get("email")}) email. Not allowed by the domain policy.`
      )
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await login(data)
    } catch (error: unknown) {
      // Type assertion to an expected structure
      const customError = error as {
        response?: { data?: { message?: string } }
      }

      // Access the message safely
      setError(customError.response?.data?.message || "An error occurred.")
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-red-600 p-2 border rounded-md mb-2 bg-red-50 border-red-600 text-xs text-center">
            {error}
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    We&apos;ll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Your Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <div className="flex justify-center mt-5">
          <GoogleLoginButton />
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
