# My First Infrastructure as Code Project

This project creates a simple web application on Azure using Terraform.

## What This Creates
- A resource group (folder for your resources)
- A container instance running a simple web server
- A public IP address so you can access it

## Prerequisites
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- An Azure account (free tier works!)

## Step-by-Step Deployment

### 1. Setup
```bash
# Clone or download this project
# Open terminal in the project folder

# Login to Azure
az login
# Follow the browser prompts to login


my-first-infrastructure/
├── main.tf
├── variables.tf
├── terraform.tfvars
└── README.md


# DevOps Troubleshooting - Extra Issues & Fixes

This file contains additional common problems users may encounter during the DevOps projects and how to solve them.

---

### 🚨 Issue 1: "Command not found" Errors

**Error:**

```
az: command not found
terraform: command not found
```

**Cause:** The tools are not installed or not in your system `PATH`.

**Solutions:**

* Reinstall Azure CLI and Terraform (refer to Step 1 of Project 1)
* Restart your terminal completely
* On Windows: Ensure tools are added to the **System PATH**, not just User PATH
* Test installation:

  ```bash
  az --version
  terraform --version
  ```

---

### 🚨 Issue 2: Docker Registry Error (409 Conflict)

**Error:**

```
RegistryErrorResponse: An error response is received from the docker registry 'index.docker.io'.
```

**Cause:** Temporary Docker Hub connectivity issues or rate limits.

**Solutions:**

* Retry the deployment:

  ```bash
  terraform apply
  ```
* If it fails again, wait 10–15 minutes and try again.
* This issue is **not your fault** — it's a known limitation of Docker Hub.

---

### 🚨 Issue 3: Resource Group Already Exists

**Error:**

```
Error: A resource group with the name 'rg-john-devops' already exists in location 'East US'
```

**Cause:** The same resource group name was used in a previous deployment or by another user.

**Solution:**

* Open `terraform.tfvars` and change the resource group name to something unique:

  ```hcl
  resource_group_name = "rg-john-devops-v2"
  ```
* Then re-run:

  ```bash
  terraform apply
  ```

---

### 🚨 Issue 4: Authentication Failed

**Error:** Azure login or session errors

**Cause:** You're not logged into Azure, or the session expired.

**Solution:**

```bash
az login
az account show  # to verify
terraform apply
```

---

### 🚨 Issue 5: Can't Access the Website

**Symptom:** Browser shows:

```
This site can't be reached
Connection timed out
```

**Troubleshooting Steps:**

1. **Wait longer:** Azure may still be assigning IP

   ```bash
   az container show --resource-group rg-john-devops --name my-first-webapp --query "instanceView.state"
   # Expected output: "Running"
   ```
2. **Get the current IP:**

   ```bash
   terraform output container_ip
   ```
3. **Check logs inside the container:**

   ```bash
   az container logs --resource-group rg-john-devops --name my-first-webapp
   ```
4. **Check container health and port mapping:**

   ```bash
   az container show --resource-group rg-john-devops --name my-first-webapp --query "{State:instanceView.state,IP:ipAddress.ip,Ports:ipAddress.ports}"
   ```

---

### 🚨 Issue 6: Insufficient Permissions

**Error:** Messages indicating you can't create or access resources.

**Cause:** You're using a restricted Azure subscription (e.g., company-controlled or limited student plan).

**Solution:**

* Use a personal Azure subscription if possible
* Try deploying to a different region:

  ```hcl
  location = "West US"
  ```
* Then:

  ```bash
  terraform apply
  ```

---

🧰 Bookmark this file for fast reference when running into roadblocks. These fixes cover 90% of beginner DevOps errors.
