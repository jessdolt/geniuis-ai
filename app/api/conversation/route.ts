import { checkApilimit, increaseApiLimit } from "@/lib/api-limit"
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

    const { messages } = body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI Api Key not configured", { status: 500 })
    }

    if (!messages) {
      return new NextResponse("Messages not provided", { status: 400 })
    }

    const freeTrial = await checkApilimit()

    if (!freeTrial) {
      return new NextResponse("Free trial limit reached", { status: 403 })
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    })

    await increaseApiLimit()

    return NextResponse.json(response.choices[0].message)
  } catch (e) {
    console.log("error")
    console.log(e)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
