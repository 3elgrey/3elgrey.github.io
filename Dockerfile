# Multi-stage build for optimized production image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Run tests to ensure code quality
RUN npm test

# Production stage
FROM nginx:alpine AS production

# Install Node.js for any runtime needs
RUN apk add --no-cache nodejs npm

# Copy built application
COPY --from=builder /app /usr/share/nginx/html

# Copy custom nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S portfolio -u 1001 -G nodejs

# Set proper permissions
RUN chown -R portfolio:nodejs /usr/share/nginx/html && \
    chown -R portfolio:nodejs /var/cache/nginx && \
    chown -R portfolio:nodejs /var/log/nginx && \
    chown -R portfolio:nodejs /etc/nginx/conf.d

# Switch to non-root user
USER portfolio

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

