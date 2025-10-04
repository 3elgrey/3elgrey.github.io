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

---

## 🚀 **Docker Commands Reference**

### **📋 Quick Command Cheat Sheet**

#### **🏗️ Build Commands**
```bash
# Production build (recommended)
docker build -f Dockerfile.prod -t portfolio:latest .

# Development build
docker build -f Dockerfile.dev -t portfolio:dev .

# Original build (with tests)
docker build -t portfolio:test .

# Build with no cache
docker build --no-cache -f Dockerfile.prod -t portfolio:latest .

# Multi-platform build
docker buildx build --platform linux/amd64,linux/arm64 -f Dockerfile.prod -t portfolio:latest .
```

#### **🚀 Run Commands**
```bash
# Run production container
docker run -d -p 3000:80 --name portfolio-app portfolio:latest

# Run with custom name and port
docker run -d -p 8080:80 --name my-portfolio portfolio:latest

# Run development container
docker run -d -p 3001:80 --name portfolio-dev portfolio:dev

# Run with environment variables
docker run -d -p 3000:80 -e NODE_ENV=production --name portfolio-app portfolio:latest

# Run interactively (for debugging)
docker run -it --rm -p 3000:80 portfolio:latest sh

# Run with volume mount (development)
docker run -d -p 3000:80 -v $(pwd):/usr/share/nginx/html --name portfolio-dev portfolio:dev
```

#### **📊 Management Commands**
```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop container
docker stop portfolio-app

# Start stopped container
docker start portfolio-app

# Restart container
docker restart portfolio-app

# Remove container
docker rm portfolio-app

# Remove container (force)
docker rm -f portfolio-app

# View container logs
docker logs portfolio-app

# Follow logs in real-time
docker logs -f portfolio-app

# Execute command in running container
docker exec -it portfolio-app sh

# Copy files to/from container
docker cp file.txt portfolio-app:/usr/share/nginx/html/
docker cp portfolio-app:/usr/share/nginx/html/file.txt ./
```

#### **🖼️ Image Commands**
```bash
# List images
docker images

# Remove image
docker rmi portfolio:latest

# Remove unused images
docker image prune

# Tag image
docker tag portfolio:latest ghcr.io/3elgrey/portfolio:latest

# Push to registry
docker push ghcr.io/3elgrey/portfolio:latest

# Pull from registry
docker pull ghcr.io/3elgrey/portfolio:latest

# Save image to file
docker save -o portfolio.tar portfolio:latest

# Load image from file
docker load -i portfolio.tar
```

#### **🐙 Docker Compose Commands**
```bash
# Start all services
docker-compose up -d

# Start development profile
docker-compose --profile dev up -d

# Start production profile
docker-compose -f docker/docker-compose.prod.yml up -d

# Build and start
docker-compose up -d --build

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f portfolio

# Scale service
docker-compose up -d --scale portfolio=3

# Execute command in service
docker-compose exec portfolio sh
```

#### **🛠️ Make Commands (Convenience)**
```bash
# Development
make dev              # Start development environment
make dev-build        # Build and start development
make dev-logs         # View development logs

# Production
make prod             # Start production environment
make prod-build       # Build and start production
make prod-logs        # View production logs

# Testing
make test             # Run tests in container
make test-build       # Build test image

# Utilities
make logs             # View all logs
make shell            # Open container shell
make stop             # Stop all containers
make clean            # Remove all containers/images
make health           # Check container health
make security-scan    # Run security scan
make push             # Push to registry
make pull             # Pull from registry
make update           # Update and restart
```

#### **🔍 Debugging & Troubleshooting Commands**
```bash
# Check container health
docker inspect portfolio-app | grep -i health

# View container resource usage
docker stats portfolio-app

# Check container processes
docker exec -it portfolio-app ps aux

# Test network connectivity
docker exec -it portfolio-app wget -qO- http://localhost/health

# Check nginx configuration
docker exec -it portfolio-app nginx -t

# View nginx error logs
docker exec -it portfolio-app tail -f /var/log/nginx/error.log

# Check file permissions
docker exec -it portfolio-app ls -la /usr/share/nginx/html

# Debug DNS resolution
docker exec -it portfolio-app nslookup google.com

# Check environment variables
docker exec -it portfolio-app env
```

#### **🧹 Cleanup Commands**
```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Remove everything unused
docker system prune

# Remove everything (including volumes)
docker system prune -a --volumes

# Clean up specific to portfolio
docker stop $(docker ps -q --filter "name=portfolio")
docker rm $(docker ps -aq --filter "name=portfolio")
docker rmi $(docker images -q --filter "reference=portfolio*")
```

#### **📈 Monitoring Commands**
```bash
# Real-time container stats
docker stats

# Container resource usage
docker exec -it portfolio-app top

# Check disk usage
docker system df

# Monitor logs with timestamps
docker logs -f -t portfolio-app

# Check container health status
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Export container metrics
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

#### **🔒 Security Commands**
```bash
# Scan image for vulnerabilities
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image portfolio:latest

# Check for security updates
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image --severity HIGH,CRITICAL portfolio:latest

# Run security benchmark
docker run --rm --net host --pid host --userns host --cap-add audit_control \
  -e DOCKER_CONTENT_TRUST=$DOCKER_CONTENT_TRUST \
  -v /etc:/etc:ro \
  -v /usr/bin/docker-containerd:/usr/bin/docker-containerd:ro \
  -v /usr/bin/docker-runc:/usr/bin/docker-runc:ro \
  -v /usr/lib/systemd:/usr/lib/systemd:ro \
  -v /var/lib:/var/lib:ro \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --label docker_bench_security \
  docker/docker-bench-security
```

#### **🌐 Network Commands**
```bash
# Create custom network
docker network create portfolio-network

# Run container in custom network
docker run -d --network portfolio-network --name portfolio-app portfolio:latest

# Connect container to network
docker network connect portfolio-network portfolio-app

# Inspect network
docker network inspect portfolio-network

# List networks
docker network ls
```

#### **💾 Volume Commands**
```bash
# Create named volume
docker volume create portfolio-data

# Run with named volume
docker run -d -p 3000:80 -v portfolio-data:/data --name portfolio-app portfolio:latest

# List volumes
docker volume ls

# Inspect volume
docker volume inspect portfolio-data

# Backup volume
docker run --rm -v portfolio-data:/data -v $(pwd):/backup alpine tar czf /backup/portfolio-backup.tar.gz -C /data .

# Restore volume
docker run --rm -v portfolio-data:/data -v $(pwd):/backup alpine tar xzf /backup/portfolio-backup.tar.gz -C /data
```

#### **🚀 Production Deployment Commands**
```bash
# Pull latest from registry
docker pull ghcr.io/3elgrey/portfolio:latest

# Deploy with zero downtime
docker run -d -p 3001:80 --name portfolio-new ghcr.io/3elgrey/portfolio:latest
# Test new container
curl http://localhost:3001/health
# Switch traffic (update load balancer)
# Stop old container
docker stop portfolio-old && docker rm portfolio-old

# Blue-green deployment
docker run -d -p 3000:80 --name portfolio-blue ghcr.io/3elgrey/portfolio:latest
docker run -d -p 3001:80 --name portfolio-green ghcr.io/3elgrey/portfolio:latest
# Switch between blue and green

# Rolling update with compose
docker-compose -f docker/docker-compose.prod.yml pull
docker-compose -f docker/docker-compose.prod.yml up -d --no-deps portfolio
```

#### **📋 One-Liner Commands**
```bash
# Quick test run
docker run --rm -p 3000:80 portfolio:latest

# Build and run in one command
docker build -f Dockerfile.prod -t portfolio:latest . && docker run -d -p 3000:80 --name portfolio-app portfolio:latest

# Stop and remove all portfolio containers
docker ps -q --filter "name=portfolio" | xargs -r docker stop | xargs -r docker rm

# Update and restart
docker pull ghcr.io/3elgrey/portfolio:latest && docker stop portfolio-app && docker rm portfolio-app && docker run -d -p 3000:80 --name portfolio-app ghcr.io/3elgrey/portfolio:latest

# Complete cleanup
docker stop $(docker ps -q) && docker rm $(docker ps -aq) && docker rmi $(docker images -q) && docker system prune -f

# Health check with retry
for i in {1..5}; do curl -f http://localhost:3000/health && break || sleep 5; done
```

### **🔗 Useful URLs**
- **Local Development:** http://localhost:3001
- **Local Production:** http://localhost:3000
- **Health Check:** http://localhost:3000/health
- **Container Registry:** https://github.com/3elgrey/portfolio/pkgs/container/portfolio
- **GitHub Actions:** https://github.com/3elgrey/portfolio/actions

### **📱 Mobile/Quick Reference**
```bash
# Essential commands
docker build -f Dockerfile.prod -t portfolio .    # Build
docker run -d -p 3000:80 portfolio               # Run
docker ps                                        # List
docker logs portfolio-app                        # Logs
docker stop portfolio-app                        # Stop
docker rm portfolio-app                          # Remove
make dev                                         # Quick dev
make prod                                        # Quick prod
make clean                                       # Clean all
```

---

**💡 Pro Tip:** Bookmark this section for quick reference during development and deployment!
