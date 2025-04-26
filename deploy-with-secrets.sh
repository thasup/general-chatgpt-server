#!/bin/bash

# Exit on error
set -e

# Variables
STAGE=${1:-dev}
PROFILE=${2:-thasup}
REGION="ap-southeast-1"
SECRET_NAME="general-chatgpt-server-$STAGE-openai-api-key"

echo "Deploying to stage: $STAGE in region: $REGION with profile: $PROFILE"

# Build the project
echo "Building the project..."
npm run build

# Check if the secret exists
echo "Checking if secret exists..."
SECRET_EXISTS=$(aws secretsmanager list-secrets --region $REGION --profile $PROFILE --query "SecretList[?Name=='$SECRET_NAME'].Name" --output text)

if [ -z "$SECRET_EXISTS" ]; then
  echo "Secret does not exist. Creating it..."
  echo "Enter your OpenAI API key:"
  read -s API_KEY

  aws secretsmanager create-secret \
    --name "$SECRET_NAME" \
    --description "OpenAI API Key for general-chatgpt-server" \
    --secret-string "$API_KEY" \
    --region $REGION \
    --profile $PROFILE

  echo "Secret created successfully."
else
  echo "Secret exists. Proceeding with deployment..."
fi

# Deploy using serverless
echo "Deploying with serverless..."
serverless deploy --stage $STAGE --region $REGION --profile $PROFILE

echo "Deployment completed successfully!"