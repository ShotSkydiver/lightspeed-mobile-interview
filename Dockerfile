# Multi-stage Dockerfile for React Native Expo app

FROM node:18-alpine AS base

# Install dependencies for Expo
RUN apk add --no-cache git

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose Expo dev server, web, and mock API ports
EXPOSE 8081 19000 19001 19002 19006 3001

# Default command - can be overridden in docker-compose
CMD ["npm", "start"]
