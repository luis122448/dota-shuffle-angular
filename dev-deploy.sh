#!/bin/bash
# Build and run the application locally using a local Docker registry.
# Useful for testing the Docker image before pushing to a remote registry.

set -e

IMAGE_NAME="dota-shuffle-frontend"
CONTAINER_NAME="dota-shuffle-angular"
LOCAL_PORT="4203"
CONTAINER_PORT="80"

# --- Start local registry if not running ---
if ! docker ps --format '{{.Names}}' | grep -q '^local-registry$'; then
  echo "Starting local Docker registry on port 5000..."
  docker run -d --name local-registry -p 5000:5000 registry:2 || true
fi

# --- Build image using build-release.sh ---
echo "Building image for local deployment..."
chmod +x build-release.sh
./build-release.sh "0.0.1" "development" "amd64" "localhost:5000" "local"

# --- Stop and remove previous container ---
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "Stopping and removing previous container..."
  docker stop "${CONTAINER_NAME}" || true
  docker rm "${CONTAINER_NAME}" || true
fi

# --- Pull from local registry and run ---
echo "Starting container..."
docker pull "localhost:5000/local/${IMAGE_NAME}:0.0.1"
docker run -d \
  --name "${CONTAINER_NAME}" \
  -p "${LOCAL_PORT}:${CONTAINER_PORT}" \
  -e API_URL_METRICS="${API_URL_METRICS:-http://host.docker.internal:8000}" \
  -e WS_URL_METRICS="${WS_URL_METRICS:-http://host.docker.internal:8000}" \
  "localhost:5000/local/${IMAGE_NAME}:0.0.1"

echo ""
echo "=============================================================="
echo "Application running at: http://localhost:${LOCAL_PORT}"
echo "View logs:              docker logs -f ${CONTAINER_NAME}"
echo "Stop container:         docker stop ${CONTAINER_NAME}"
echo "=============================================================="
