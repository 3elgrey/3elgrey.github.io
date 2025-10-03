# Docker Integration Guide

This guide covers the complete Docker setup for the portfolio project, including development, production, and CI/CD integration.

## 🐳 **Docker Overview**

The portfolio project now includes:
- ✅ **Multi-stage Dockerfile** for optimized production builds
- ✅ **Development environment** with hot reload
- ✅ **Docker Compose** for local development
- ✅ **Production deployment** with monitoring
- ✅ **CI/CD integration** with GitHub Actions
- ✅ **Security scanning** with Trivy
- ✅ **Container registry** publishing

## 📁 **Docker Files Structure**

```
├── Dockerfile                     # Production multi-stage build
├── Dockerfile.dev                 # Development environment
├── docker-compose.yml             # Local development setup
├── .dockerignore                  # Docker ignore patterns
├── docker/
│   ├── nginx.conf                 # Production nginx config
│   ├── nginx-dev.conf             # Development nginx config
│   ├── docker-compose.prod.yml    # Production deployment
│   └── Makefile                   # Docker convenience commands
└── .github/workflows/
    ├── docker-build.yml           # Docker build & push workflow
    └── docker-deploy.yml          # Docker deployment workflow
```

## 🚀 **Quick Start**

### **Local Development:**
```bash
# Start development environment
docker-compose --profile dev up -d

# Or using make
make dev

# View logs
make dev-logs

# Access application
open http://localhost:3001
```

### **Production Build:**
```bash
# Build production image
docker build -t portfolio:latest .

# Run production container
docker run -p 3000:80 portfolio:latest

# Or using make
make build && make run

# Access application
open http://localhost:3000
```

## 🔧 **Development Environment**

### **Features:**
- 🔄 **Hot reload** - Changes reflect immediately
- 🚫 **No caching** - Always fresh content
- 🔍 **Development endpoints** - `/dev-info`, `/health`
- 📊 **Live debugging** - Full development tools

### **Commands:**
```bash
# Start development environment
docker-compose --profile dev up -d

# Build and start (if Dockerfile changed)
docker-compose --profile dev up -d --build

# View logs
docker-compose --profile dev logs -f

# Stop development environment
docker-compose --profile dev down
```

### **Development URLs:**
- **Application:** http://localhost:3001
- **Health Check:** http://localhost:3001/health
- **Dev Info:** http://localhost:3001/dev-info

## 🏭 **Production Environment**

### **Features:**
- 🚀 **Optimized build** - Multi-stage Docker build
- 🔒 **Security hardened** - Non-root user, minimal attack surface
- 📊 **Health checks** - Built-in health monitoring
- 🗜️ **Compressed assets** - Gzip compression enabled
- 🛡️ **Security headers** - XSS, CSRF protection

### **Production Deployment:**
```bash
# Using docker-compose
docker-compose -f docker/docker-compose.prod.yml up -d

# Or using make
make prod

# View production logs
make prod-logs

# Health check
make health
```

### **Production URLs:**
- **Application:** http://localhost:80
- **Health Check:** http://localhost/health
- **Monitoring:** http://localhost:9090 (Prometheus)
- **Dashboards:** http://localhost:3000 (Grafana)

## 🔄 **CI/CD Integration**

### **GitHub Actions Workflows:**

#### **1. Docker Build & Push (`docker-build.yml`)**
**Triggers:**
- Push to `main`, `develop` branches
- Tags starting with `v*`
- Pull requests

**Features:**
- ✅ Multi-platform builds (AMD64, ARM64)
- ✅ Layer caching for faster builds
- ✅ Security scanning with Trivy
- ✅ Automatic tagging and versioning
- ✅ Container registry publishing

#### **2. Docker Deploy (`docker-deploy.yml`)**
**Triggers:**
- Successful completion of Docker Build workflow

**Features:**
- ✅ Staging deployment first
- ✅ Production deployment with approval
- ✅ Health checks and validation
- ✅ Automatic rollback on failure
- ✅ Email notifications

### **Container Registry:**
Images are published to GitHub Container Registry:
- **Latest:** `ghcr.io/3elgrey/portfolio:latest`
- **Develop:** `ghcr.io/3elgrey/portfolio:dev`
- **Tagged:** `ghcr.io/3elgrey/portfolio:v1.0.0`

## 🛠️ **Make Commands**

Use the convenient Makefile commands:

### **Development:**
```bash
make dev          # Start development environment
make dev-build    # Build and start development
make dev-logs     # View development logs
```

### **Production:**
```bash
make prod         # Start production environment
make prod-build   # Build and start production
make prod-logs    # View production logs
```

### **Testing:**
```bash
make test         # Run tests in container
make test-build   # Build test image
```

### **Utilities:**
```bash
make logs         # View all logs
make shell        # Open container shell
make stop         # Stop all containers
make clean        # Remove all containers/images
make health       # Check container health
make security-scan # Run security scan
```

## 🔒 **Security Features**

### **Container Security:**
- ✅ **Non-root user** - Runs as `portfolio` user (UID 1001)
- ✅ **Minimal base image** - Alpine Linux for smaller attack surface
- ✅ **No unnecessary packages** - Only required dependencies
- ✅ **Read-only filesystem** - Where possible
- ✅ **Security scanning** - Trivy vulnerability scanning

### **Web Security:**
- ✅ **Security headers** - XSS, CSRF, clickjacking protection
- ✅ **Content Security Policy** - Prevents code injection
- ✅ **HTTPS ready** - SSL/TLS configuration support
- ✅ **Rate limiting** - Built into nginx configuration

## 📊 **Monitoring & Observability**

### **Health Checks:**
```bash
# Container health
docker ps --format "table {{.Names}}\t{{.Status}}"

# Application health
curl http://localhost:3000/health

# Detailed health check
make health
```

### **Monitoring Stack (Production):**
- **Prometheus** - Metrics collection (port 9090)
- **Grafana** - Dashboards and visualization (port 3000)
- **Nginx logs** - Access and error logging
- **Container metrics** - Docker stats and health

### **Log Management:**
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f portfolio

# Production logs
docker-compose -f docker/docker-compose.prod.yml logs -f
```

## 🚨 **Troubleshooting**

### **Common Issues:**

**🔴 Build Failures:**
```bash
# Clear Docker cache
docker builder prune -f

# Rebuild without cache
docker build --no-cache -t portfolio:latest .
```

**🔴 Port Conflicts:**
```bash
# Check what's using the port
lsof -i :3000

# Use different ports
docker run -p 8080:80 portfolio:latest
```

**🔴 Permission Issues:**
```bash
# Check container user
docker exec -it portfolio-app whoami

# Check file permissions
docker exec -it portfolio-app ls -la /usr/share/nginx/html
```

**🔴 Health Check Failures:**
```bash
# Check health status
docker ps --format "table {{.Names}}\t{{.Status}}"

# Manual health check
curl -v http://localhost:3000/health

# Check container logs
docker logs portfolio-app
```

### **Debug Commands:**
```bash
# Enter container shell
docker exec -it portfolio-app sh

# Check nginx configuration
docker exec -it portfolio-app nginx -t

# View nginx error logs
docker exec -it portfolio-app tail -f /var/log/nginx/error.log

# Check process list
docker exec -it portfolio-app ps aux
```

## 🔄 **Deployment Strategies**

### **Blue-Green Deployment:**
```bash
# Start new version (green)
docker run -d -p 3001:80 --name portfolio-green ghcr.io/3elgrey/portfolio:latest

# Test green deployment
curl http://localhost:3001/health

# Switch traffic (update load balancer)
# Stop old version (blue)
docker stop portfolio-blue
docker rm portfolio-blue
```

### **Rolling Updates:**
```bash
# Pull latest image
docker pull ghcr.io/3elgrey/portfolio:latest

# Update with zero downtime
docker-compose -f docker/docker-compose.prod.yml up -d --no-deps portfolio
```

### **Rollback:**
```bash
# Rollback to previous version
docker tag ghcr.io/3elgrey/portfolio:stable ghcr.io/3elgrey/portfolio:latest
docker-compose -f docker/docker-compose.prod.yml up -d --no-deps portfolio
```

## 📈 **Performance Optimization**

### **Image Size Optimization:**
- ✅ **Multi-stage builds** - Separate build and runtime stages
- ✅ **Alpine base images** - Minimal Linux distribution
- ✅ **Layer caching** - Optimized Dockerfile layer order
- ✅ **Dependency pruning** - Only production dependencies

### **Runtime Optimization:**
- ✅ **Nginx caching** - Static asset caching
- ✅ **Gzip compression** - Reduced bandwidth usage
- ✅ **Health checks** - Proactive monitoring
- ✅ **Resource limits** - Prevent resource exhaustion

## 🎯 **Best Practices**

### **Development:**
- 🔄 Use development profile for local work
- 📝 Check logs regularly with `make dev-logs`
- 🧪 Test changes in container before committing
- 🔍 Use health endpoints for debugging

### **Production:**
- 🏷️ Always use tagged images in production
- 📊 Monitor health checks and metrics
- 🔒 Keep base images updated for security
- 💾 Backup persistent volumes

### **CI/CD:**
- ✅ Test Docker builds in CI pipeline
- 🔒 Scan images for vulnerabilities
- 📧 Set up notifications for build failures
- 🎯 Use semantic versioning for image tags

---

**Need Help?** Check the troubleshooting section or review the GitHub Actions logs for detailed error information.
