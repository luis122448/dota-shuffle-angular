#!/bin/sh
# Docker container entrypoint — processes Nginx template and starts Nginx.

echo "Processing environment variables in Nginx config..."
envsubst '${API_URL_METRICS} ${WS_URL_METRICS} ' \
  < /etc/nginx/conf.d/default.conf.template \
  > /etc/nginx/conf.d/default.conf

echo "Starting Nginx..."
nginx -g 'daemon off;'
