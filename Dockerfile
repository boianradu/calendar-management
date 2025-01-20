# Build layer
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Final layer
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package.json package-lock.json ./
RUN npm install --production
EXPOSE 8080
CMD ["npm", "start"] 