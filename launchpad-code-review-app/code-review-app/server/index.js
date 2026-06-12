import express from "express"
import cors from "cors"

const app = express()
const port = 4100

app.use(cors())
app.use(express.json())

const orders = [
  {
    id: "ORD-1042",
    customerName: "Riley Chen",
    status: "paid",
    total: 86.5,
    placedAt: "2026-06-01T09:20:00Z",
    priority: "normal",
    contacted: false,
    shippingAddress: "42 Market Street, Wellington",
    customerMessage: "Can you confirm this will arrive before Friday?",
    internalNote: ""
  },
  {
    id: "ORD-1043",
    customerName: "Sam Taylor",
    status: "stuck",
    total: 240,
    placedAt: "2026-05-30T16:45:00Z",
    priority: "high",
    contacted: true,
    shippingAddress: "7 Harbour Road, Auckland",
    customerMessage: "Tracking has not moved for days.",
    internalNote: "Escalated to warehouse."
  },
  {
    id: "ORD-1044",
    customerName: "Jordan Lee",
    status: "refunded",
    total: 34.99,
    placedAt: "2026-06-02T12:10:00Z",
    priority: "low",
    contacted: false,
    shippingAddress: "19 Lake View, Christchurch",
    customerMessage: "Refund received, thanks.",
    internalNote: ""
  }
]

function getVisibleOrders(status, includeContacted) {
  let result = orders

  if (status !== "all") {
    result = result.filter((order) => order.status === status)
  }

  if (!includeContacted) {
    result = result.filter((order) => !order.contacted)
  }

  return result.sort((a, b) => a.placedAt < b.placedAt)
}

app.get("/api/orders", (req, res) => {
  const status = req.query.status || "all"
  const includeContacted = req.query.includeContacted || false

  res.json({
    count: orders.length,
    items: getVisibleOrders(status, includeContacted)
  })
})

app.patch("/api/orders/:id", (req, res) => {
  const order = orders.find((item) => item.id == req.params.id)

  if (!order) {
    res.status(404).json({ error: "Order not found" })
  }

  Object.assign(order, req.body)

  res.json(order)
})

app.post("/api/orders", (req, res) => {
  const order = {
    id: `ORD-${1042 + orders.length}`,
    placedAt: new Date().toISOString(),
    contacted: false,
    priority: req.body.total > 150 ? "high" : "normal",
    ...req.body
  }

  orders.push(order)
  res.status(201).json(order)
})

app.listen(port, () => {
  console.log(`Order support API running on http://localhost:${port}`)
})
