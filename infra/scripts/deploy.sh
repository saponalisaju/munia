#!/bin/bash
ENV=$1
echo "Deploying to $ENV..."

# Set environment
export $(cat .env.$ENV | xargs)

# Example deployment to server
rsync -av --exclude='node_modules' . user@server:/var/www/myapp

# Optional: restart server
ssh user@server 'pm2 restart myapp'
