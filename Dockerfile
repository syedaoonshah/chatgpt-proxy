FROM nginx:alpine

# Copy configuration and content
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/index.html

# Create log directory
RUN mkdir -p /var/log/nginx

# Expose port 80
EXPOSE 80

# Test configuration and start
RUN nginx -t
CMD ["nginx", "-g", "daemon off;"]
