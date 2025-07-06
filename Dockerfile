# Dockerfile for Railway Caddy Reverse Proxy
FROM caddy:2.7.6-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Create necessary directories
RUN mkdir -p /etc/caddy /var/log/caddy /var/lib/caddy

# Copy Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

# Create a simple health check script
RUN echo '#!/bin/sh' > /health.sh && \
    echo 'curl -f http://localhost:$PORT/health || exit 1' >> /health.sh && \
    chmod +x /health.sh

# Set proper permissions
RUN chown -R caddy:caddy /etc/caddy /var/log/caddy /var/lib/caddy

# Expose port (Railway will assign this dynamically)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD /health.sh

# Run Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
