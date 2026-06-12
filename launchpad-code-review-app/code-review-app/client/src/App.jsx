import React, { useEffect, useMemo, useState } from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"

const API_URL = "http://localhost:4100/api/orders"

function App() {
  const [status, setStatus] = useState("all")
  const [includeContacted, setIncludeContacted] = useState(false)
  const [orders, setOrders] = useState([])
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    fetch(`${API_URL}?status=${status}&includeContacted=${includeContacted}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.items)
        setSelected(data.items[0])
      })
      .finally(() => setLoading(false))
  }, [status, includeContacted])

  const highPriorityCount = useMemo(() => {
    return orders.filter((order) => order.priority === "high").length
  })

  function markContacted(order) {
    fetch(`${API_URL}/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contacted: true, internalNote: note })
    })
      .then((response) => response.json())
      .then((updated) => {
        setOrders(orders.map((item) => (item.id === updated.id ? updated : item)))
        setSelected(updated)
      })
  }

  return (
    <main className="app">
      <header>
        <p className="eyebrow">Support Dashboard</p>
        <h1>Order Review</h1>
        <p>{highPriorityCount} high-priority orders in this view.</p>
      </header>

      <section className="filters">
        <label>
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="paid">Paid</option>
            <option value="stuck">Stuck</option>
            <option value="refunded">Refunded</option>
          </select>
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={includeContacted}
            onChange={(event) => setIncludeContacted(event.target.checked)}
          />
          Include contacted
        </label>
      </section>

      {loading && <p>Loading orders...</p>}

      <section className="layout">
        <div className="list">
          {orders.map((order) => (
            <button
              className={selected?.id === order.id ? "selected card" : "card"}
              key={order.customerName}
              onClick={() => {
                setSelected(order)
                setNote(order.internalNote)
              }}
            >
              <strong>{order.id}</strong>
              <span>{order.customerName}</span>
              <span>{new Date(order.placedAt).toLocaleDateString()}</span>
            </button>
          ))}
        </div>

        {selected && (
          <article className="detail">
            <h2>{selected.customerName}</h2>
            <p className={selected.priority === "high" ? "flag" : "ok"}>
              {selected.status} / ${selected.total} / {selected.priority} priority
            </p>
            <div className="order-message" dangerouslySetInnerHTML={{ __html: selected.customerMessage }} />

            <label>
              Internal support note
              <textarea value={note} onChange={(event) => setNote(event.target.value)} />
            </label>

            <button onClick={() => markContacted(selected)}>Mark contacted</button>
          </article>
        )}
      </section>
    </main>
  )
}

createRoot(document.getElementById("root")).render(<App />)
