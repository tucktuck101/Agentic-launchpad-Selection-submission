# Task 4 API Script Notes

## Artefacts

- Script: `low_stock_report.py`
- Expected output: `low_stock_output.txt`
- Server bind failure evidence: `server_start_error.txt`
- API server inspected: `api-script-server/server.py`

## Run Instructions

Start the API server from the supplied server folder:

```bash
cd challenge_two/task_4_api_script/api-script-server
python3 server.py
```

Then run the consumer script from the task folder:

```bash
cd challenge_two/task_4_api_script
python3 low_stock_report.py
```

## Verification Notes

The consumer script already satisfies the brief:

- Fetches `http://localhost:5050/api/items`.
- Filters items where `stock < reorderAt`.
- Sorts low-stock items by highest `margin`.
- Prints name, category, stock, reorder point, and margin.
- Prints total retail value as `sum(price * stock)` for low-stock items.

I attempted to run the supplied API server with `python3 server.py` from `api-script-server/`, but the sandbox prevented binding to `0.0.0.0:5050` and raised `PermissionError: [Errno 1] Operation not permitted`. A follow-up escalation request to allow the local bind was rejected by the execution environment, so I did not capture a live endpoint run.

`low_stock_output.txt` records the expected script output based on the inspected static API data in `api-script-server/server.py` and the script's output format.

Script syntax verification passed with bytecode written outside the repository:

```bash
python3 -c 'import py_compile; py_compile.compile("low_stock_report.py", cfile="/private/tmp/low_stock_report.pyc", doraise=True)'
```

## Assumptions

- The endpoint returns JSON in the shape `{"items": [...]}`.
- The server-provided `margin` field is the intended sort key.
- Low stock means strictly less than `reorderAt`, not less than or equal.
- Total retail value uses current stock only: `price * stock`.

## Next Improvements

- Add command-line options for API URL and timeout.
- Handle endpoint errors with a clearer message and non-zero exit code.
- Add a small test fixture for sorting, filtering, and total calculation.
- Consider printing item IDs if support or purchasing teams need to reconcile the report with inventory systems.

## Evidence

Source files inspected:

- `Challenge_info.md`
- `AGENTS.md`
- `challenge_two/PLAN.md`
- `challenge_two/task_4_api_script/PLAN.md`
- `challenge_two/task_4_api_script/Agents.md`
- `challenge_two/task_4_api_script/api-script-server/server.py`
- `challenge_two/task_4_api_script/api-script-server/README.md`
- `challenge_two/task_4_api_script/low_stock_report.py`

Commands run:

- `sed -n '169,207p' Challenge_info.md`
- `sed -n '1,260p' challenge_two/PLAN.md`
- `sed -n '1,260p' challenge_two/task_4_api_script/PLAN.md`
- `sed -n '1,260p' challenge_two/task_4_api_script/Agents.md`
- `find challenge_two/task_4_api_script -maxdepth 3 -type f -print`
- `nl -ba challenge_two/task_4_api_script/api-script-server/server.py`
- `nl -ba challenge_two/task_4_api_script/low_stock_report.py`
- `python3 server.py` from `challenge_two/task_4_api_script/api-script-server/`
- `python3 -c 'import py_compile; py_compile.compile("low_stock_report.py", cfile="/private/tmp/low_stock_report.pyc", doraise=True)'`
