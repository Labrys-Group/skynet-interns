import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const message = body.message



  const responseFromEliza = await fetch(
    "http://localhost:3000/rebecca/message",
    {
      method: "POST",
      body: JSON.stringify({ text: message }),
    }
  )

  const data = await responseFromEliza.json()

  return NextResponse.json({ data })
}
