# Build stage
FROM node:21-alpine AS build

WORKDIR /home/app

COPY ./angular.json /home/app
COPY ./package*.json /home/app
COPY ./tsconfig*.json /home/app
COPY ./tailwind.config.js /home/app
RUN npm install

COPY ./src /home/app/src
RUN npm run build:ssr

# Serve stage
FROM node:21-alpine AS serve

WORKDIR /home/app

# Copy the build output and package files
COPY --from=build /home/app/dist /home/app/dist
COPY --from=build /home/app/package*.json /home/app

RUN npm install --only=production

# Expose port 4000
EXPOSE 80

# Command to run the app with SSR
CMD ["node", "dist/server/main.js"]
