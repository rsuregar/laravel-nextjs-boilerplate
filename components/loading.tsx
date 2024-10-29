import React from "react"

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  )
}
