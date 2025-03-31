export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await fetch("http://localhost:3000/a4244dfc-49a0-04ea-9602-cfcc1201be91/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "Create a worker with the following resume: " + body.message,
        //stream: false,
      }),
    })
    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to get response from Eliza")
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error("Error communicating with Eliza:", error)
    throw error
  }
}
