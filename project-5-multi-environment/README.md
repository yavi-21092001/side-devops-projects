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