# Use the official Node.js image as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Nuxt application
# Note: we override the nitro preset to 'node-server' for Docker use
# (The nuxt.config.ts uses cloudflare-pages by default)
ENV NITRO_PRESET=node-server
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application using the built node server
CMD ["node", ".output/server/index.mjs"]
