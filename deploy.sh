#!/bin/bash

# Set default values
STAGE="dev"
REGION="ap-southeast-7"

# Process command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --stage)
      STAGE="$2"
      shift 2
      ;;
    --region)
      REGION="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

echo "Deploying to AWS Lambda..."
echo "Stage: $STAGE"
echo "Region: $REGION"

# Build the project
echo "Building project..."
npm run build

# Deploy using Serverless Framework
echo "Deploying with Serverless Framework..."
npx serverless deploy --stage $STAGE --region $REGION

echo "Deployment complete!"