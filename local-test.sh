#!/bin/bash

echo "Building project..."
npm run build

echo "Starting local Lambda server..."
node -e "require('./dist/lambda-local.js').runLocal()" 