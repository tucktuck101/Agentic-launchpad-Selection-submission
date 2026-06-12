# Tiny API Server: Moon Market

This small Python API serves static inventory data for a fictional night market.

Your task is to run the server locally, then write a JavaScript or Python script that consumes the endpoint and prints a useful summary.

## Run With Docker

```bash
docker build -t moon-market-api .
docker run --rm -p 5050:5050 moon-market-api
```

Then open:

```text
http://localhost:5050/api/items
```

## Run Without Docker

```bash
python3 server.py
```

Then open:

```text
http://localhost:5050/api/items
```

## Your Script

Write a script that fetches `http://localhost:5050/api/items` and:

1. Finds items where `stock` is less than `reorderAt`.
2. Sorts them by highest `margin` first.
3. Prints one line per item with the item name, category, stock, reorder point, and margin.
4. Prints the total retail value of the low-stock items.

For this task, **total retail value** means:

```text
sum of price * current stock for each low-stock item
```

Use JavaScript or Python. Submit your script or partial script, the output you expected or got, and any assumptions you made.
