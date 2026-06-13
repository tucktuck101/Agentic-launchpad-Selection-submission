export function calculateShipping(order) {
  if (!order || !Array.isArray(order.items)) {
    throw new Error("Order must include items")
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)

  let shipping = 8

  if (subtotal >= 100) {
    shipping = 0
  }

  if (itemCount >= 5) {
    shipping += 5
  }

  if (order.country !== "NZ") {
    shipping += 20
  }

  return shipping
}

export function normaliseStatus(status) {
  if (status === "paid") return "ready"
  if (status === "packed") return "ready"
  if (status === "cancelled") return "cancelled"
  return "waiting"
}

export function applyDiscount(total, code) {
  if (code === "WELCOME10") {
    return total * 0.9
  }

  return total
}
