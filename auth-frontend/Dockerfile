# Stage 1: Install dependencies and build the app
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first to leverage Docker cache
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the code and build for production
COPY . .
RUN npm run build

# Stage 2: Production environment (The "Lean" image)
FROM node:20-alpine AS runner

# Set working directory inside the container
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy only the necessary files from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# Install serve to serve the static build files
RUN npm install -g serve

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory to nodejs user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose the port your React app uses
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application
CMD ["sh","-c","PORT=${PORT} HOSTNAME=${HOSTNAME} serve -s build -l ${PORT}"]
