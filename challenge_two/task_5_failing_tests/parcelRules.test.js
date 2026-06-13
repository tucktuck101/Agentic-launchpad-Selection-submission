import assert from "node:assert/strict"
import { test } from "node:test"
import { applyDiscount, calculateShipping, normaliseStatus } from "./parcelRules.js"

test("standard NZ shipping is 8 dollars", () => {
  const order = {
    country: "NZ",
    items: [{ price: 20, quantity: 1 }]
  }

  assert.equal(calculateShipping(order), 8)
})

test("orders of exactly 100 dollars get free shipping", () => {
  const order = {
    country: "NZ",
    items: [{ price: 50, quantity: 2 }]
  }

  assert.equal(calculateShipping(order), 0)
})

test("bulky orders add a 5 dollar handling fee", () => {
  const order = {
    country: "NZ",
    items: [{ price: 5, quantity: 5 }]
  }

  assert.equal(calculateShipping(order), 13)
})

test("international orders add 20 dollars", () => {
  const order = {
    country: "AU",
    items: [{ price: 10, quantity: 1 }]
  }

  assert.equal(calculateShipping(order), 28)
})

test("invalid orders throw a useful error", () => {
  assert.throws(() => calculateShipping(null), /items/)
})

test("paid orders are ready", () => {
  assert.equal(normaliseStatus("paid"), "ready")
})

test("packed orders are packed", () => {
  assert.equal(normaliseStatus("packed"), "packed")
})

test("WELCOME10 removes 10 percent from the total", () => {
  assert.equal(applyDiscount(80, "WELCOME10"), 72)
})

test("unknown discount codes do not change the total", () => {
  assert.equal(applyDiscount(42, "NOPE"), 42)
})
