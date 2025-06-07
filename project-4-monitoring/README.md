# Basic Monitoring for My Applications

Set up monitoring to watch your applications and get pretty dashboards showing how they're performing.

## What This Creates
- Prometheus: Collects metrics from your applications
- Grafana: Creates beautiful dashboards and charts
- A simple setup that runs on your computer

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- A web browser
- Your web app from Project 2 (optional, for testing)

## Step-by-Step Setup

### 1. Start the Monitoring Stack
```bash
# Start Prometheus and Grafana
docker-compose up -d

# Check they're running
docker-compose ps

# You should see:
# - prometheus (port 9090)
# - grafana (port 3000)