# Build layer
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .  
RUN npm run build

# Final layer
FROM node:18
WORKDIR /app
COPY --from=build /app/dist .
EXPOSE 3000 
CMD ["startup.sh"]
