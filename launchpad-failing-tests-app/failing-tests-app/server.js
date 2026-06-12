import express from "express"
import { applyDiscount, calculateShipping, normaliseStatus } from "./parcelRules.js"

export function createApp() {
  const app = express()
  app.use(express.json())

  app.post("/api/quote", (req, res) => {
    const order = req.body
    const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discountedTotal = applyDiscount(subtotal, order.discountCode)

    res.json({
      subtotal,
      total: discountedTotal + calculateShipping(order),
      shipping: calculateShipping(order),
      status: normaliseStatus(order.status)
    })
  })

  return app
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  createApp().listen(4200, () => {
    console.log("Parcel rules app running on http://localhost:4200")
  })
}
