# Express Failing Tests App: Parcel Rules

This is a small Express app with 10 test cases.

Some failures are caused by broken application code. Some failures are caused by incorrect tests. Your job is to work out which is which and get the suite into a sensible passing state.

## Product Rules

- Standard New Zealand shipping is `$8`.
- Orders with a subtotal of `$100` or more get free standard shipping.
- Orders with 5 or more items add a `$5` handling fee.
- International orders add `$20`.
- `paid` and `packed` orders are both ready for dispatch, so the API reports both as `ready`.
- `WELCOME10` means the customer pays 10% less than the original total.
- Unknown discount codes do not change the total.

## Run

```bash
npm install
npm test
```

## Your Task

Review the failures and submit:

1. Which tests were valid and exposed broken code.
2. Which tests were themselves wrong or misleading.
3. What changes you made.
4. Any edge cases you would add next.

You can change application code and tests. Keep changes small and explain your reasoning.
