# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
# COPY ../package*.json ./
COPY . .
RUN ls -lah
RUN pwd
RUN npm install
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
