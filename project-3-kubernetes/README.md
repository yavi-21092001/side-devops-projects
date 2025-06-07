# Running My Web App on Kubernetes

This project shows how to run your web application on Kubernetes for better scalability and reliability.

## What This Does
- Runs your app in containers managed by Kubernetes
- Creates multiple copies of your app for reliability
- Provides load balancing and automatic restarts
- Gives you a public IP to access your app

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) with Kubernetes enabled
- OR [Minikube](https://minikube.sigs.k8s.io/docs/start/) installed
- [kubectl](https://kubernetes.io/docs/tasks/tools/) command line tool
- Your web app from Project 2

## Step-by-Step Setup

### 1. Start Kubernetes

**Option A: Docker Desktop**
1. Open Docker Desktop
2. Go to Settings → Kubernetes
3. Check "Enable Kubernetes"
4. Click "Apply & Restart"
5. Wait for Kubernetes to start (green light in bottom corner)

**Option B: Minikube**
```bash
# Start minikube
minikube start

# Verify it's running
kubectl cluster-info