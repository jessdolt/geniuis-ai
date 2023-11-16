"use client"
import { Heading } from "@/components/heading"
import { MessageSquare, MusicIcon, VideoIcon } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { formSchema } from "./contants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
import Empty from "@/components/empty"
import Loader from "@/components/loader"
import { useProModal } from "@/hooks/user-pro-modal"

const VideoPage = () => {
  const router = useRouter()
  const [video, setVideo] = useState<string | undefined>("")
  const { onOpen } = useProModal()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  const isLoading = form.formState.isSubmitting
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined)

      const response = await axios.post("/api/video", values)

      setVideo(response.data[0])
      form.reset()
    } catch (e: any) {
      if (e?.response?.status === 403) {
        onOpen()
      }
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your prompt into video."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Vlog of a kid who is playing Jenga"
                        {...field}
                      />
                    </FormControl>
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
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}

        {!video && !isLoading && <Empty label="No video generated." />}

        {video && (
          <video
            controls
            className="w-full aspect-video mt-8 rounded-lg border bg-black"
          >
            <source src={video} />
          </video>
        )}
      </div>
    </div>
  )
}

export default VideoPage
