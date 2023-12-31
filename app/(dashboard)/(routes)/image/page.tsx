"use client"
import { Heading } from "@/components/heading"
import { MessageSquare, Image as ImageIcon, Download } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { amountOptions, formSchema, resolutionOptions } from "./contants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
import Empty from "@/components/empty"
import Loader from "@/components/loader"
import { cn } from "@/lib/utils"
import UserAvatar from "@/components/user-avatar"
import BotAvatar from "@/components/bot-avatar"
import Image from "next/image"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { SelectValue } from "@radix-ui/react-select"
import { Card, CardFooter } from "@/components/ui/card"
import { useProModal } from "@/hooks/user-pro-modal"
import toast from "react-hot-toast"

const ImagePage = () => {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const { onOpen } = useProModal()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([])

      const response = await axios.post("/api/image", values)
      const urls = response.data.map((image: { url: string }) => image.url)

      setImages(urls)
      form.reset()
    } catch (e: any) {
      if (e?.response?.status === 403) {
        onOpen()
      } else {
        toast.error("Something went wrong.")
      }
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image"
        icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A picture of a horse in Swiss alps"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="space-y-4 mt-4 px-4 pb-4 lg:px-8 lg:pb-8">
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}

        {images.length === 0 && !isLoading && (
          <Empty label="No images generated." />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {images.map((src) => (
            <Card className="rounded-lg overflow-hidden" key={src}>
              <div className="relative aspect-square">
                <Image src={src} alt="Image" fill={true} />
              </div>
              <CardFooter className="p-2">
                <Button
                  onClick={() => window.open(src)}
                  variant="secondary"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImagePage
