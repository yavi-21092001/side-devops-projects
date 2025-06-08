Sure! Here's your **README.md** split cleanly into a separate, beginner-friendly **`SETUP_GUIDE.md`** file for your Project 5: Multi-Environment Infrastructure (AWS). It includes detailed steps and structure exactly as in your message, but clearly formatted to make it easy to follow and visually appealing for GitHub:

---

### 📘 `SETUP_GUIDE.md`

````markdown
# 🚀 Setup Guide for Project 5: Multi-Environment Infrastructure (AWS)

This guide will walk you through deploying **multi-environment infrastructure** using Terraform and AWS ECS. You'll create reusable modules, deploy to both development and production environments, and understand how to manage resources with confidence.

---

## 🛠️ Prerequisites

- [Terraform v1.0+](https://www.terraform.io/downloads.html)
- [AWS CLI v2](https://aws.amazon.com/cli/) (configured with credentials)
- AWS account with necessary permissions
- Completed Project 1 (basic Terraform knowledge)

---

## 🧱 Project Structure

```bash
project-5-multi-environment/
├── modules/ecs-webapp/         # Reusable ECS infrastructure code
│   └── Handles ECS, IAM, Logs, Auto-scaling
├── environments/
│   ├── dev/                    # Lightweight, debug-enabled
│   └── prod/                   # Scalable, production-optimized
└── scripts/                    # Automates deployments
````

---

## 🔁 Quick Start

### 1. Clone and Prepare

```bash
cd project-5-multi-environment
chmod +x scripts/*.sh
aws sts get-caller-identity
```

### 2. Deploy Development

```bash
./scripts/deploy-dev.sh

# Or manual deployment:
cd environments/dev
terraform init
terraform plan
terraform apply
cd ../..
```

### 3. Test Development Environment

```bash
./scripts/get-app-urls.sh
```

Or manually:

```bash
cd environments/dev
terraform output next_steps
cd ../..
```

### 4. Deploy Production (careful!)

```bash
./scripts/deploy-prod.sh
```

---

## 🧪 Compare Environments

| Feature          | Development     | Production       |
| ---------------- | --------------- | ---------------- |
| CPU              | 256 (0.25 vCPU) | 512 (0.5 vCPU)   |
| Memory           | 512 MB          | 1024 MB          |
| Instances        | 1               | 2 (auto-scaled)  |
| Auto-scaling     | ❌ Disabled      | ✅ 2-10 instances |
| Log Retention    | 7 days          | 30 days          |
| Debug Mode       | ✅ Enabled       | ❌ Disabled       |
| Deployment Speed | Fast but risky  | Slow but safe    |

---

## 🧩 Module Overview

The `modules/ecs-webapp/` directory is a reusable Terraform module that:

* Accepts parameters like `CPU`, `memory`, and `env`
* Creates ECS services, IAM roles, log groups
* Can be reused across dev, prod, or staging

---

## 🔧 Manual Deployment Instructions

### Deploy Development

```bash
cd environments/dev
terraform init
nano terraform.tfvars   # Optional config change
terraform plan
terraform apply
terraform output
```

### Test Development

```bash
CLUSTER_NAME=$(terraform output -raw cluster_name)
SERVICE_NAME=$(terraform output -raw service_name)
aws ecs list-tasks --cluster $CLUSTER_NAME --service-name $SERVICE_NAME
curl http://[PUBLIC_IP]
```

### Deploy Production

```bash
cd environments/prod
terraform init
terraform plan
terraform apply
terraform output
```

---

## 🔄 Advanced Configuration

### Dev Environment Example

```hcl
module "webapp" {
  source = "../../modules/ecs-webapp"
  cpu    = "256"
  memory = "512"
  desired_count = 1

  environment_variables = [
    { name = "DEBUG", value = "true" },
    { name = "API_URL", value = "https://dev-api.example.com" }
  ]
}
```

### Prod Environment Example

```hcl
module "webapp" {
  source = "../../modules/ecs-webapp"
  cpu    = "1024"
  memory = "2048"
  desired_count = 3
  enable_autoscaling = true
  autoscaling_max_capacity = 20

  environment_variables = [
    { name = "NODE_ENV", value = "production" },
    { name = "API_URL", value = "https://api.example.com" }
  ]
}
```

---

## ➕ Add a Staging Environment

```bash
mkdir -p environments/staging
cp environments/prod/*.tf environments/staging/
# Edit `main.tf` to set custom size, env name = "staging"
```

---

## 🌐 Terraform Workspaces (Optional)

```bash
terraform workspace new dev
terraform workspace new prod

terraform workspace select dev
terraform apply

terraform workspace select prod
terraform apply
```

---

## 📊 Monitoring & Scaling

### Get All URLs

```bash
./scripts/get-app-urls.sh
```

### View in Console

```bash
cd environments/dev
terraform output console_urls

cd environments/prod
terraform output console_urls
```

### Health Checks

```bash
curl http://[DEV_IP]/health
curl http://[PROD_IP1]/health
curl http://[PROD_IP2]/health
```

### Manual Scaling (Dev Only)

```bash
aws ecs update-service \
  --cluster dev-myapp-cluster \
  --service dev-myapp-service \
  --desired-count 2
```

> 🔁 Production auto-scales based on CPU/memory. Monitor in AWS Console.
