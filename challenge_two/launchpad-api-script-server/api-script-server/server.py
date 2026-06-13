from http.server import BaseHTTPRequestHandler, HTTPServer
import json

ITEMS = [
    {
        "id": "GM-101",
        "name": "Moonlit Marmalade",
        "category": "pantry",
        "stock": 4,
        "reorderAt": 8,
        "price": 12.5,
        "cost": 5.25,
    },
    {
        "id": "GM-102",
        "name": "Thunder Tea",
        "category": "drinks",
        "stock": 18,
        "reorderAt": 10,
        "price": 9.0,
        "cost": 3.1,
    },
    {
        "id": "GM-103",
        "name": "Pocket Lantern",
        "category": "gear",
        "stock": 2,
        "reorderAt": 5,
        "price": 28.0,
        "cost": 14.5,
    },
    {
        "id": "GM-104",
        "name": "Clockwork Pear",
        "category": "produce",
        "stock": 0,
        "reorderAt": 6,
        "price": 7.5,
        "cost": 2.75,
    },
    {
        "id": "GM-105",
        "name": "Velvet Rope",
        "category": "gear",
        "stock": 9,
        "reorderAt": 4,
        "price": 16.0,
        "cost": 8.2,
    },
]


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/items":
            items = [
                {
                    **item,
                    "margin": round(item["price"] - item["cost"], 2),
                }
                for item in ITEMS
            ]
            self.respond(200, {"items": items})
            return

        if self.path == "/":
            self.respond(200, {"message": "Try /api/items"})
            return

        self.respond(404, {"error": "Not found"})

    def respond(self, status, body):
        payload = json.dumps(body).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, format, *args):
        return


if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", 5050), Handler)
    print("Moon Market API running on http://localhost:5050", flush=True)
    server.serve_forever()
