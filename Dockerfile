# Description: Dockerfile for the Node.js app

# Use the official Node.js image
FROM node:22-alpine

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port
EXPOSE 8000

# Start the app
CMD ["npm", "start"]