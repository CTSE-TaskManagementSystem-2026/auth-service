# Stage 1: Install dependencies and build the app
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first to leverage Docker cache
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the rest of the code
COPY . .

# Stage 2: Production environment (The "Lean" image)
FROM node:20-alpine AS runner

# Set environment to production
ENV NODE_ENV=production

# Set working directory inside the container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/src ./src
COPY --from=builder /app/.env ./.env

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory to nodejs user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose the port your app uses
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/auth/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))" || exit 1

# Start the application
CMD ["node", "server.js"]
