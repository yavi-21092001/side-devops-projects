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


# Kubernetes Troubleshooting Guide

This guide covers common issues you might face when deploying your app to Kubernetes (Minikube or Docker Desktop) and how to fix them quickly.

---

### 🐧 Issue 1: WSL Port Access Problems (Linux Subsystem on Windows)

**Problem:** Can't access services on localhost from WSL.

**Our Discovery — Two Solutions:**

* **Solution 1: Use Port Forwarding**

  ```bash
  kubectl port-forward service/my-webapp-service 8080:80
  # Access via: http://localhost:8080
  ```
* **Solution 2: Patch the Service Port**

  ```bash
  kubectl patch service my-webapp-service -p '{"spec":{"ports":[{"port":8080,"targetPort":3001}]}}'
  curl http://localhost:8080
  ```

  > This changes the service to use port 8080 instead of 80, which avoids WSL port conflicts.

---

### ⏳ Issue 2: Pods Stuck in Pending

**Symptoms:**

```
kubectl get pods
NAME                         READY   STATUS    RESTARTS   AGE
my-webapp-xxx                0/1     Pending   0          5m
```

**Solutions:**

* Check node readiness:

  ```bash
  kubectl describe nodes
  ```

  > Look for: `Conditions` should say `Ready=True`
* For Minikube users:

  ```bash
  minikube stop
  minikube config set memory 4096
  minikube config set cpus 2
  minikube start
  ```
* View recent events:

  ```bash
  kubectl get events --sort-by=.metadata.creationTimestamp
  ```

---

### 📦 Issue 3: Image Pull Failed

**Error:**

```
Failed to pull image "my-webapp:latest": pull access denied
```

**Solutions:**

* Verify image exists:

  ```bash
  docker images | grep my-webapp
  ```
* Rebuild image inside Minikube:

  ```bash
  eval $(minikube docker-env)
  docker build -t my-webapp:latest .
  ```
* In your YAML file, ensure:

  ```yaml
  imagePullPolicy: Never
  ```

---

### 🔄 Issue 4: Pod CrashLoopBackOff

**Symptoms:**

```
kubectl get pods
NAME                         STATUS             RESTARTS
my-webapp-xxx                CrashLoopBackOff   3
```

**Solutions:**

* Check pod logs:

  ```bash
  kubectl logs my-webapp-xxx
  ```

  Look for:

  * Wrong port (ensure it's `3001` not `3000`)
  * Missing `npm install`
  * Missing environment variables

* Describe the pod:

  ```bash
  kubectl describe pod my-webapp-xxx
  ```

* Test Docker image locally:

  ```bash
  docker run -p 3001:3001 my-webapp:latest
  ```

---

### 🌐 Issue 5: Service Has No External IP

**Problem:** `EXTERNAL-IP` shows `<pending>`.

**Solutions:**

* Docker Desktop:

  * Wait 2–3 mins
  * Restart Docker Desktop
  * Use port-forwarding:

    ```bash
    kubectl port-forward service/my-webapp-service 8080:80
    ```
* Minikube:

  ```bash
  minikube service my-webapp-service --url
  ```

---

### 🔌 Issue 6: Can't Connect to Kubernetes

**Error:**

```
The connection to the server localhost:8080 was refused
```

**Solutions:**

* For Docker Desktop:

  * Ensure Kubernetes is enabled in Docker Desktop settings
  * Restart Docker
* For Minikube:

  ```bash
  minikube status
  minikube stop
  minikube start
  ```
* Check kubectl context:

  ```bash
  kubectl config current-context
  # should be docker-desktop or minikube
  ```

---

### 🚫 Issue 7: Permission Denied

**On Windows:**

```
kubectl: permission denied
```

* Solution: Run terminal as Administrator or use PowerShell.

**On Mac/Linux:**

```bash
sudo chmod +x /usr/local/bin/kubectl
```

---

### 🧹 Step 10: Clean Up

**Delete your app:**

```bash
kubectl delete -f k8s/app.yaml
```

Expected output:

```
deployment.apps "my-webapp" deleted
service "my-webapp-service" deleted
```

**Verify deletion:**

```bash
kubectl get pods
kubectl get services
```

**Stop Minikube (if used):**

```bash
minikube stop
```
