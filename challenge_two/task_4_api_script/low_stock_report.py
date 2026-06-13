from urllib.request import urlopen
import json


API_URL = "http://localhost:5050/api/items"


def fetch_items():
    with urlopen(API_URL, timeout=5) as response:
        payload = json.load(response)
    return payload["items"]


def main():
    items = fetch_items()
    low_stock_items = [
        item for item in items if item["stock"] < item["reorderAt"]
    ]
    low_stock_items.sort(key=lambda item: item["margin"], reverse=True)

    for item in low_stock_items:
        print(
            f"{item['name']} | category={item['category']} | "
            f"stock={item['stock']} | reorderAt={item['reorderAt']} | "
            f"margin=${item['margin']:.2f}"
        )

    total_retail_value = sum(
        item["price"] * item["stock"] for item in low_stock_items
    )
    print(f"Total retail value of low-stock items: ${total_retail_value:.2f}")


if __name__ == "__main__":
    main()
