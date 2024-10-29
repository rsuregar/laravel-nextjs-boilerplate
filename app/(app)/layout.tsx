"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { LoadingPage } from "@/components/loading"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth"
import { User } from "@/types"
import { redirect, usePathname } from "next/navigation"
import React from "react"

const generateBreadcrumbs = (pathname: string) => {
  // Split the pathname and filter out any empty segments
  const pathSegments = pathname.split("/").filter((segment) => segment)

  return pathSegments.map((segment, index) => ({
    name: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize the first letter
    path: `/${pathSegments.slice(0, index + 1).join("/")}`, // Construct the full path
  }))
}

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const { user, isLoadingUser, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)
  if (isLoadingUser) return <LoadingPage />
  if (!isAuthenticated) {
    return redirect("/login")
  }
  return (
    <SidebarProvider>
      <AppSidebar
        user={user as User}
        companyName="Next Gen Corp"
        companyTagline="Solution for your business"
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 sticky top-0 rounded-t-xl border-b border-gray-100 z-50 bg-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={breadcrumb.path}>
                      {breadcrumb.name}
                    </BreadcrumbLink>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-6">
          {user ? <p>Welcome, {user.name}</p> : <p>You are not logged in.</p>}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
