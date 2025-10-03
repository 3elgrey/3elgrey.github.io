# Docker Portfolio Makefile
# Convenient commands for Docker operations

.PHONY: help build run stop clean dev prod test logs shell

# Default target
help:
	@echo "Portfolio Docker Commands:"
	@echo ""
	@echo "Development:"
	@echo "  make dev          - Start development environment"
	@echo "  make dev-build    - Build and start development environment"
	@echo "  make dev-logs     - View development logs"
	@echo ""
	@echo "Production:"
	@echo "  make prod         - Start production environment"
	@echo "  make prod-build   - Build and start production environment"
	@echo "  make prod-logs    - View production logs"
	@echo ""
	@echo "Testing:"
	@echo "  make test         - Run tests in container"
	@echo "  make test-build   - Build test image"
	@echo ""
	@echo "Utilities:"
	@echo "  make logs         - View all container logs"
	@echo "  make shell        - Open shell in running container"
	@echo "  make stop         - Stop all containers"
	@echo "  make clean        - Remove all containers and images"
	@echo "  make health       - Check container health"

# Development commands
dev:
	docker-compose --profile dev up -d

dev-build:
	docker-compose --profile dev up -d --build

dev-logs:
	docker-compose --profile dev logs -f

# Production commands
prod:
	docker-compose -f docker/docker-compose.prod.yml up -d

prod-build:
	docker-compose -f docker/docker-compose.prod.yml up -d --build

prod-logs:
	docker-compose -f docker/docker-compose.prod.yml logs -f

# Testing commands
test:
	docker build --target builder -t portfolio-test .
	docker run --rm portfolio-test npm test

test-build:
	docker build --target builder -t portfolio-test .

# Build commands
build:
	docker build -t portfolio:latest .

build-dev:
	docker build -f Dockerfile.dev -t portfolio:dev .

# Run commands
run:
	docker run -d -p 3000:80 --name portfolio-app portfolio:latest

run-dev:
	docker run -d -p 3001:80 --name portfolio-dev portfolio:dev

# Utility commands
logs:
	docker-compose logs -f

shell:
	docker exec -it portfolio-app sh

stop:
	docker-compose down
	docker-compose --profile dev down
	docker-compose -f docker/docker-compose.prod.yml down

clean:
	docker-compose down --rmi all --volumes --remove-orphans
	docker-compose --profile dev down --rmi all --volumes --remove-orphans
	docker-compose -f docker/docker-compose.prod.yml down --rmi all --volumes --remove-orphans
	docker system prune -f

health:
	@echo "Checking container health..."
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
	@echo ""
	@echo "Health check endpoints:"
	@curl -s http://localhost:3000/health || echo "❌ Production container not responding"
	@curl -s http://localhost:3001/health || echo "❌ Development container not responding"

# Security scan
security-scan:
	docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
		aquasec/trivy image portfolio:latest

# Push to registry
push:
	docker tag portfolio:latest ghcr.io/3elgrey/portfolio:latest
	docker push ghcr.io/3elgrey/portfolio:latest

# Pull from registry
pull:
	docker pull ghcr.io/3elgrey/portfolio:latest

# Update and restart
update:
	make pull
	make stop
	make prod
