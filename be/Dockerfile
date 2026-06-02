# Build stage (production-ready)
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Runtime stage
FROM node:22-alpine

WORKDIR /app

# Install dumb-init untuk proper signal handling
RUN apk add --no-cache dumb-init

# Copy dari builder
COPY --from=builder /app/node_modules ./node_modules

# Copy aplikasi
COPY . .

# Jalankan dengan dumb-init (best practice untuk Docker)
ENTRYPOINT ["dumb-init", "--"]

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Command
CMD ["node", "src/app.js"]

# Expose port
EXPOSE 5000
