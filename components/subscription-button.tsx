"use client"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { Zap } from "lucide-react"
import axios from "axios"

interface SubscriptionButtonProps {
  isPro: boolean
}

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  isPro = false,
}) => {
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/stripe")

      window.location.href = response.data.url
    } catch (e) {
      console.log(e, "STRIPE_CLIENT_ERROR")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant={isPro ? "default" : "premium"}
      onClick={onClick}
      disabled={loading}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  )
}
