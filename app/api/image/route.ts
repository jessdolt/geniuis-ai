import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { prompt, amount = 1, resolution = "512x512" } = body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI Api Key not configured", { status: 500 })
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 })
    }
    if (!amount) {
      return new NextResponse("Amount is required ", { status: 400 })
    }
    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 })
    }

    // const response = await openai.createImage({
    //   model: "dall-e-3",
    //   prompt,
    //   n: amount,
    //   size: resolution,
    // })

    return NextResponse.json(response.choices[0].message)
  } catch (e) {
    console.log("error")
    console.log(e)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
