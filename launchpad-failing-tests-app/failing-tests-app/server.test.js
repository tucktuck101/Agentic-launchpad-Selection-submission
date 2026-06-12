import assert from "node:assert/strict"
import { after, before, test } from "node:test"
import { createApp } from "./server.js"

let server
let baseUrl

before(async () => {
  server = createApp().listen(0)
  await new Promise((resolve) => server.once("listening", resolve))
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
  await new Promise((resolve) => server.close(resolve))
})

test("POST /api/quote returns subtotal, shipping, total, and status", async () => {
  const response = await fetch(`${baseUrl}/api/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      country: "NZ",
      status: "paid",
      discountCode: "",
      items: [{ price: 20, quantity: 2 }]
    })
  })

  const body = await response.json()

  assert.equal(response.status, 200)
  assert.deepEqual(body, {
    subtotal: 40,
    shipping: 8,
    total: 48,
    status: "ready"
  })
})
