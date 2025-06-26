# Build stage
FROM node:22-alpine AS build

WORKDIR /home/app

# Set environment variables
ARG API_URL
ARG WS_URL

# Set environment variables for the build process
ENV API_URL=$API_URL
ENV WS_URL=$WS_URL

COPY ./angular.json /home/app
COPY ./package*.json /home/app
COPY ./tsconfig*.json /home/app
COPY ./tailwind.config.js /home/app
COPY ./server.ts /home/app
RUN npm install

COPY ./src /home/app/src

# Replace environment placeholders
RUN sed -i "s#\\[API_URL\\]#$API_URL#g" /home/app/src/environments/environment.ts
RUN sed -i "s#\\[WS_URL\\]#$WS_URL#g" /home/app/src/environments/environment.ts

RUN npm run build:ssr --prod

# Serve stage
FROM node:22-alpine AS serve

WORKDIR /home/app

# Copy the build output and package files
COPY --from=build /home/app/dist /home/app/dist
COPY --from=build /home/app/package*.json /home/app

RUN npm install --only=production

EXPOSE 4000

# Command to run the app with SSR
CMD ["node", "dist/dota-shuffle-angular/server/main.js"]
