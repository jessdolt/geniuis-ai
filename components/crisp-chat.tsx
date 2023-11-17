"use client"
import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("ea8ad935-2e96-4222-afc6-96f74dd191da")
  }, [])

  return null
}
