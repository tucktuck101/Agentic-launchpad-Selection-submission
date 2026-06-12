#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REQUIREMENTS_FILE="$ROOT_DIR/Requirements.txt"

if [[ ! -f "$REQUIREMENTS_FILE" ]]; then
  echo "Missing requirements file: $REQUIREMENTS_FILE" >&2
  exit 1
fi

if ! command -v apt-get >/dev/null 2>&1; then
  echo "This installer currently supports Debian/Ubuntu systems with apt-get." >&2
  exit 1
fi

section=""
apt_packages=()
npm_dirs=()

while IFS= read -r raw_line || [[ -n "$raw_line" ]]; do
  line="${raw_line%%#*}"
  line="${line#"${line%%[![:space:]]*}"}"
  line="${line%"${line##*[![:space:]]}"}"

  [[ -z "$line" ]] && continue

  case "$line" in
    "[apt]")
      section="apt"
      continue
      ;;
    "[npm]")
      section="npm"
      continue
      ;;
    "[python]")
      section="python"
      continue
      ;;
  esac

  case "$section" in
    apt)
      apt_packages+=("$line")
      ;;
    npm)
      npm_dirs+=("$line")
      ;;
    python)
      ;;
    *)
      echo "Ignoring requirement outside a known section: $line" >&2
      ;;
  esac
done < "$REQUIREMENTS_FILE"

if (( ${#apt_packages[@]} > 0 )); then
  echo "Installing system packages: ${apt_packages[*]}"
  sudo apt-get update
  sudo apt-get install -y "${apt_packages[@]}"
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is still unavailable after system package installation." >&2
  exit 1
fi

for app_dir in "${npm_dirs[@]}"; do
  package_json="$ROOT_DIR/$app_dir/package.json"

  if [[ ! -f "$package_json" ]]; then
    echo "Skipping $app_dir because package.json was not found." >&2
    continue
  fi

  echo "Installing npm dependencies in $app_dir"
  (cd "$ROOT_DIR/$app_dir" && npm install)
done

echo "Requirements installation complete."
