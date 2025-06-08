# Multi-Environment Setup (Dev vs Production)

Learn how to create separate environments for development and production using reusable infrastructure code.

## What This Creates
- A reusable "module" for web applications
- Separate development environment (small, cheap)
- Separate production environment (bigger, more reliable)
- Best practices for managing multiple environments

## Prerequisites
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- An Azure account
- Completion of Project 1 (basic Terraform knowledge)

## Understanding the Structure
multi-env-setup/
├── modules/webapp/          # Reusable code
│   ├── main.tf             # What to create
│   └── variables.tf        # What can be customized
├── environments/
│   ├── dev/                # Development environment
│   │   └── main.tf         # Uses the module with dev settings
│   └── prod/               # Production environment
│       └── main.tf         # Uses the module with prod settings
└── README.md               # This guide!

**Why this structure?**
- **DRY Principle**: Don't Repeat Yourself - write code once, use it many times
- **Consistency**: Both environments use the same basic setup
- **Flexibility**: Each environment can have different sizes/settings
- **Safety**: Changes to dev don't affect production

## Step-by-Step Deployment

### 1. Setup and Login
```bash
# Login to Azure
az login

# Check you're logged in
az account show


# Project 5: Multi-Environment Infrastructure - Troubleshooting Guide

This troubleshooting guide is focused on common issues you may encounter when working with **Project 5: Multi-Environment Infrastructure** using Terraform and Azure.

---

### 🔧 Issue 1: Module Not Found

**Error:**

```
Error: Module not found: ./modules/webapp
```

**Cause:** You are in the wrong directory or the module path is incorrect.

**Solutions:**

* Check current directory:

  ```bash
  pwd
  # Should be: /path/to/project-5-multi-environment/environments/dev
  ```
* Navigate to correct directory:

  ```bash
  cd project-5-multi-environment/environments/dev
  ```
* Verify module exists:

  ```bash
  ls ../../modules/webapp/
  # Should show: main.tf, variables.tf, outputs.tf
  ```

---

### 🔧 Issue 2: Resource Already Exists

**Error:**

```
Error: A resource group with the name 'dev-myapp-rg' already exists
```

**Cause:** You’ve likely deployed it before, or the name is already in use.

**Solutions:**

* List existing resource groups:

  ```bash
  az group list --output table
  ```
* Delete the resource group:

  ```bash
  az group delete --name dev-myapp-rg --yes --no-wait
  ```
* Or use a new name:

  ```hcl
  # Edit environments/dev/main.tf
  app_name = "myapp-v2"
  ```

---

### 🔧 Issue 3: No Output Values

**Problem:** `terraform output` returns nothing or says no outputs found.

**Solutions:**

* Add outputs to the module:

  ```hcl
  output "webapp_url" {
    description = "Public URL of the web application"
    value       = "http://${azurerm_container_group.webapp.ip_address}"
  }

  output "webapp_ip" {
    description = "Public IP address"
    value       = azurerm_container_group.webapp.ip_address
  }
  ```
* Or use Azure CLI:

  ```bash
  az container show \
    --resource-group dev-myapp-rg \
    --name dev-myapp \
    --query ipAddress.ip \
    --output tsv
  ```

---

### 🔧 Issue 4: Different Behavior Between Environments

**Problem:** Dev works but prod doesn’t.

**Debug Steps:**

* Compare configurations:

  ```bash
  cd environments/dev
  terraform show | grep -A 10 container_group
  cd ../prod
  terraform show | grep -A 10 container_group
  ```
* Check container logs:

  ```bash
  az container logs --resource-group dev-myapp-rg --name dev-myapp
  az container logs --resource-group prod-myapp-rg --name prod-myapp
  ```
* Check resource sizing:

  ```bash
  az container show --resource-group dev-myapp-rg --name dev-myapp --query "properties.containers[0].properties.resources"
  az container show --resource-group prod-myapp-rg --name prod-myapp --query "properties.containers[0].properties.resources"
  ```

---

### 🔧 Issue 5: Terraform Init Fails

**Error:**

```
Error: Module installation error
```

**Solutions:**

* Check internet connection
* Delete `.terraform` directory:

  ```bash
  rm -rf .terraform
  terraform init
  ```
* Validate module paths:

  ```bash
  ls ../../modules/webapp/main.tf
  ```

---

### 🔧 Issue 6: Container Won’t Start

**Symptoms:** Container state shows "Failed" or restarts repeatedly.

**Solutions:**

* Check container events:

  ```bash
  az container show \
    --resource-group dev-myapp-rg \
    --name dev-myapp \
    --query "properties.instanceView.events"
  ```
* Test image availability:

  ```bash
  docker pull nginx:latest
  docker pull httpd:latest
  ```
* Inspect container configuration:

  ```bash
  az container show \
    --resource-group dev-myapp-rg \
    --name dev-myapp \
    --query "properties.containers[0]"
  ```

---

Keep this file close while working on multi-environment infrastructure so you can troubleshoot confidently and finish strong. 🚀
