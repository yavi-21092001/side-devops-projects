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

# 🚨 Troubleshooting Guide for Monitoring Stack (Prometheus + Grafana)

This guide helps you resolve common issues when using the Prometheus + Grafana monitoring stack.

---

### 🔧 Issue 1: Can't Access Grafana or Prometheus

**Symptoms:** Browser shows "This site can't be reached"

**Solutions:**

* **A) Check containers are running:**

  ```bash
  docker-compose ps
  ```

  * Expected output: Both containers show `running`

* **B) Check Docker Desktop is running:**

  * Make sure Docker Desktop is started
  * Look for the Docker whale icon in your system tray

* **C) Restart the containers:**

  ```bash
  docker-compose down
  docker-compose up -d
  ```

* **D) Check for port conflicts:**

  ```bash
  # On Windows:
  netstat -ano | findstr :3000
  netstat -ano | findstr :9090

  # On Mac/Linux:
  lsof -i :3000
  lsof -i :9090
  ```

  * If ports are in use, edit `docker-compose.yml`:

    ```yaml
    ports:
      - "3001:3000"  # Use port 3001 instead
    ```

---

### 🔧 Issue 2: Data Source Connection Failed

**Error:** "HTTP Error Bad Gateway"

**Solutions:**

* Use `http://prometheus:9090` (not `localhost:9090`) as data source URL
* Test internal container communication:

  ```bash
  docker-compose exec grafana ping prometheus
  ```

  * Should see ping responses

---

### 🔧 Issue 3: No Data in Dashboards

**Symptoms:** Graphs show "No data"

**Solutions:**

* **A) Check time range in Grafana:**

  * Change from "Last 6 hours" to "Last 15 minutes"

* **B) Wait for Prometheus to collect data:**

  * Prometheus scrapes data every 15s
  * Wait 2–3 minutes after launch

* **C) Check Prometheus targets:**

  * Visit `http://localhost:9090`
  * Go to Status → Targets
  * All should be `UP`

* **D) Test basic query:**

  * Try query `up` in Prometheus UI
  * You should see some results

---

### 🔧 Issue 4: Import Dashboard Fails

**Error:** "Dashboard import failed"

**Solutions:**

* **A) Add Prometheus as data source before importing**

* **B) Try alternative dashboard IDs:**

  * Example: `3662` (Prometheus Overview)

* **C) Check internet connection** (downloads from grafana.com)

* **D) Manual import:**

  * Download JSON from: [https://grafana.com/grafana/dashboards/1860](https://grafana.com/grafana/dashboards/1860)
  * In Grafana: Go to "Import" → Upload the JSON file

---

### 🔧 Issue 5: Can't Monitor My Application

**Problem:** App is not visible in Prometheus targets

**Solutions:**

* **A) Verify app is accessible:**

  ```bash
  curl http://localhost:3001
  curl http://localhost:3001/health
  ```

* **B) Check `prometheus.yml` config:**

  ```yaml
  - job_name: 'my-webapp'
    static_configs:
      - targets: ['host.docker.internal:3001']
  ```

* **C) Restart Prometheus:**

  ```bash
  docker-compose restart prometheus
  ```

* **D) Host networking tips:**

  * Use `host.docker.internal:3001` on Mac/Windows
  * On Linux, try `172.17.0.1:3001`

---

### 🔧 Issue 6: Permissions Issues

**Error:** "Permission denied" when editing files

**Solutions:**

* **Mac/Linux:**

  ```bash
  sudo chmod 644 prometheus.yml
  ```
* **Windows:**

  * Run PowerShell as Administrator
  * Or use Docker Desktop’s built-in terminal

---

### 🔧 Issue 7: Memory Issues

**Symptoms:** Containers restart or crash repeatedly

**Solutions:**

* **A) Increase Docker Desktop memory allocation:**

  * Docker Desktop → Settings → Resources → Increase to 4GB

* **B) Limit container memory usage:**

  ```yaml
  services:
    prometheus:
      deploy:
        resources:
          limits:
            memory: 512m
    grafana:
      deploy:
        resources:
          limits:
            memory: 256m
  ```

---

Keep this guide handy for resolving most issues when working with the monitoring stack. Happy troubleshooting! 🚀
