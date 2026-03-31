# Stage 1: Build the Angular application
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Environment argument for the build
ARG env=production

# Build the application
RUN npm run build -- --configuration=${env}

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build output from the build stage
COPY --from=build /app/dist/dota-shuffle-angular/browser /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx/conf.d /etc/nginx/conf.d
COPY entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 80
