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