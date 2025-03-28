import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const body = await request.json()
  const message = body.message

  const responseFromEliza = await fetch(
    "http://localhost:3001/api/eliza/send-message",
    {
      method: "POST",
      body: JSON.stringify({ message: message }),
    }
  )

  const data = await responseFromEliza.json()

  return NextResponse.json({ message: data })
}
