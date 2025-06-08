# My DevOps Web App with Automated Deployment

A simple web application that automatically tests and deploys when you push code to GitHub.

## What This Does
- Creates a simple Node.js web application
- Automatically tests the app when you push code
- Builds a Docker container 
- Sets up CI/CD pipeline with GitHub Actions

## Prerequisites
- [Node.js](https://nodejs.org/) (version 18+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/)
- GitHub account

## Step-by-Step Setup

### 1. Test Locally First
```bash
# Install dependencies
npm install

# Start the app
npm start

# Open browser to http://localhost:3000
# You should see your web app!

# Test the health endpoint
# Open http://localhost:3000/health

my-webapp/
├── app.js
├── package.json
├── Dockerfile
├── .github/workflows/deploy.yml
└── README.md


To Create azure Properties, Run this script - azure_setup.sh

chmod +x azure_setup.sh
./azure_setup.sh


# DevOps Portfolio - Troubleshooting Guide

This guide covers common issues you may encounter while working through the DevOps portfolio projects, along with practical solutions.

---

### 🔧 Issue 1: Port 3000 Already in Use

**Error:**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Cause:** Another app is already running on port 3000.

**Solutions:**

* Use another port:

  ```bash
  PORT=3001 npm start
  ```
* Kill the process (Mac/Linux):

  ```bash
  lsof -ti :3000
  kill -9 <PID>
  ```
* Kill the process (Windows):

  ```bash
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

---

### 🔧 Issue 2: `npm install` Fails

**Errors:**

* `npm ERR! network timeout`
* `npm ERR! peer dep missing`

**Solutions:**

* Clear npm cache:

  ```bash
  npm cache clean --force
  npm install
  ```
* Remove and reinstall dependencies:

  ```bash
  rm -rf node_modules
  rm package-lock.json
  npm install
  ```
* Check Node.js version:

  ```bash
  node --version  # Should be v18.x or higher
  ```

---

### 🔧 Issue 3: Docker Build Fails

**Error:**

```
ERROR: failed to solve: node:18-alpine: error pulling image
```

**Cause:** Docker cannot pull the base image.

**Solutions:**

* Verify Docker is running:

  ```bash
  docker --version
  docker ps
  ```
* Login to Docker Hub:

  ```bash
  docker login
  ```
* Retry the build:

  ```bash
  docker build -t my-webapp .
  ```

---

### 🔧 Issue 4: Azure Setup Script Fails

**Error:**

```
ERROR: The subscription is not registered to use namespace 'Microsoft.ContainerInstance'
```

**Solutions:**

```bash
az provider register --namespace Microsoft.ContainerInstance
az provider register --namespace Microsoft.ContainerRegistry
```

**Other Error:**

```
ERROR: (AuthorizationFailed)
```

**Cause:** Permissions issue (especially with Azure for Students)

**Solution:**

* Make sure you're using your own Azure subscription
* Try a different region by changing the LOCATION in the script:

  ```bash
  LOCATION="westus"
  ```

---

### 🔧 Issue 5: GitHub Actions Failing

**Error:**

```
Login failed: ClientAuthenticationError
```

**Solution:**

* Re-run the setup script:

  ```bash
  ./azure_setup.sh
  ```
* Copy the new `AZURE_CREDENTIALS` JSON
* Go to GitHub → Settings → Secrets → Actions → AZURE\_CREDENTIALS → Update

**Error:**

```
(RegistryLoginError) Failed to login to registry
```

**Solution:**

* Check `ACR_NAME`, `ACR_USERNAME`, `ACR_PASSWORD`
* Verify ACR:

  ```bash
  az acr list --output table
  ```

---

### 🔧 Issue 6: Can't Access Deployed App

**Symptoms:** Deployment shows as successful but the app isn't loading.

**Solutions:**

* Wait 3–5 minutes for Azure IP assignment
* Check container status:

  ```bash
  az container list --resource-group rg-webapp-deploy --output table
  az container show --resource-group rg-webapp-deploy --name <APP_NAME> --query instanceView.state
  ```
* View container logs:

  ```bash
  az container logs --resource-group rg-webapp-deploy --name <APP_NAME>
  ```
* Get correct public URL:

  ```bash
  az container show --resource-group rg-webapp-deploy --name <APP_NAME> --query ipAddress.fqdn --output tsv
  az container show --resource-group rg-webapp-deploy --name <APP_NAME> --query ipAddress.ip --output tsv
  ```
* Test endpoint:

  ```bash
  curl http://<your-app-url>:3001
  curl http://<your-app-url>:3001/health
  ```

---

### 🔧 Issue 7: Git Push Fails

**Error:**

```
remote: Repository not found.
fatal: repository 'https://github.com/username/repo.git' not found
```

**Solutions:**

* Check remote URL:

  ```bash
  git remote -v
  ```
* Update it:

  ```bash
  git remote set-url origin https://github.com/yourusername/my-devops-webapp.git
  ```
* Use a Personal Access Token if prompted for a password

---

Keep this guide nearby while working through the portfolio projects. Most common DevOps roadblocks are easily fixable with the right commands. 🚑
