import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Replicate from "replicate"
import { checkApilimit, increaseApiLimit } from "@/lib/api-limit"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { prompt } = body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!replicate.auth) {
      return new NextResponse("Replicate Api Token not configured", {
        status: 500,
      })
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 })
    }

    const freeTrial = await checkApilimit()

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt,
        },
      }
    )
    if (!freeTrial) {
      return new NextResponse("Free trial limit reached", { status: 403 })
    }
    await increaseApiLimit()
    return NextResponse.json(response)
  } catch (e) {
    console.log("error")
    console.log(e)
    return new NextResponse("Music Error", { status: 500 })
  }
}
