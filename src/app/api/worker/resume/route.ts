import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const body = await request.json()
  const message = body.message
  console.log(message)
  return NextResponse.json({ message: "Hello, world!" })
}