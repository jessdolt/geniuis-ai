import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"
import React from "react"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimiCount = await getApiLimitCount()
  const isPro = await checkSubscription()

  return (
    <div className="h-full relative ">
      <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar apiLimitCount={apiLimiCount} isPro={isPro} />
      </div>

      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
