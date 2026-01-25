#!/usr/bin/env bash
set -euo pipefail

SSH_USER="${SSH_USER:-deploy}"
SSH_HOST="${SSH_HOST:-46.224.4.62}"
SSH_PORT="${SSH_PORT:-22}"
REMOTE_DIR="${REMOTE_DIR:-/srv/sasin91.xyz}"
SSH_KNOWN_HOSTS="${SSH_KNOWN_HOSTS:-}"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required for the production build." >&2
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync is required for deployment." >&2
  exit 1
fi

if [ -n "${SSH_KNOWN_HOSTS}" ]; then
  mkdir -p ~/.ssh
  chmod 700 ~/.ssh
  echo "${SSH_KNOWN_HOSTS}" >> ~/.ssh/known_hosts
  chmod 600 ~/.ssh/known_hosts
fi

if [ ! -d node_modules ]; then
  echo "Installing node dependencies..."
  npm ci
fi

echo "Building production assets..."
npm run build

echo "Syncing project to ${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}..."
rsync -az --delete \
  --exclude .git \
  --exclude .env \
  --exclude node_modules \
  --exclude vendor \
  -e "ssh -p ${SSH_PORT}" \
  ./ "${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}/"

echo "Deploying on server..."
IMAGE_TAG="$(git rev-parse --short HEAD)"
ssh -p "${SSH_PORT}" "${SSH_USER}@${SSH_HOST}" <<EOF
set -e
cd "${REMOTE_DIR}"
IMAGE_TAG="${IMAGE_TAG}" docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker compose exec -T app php artisan migrate --force
EOF

echo "Deploy complete."
