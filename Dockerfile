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
COPY --from=build /app/dist ./
COPY .env.docker.dev /app/.env
COPY ./scripts/waiter.sh /usr/local/bin/waiter
RUN chmod +x /usr/local/bin/waiter
COPY package.json package-lock.json ./
COPY ./prisma /app/prisma
RUN ls -lah /app 
RUN pwd
RUN npm install
RUN npx prisma generate 
RUN npx prisma migrate deploy
EXPOSE 8080
CMD ["npm", "start-docker"]