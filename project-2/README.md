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