# General ChatGPT Server

A versatile Express.js server built with TypeScript, providing various API endpoints for different services including color palette generation, manga comparison, and general utilities.

## 🚀 Features

- 🎨 Color Palette Generator API
- 📚 Manga Comparison Service
- 🔗 Stack Connect Integration
- 🤖 General ChatGPT Integration
- 🔒 CORS Protection
- 📝 TypeScript Support
- 🧪 Jest Testing Framework
- ☁️ AWS Lambda Support

## 📋 Prerequisites

- Node.js (v22 or higher)
- npm (v6 or higher)
- AWS CLI (for deployment)
- Serverless Framework (for deployment)

## 🛠 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/general-chatgpt-server.git
cd general-chatgpt-server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3000
# Add other required environment variables
```

## 💻 Development

Start the development server:
```bash
npm run dev
```

Other useful commands:
```bash
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run test        # Run tests
npm run test:watch  # Run tests in watch mode
npm run typecheck   # Run TypeScript type checking
```

## 🏗 Building for Production

```bash
npm run build:production  # Build for production
npm start                # Start production server
```

## 📊 Environment Variables

This project uses environment variables for configuration. You can manage them in several ways:

### Local Development

For local development, create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
OPENAI_API_KEY=your_api_key_here
```

### AWS Lambda Deployment

For AWS Lambda deployment, you have several options:

1. **Environment-specific files**

   Create environment-specific files like `.env.dev`, `.env.staging`, and `.env.production`:

   ```bash
   # Create environment-specific file
   cp .env.example .env.dev
   # Edit with your values
   nano .env.dev
   ```

   The serverless-dotenv-plugin will load variables from these files based on the deployment stage.

2. **Directly in serverless.yml**

   For non-sensitive configuration, define variables directly in the serverless.yml file:

   ```yaml
   provider:
     environment:
       NODE_ENV: ${opt:stage, 'dev'}
       PORT: 8080
   ```

3. **AWS Parameter Store for Sensitive Values**

   For API keys, database connection strings, and other sensitive values, use AWS Parameter Store:

   ```yaml
   provider:
     environment:
       OPENAI_API_KEY: ${ssm:/my-app/${opt:stage, 'dev'}/api-key~true}
       DATABASE_URL: ${ssm:/my-app/${opt:stage, 'dev'}/database-url~true}
   ```

   To store a value in Parameter Store:

   ```bash
   # Store a secure parameter
   aws ssm put-parameter --name "/my-app/dev/api-key" --type "SecureString" --value "your-api-key-here"
   ```

### Required Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| NODE_ENV | Environment (development, production) | development | Yes |
| PORT | Port to run the server on | 3000 | No |
| OPENAI_API_KEY | API key for external services | - | Yes |
| DATABASE_URL | Database connection string | - | No |

## ☁️ AWS Lambda Deployment

This project is configured to run as an AWS Lambda function using the Serverless Framework.

### Testing Locally

To test the Lambda function locally before deployment:

```bash
npm run lambda:local
```

This will start a local server that simulates the AWS Lambda environment at http://localhost:3000.

### Packaging for Deployment

To create a deployment package without deploying:

```bash
npm run lambda:package
```

This will create a `.serverless` directory with the packaged Lambda function.

### Deploying to AWS

Ensure you have AWS credentials configured using AWS CLI:

```bash
aws configure
```

Then deploy to AWS:

```bash
npm run lambda:deploy
```

To deploy to a specific stage (e.g., production):

```bash
npm run lambda:deploy -- --stage production
```

To deploy to a specific region:

```bash
npm run lambda:deploy -- --region ap-southeast-1
```

### AWS Lambda Configuration

The Lambda function is configured in the `serverless.yml` file. Key configuration options:

- **Runtime**: Node.js 22.x
- **Memory**: 1024MB
- **Timeout**: 30 seconds
- **API Gateway**: HTTP API with CORS enabled
- **Environment Variables**:
  - Loaded from `.env.{stage}` files via serverless-dotenv-plugin
  - Directly defined in serverless.yml
  - Securely stored in AWS Parameter Store for sensitive data

#### Setting Up AWS Parameters

For sensitive environment variables, use AWS Parameter Store:

```bash
# Store API key securely
aws ssm put-parameter \
  --name "/my-app/dev/api-key" \
  --type "SecureString" \
  --value "your-api-key-here"

# Store database connection string
aws ssm put-parameter \
  --name "/my-app/dev/database-url" \
  --type "SecureString" \
  --value "postgres://user:password@hostname:5432/dbname"
```

Then reference them in serverless.yml:

```yaml
provider:
  environment:
    OPENAI_API_KEY: ${ssm:/my-app/${opt:stage, 'dev'}/api-key~true}
    DATABASE_URL: ${ssm:/my-app/${opt:stage, 'dev'}/database-url~true}
```

## 📚 API Documentation

### Base URL
```
Development: http://localhost:3000
Production:  https://api.thanachon.me
```

### 🎨 Color Palette API

#### Generate Color Palette
```http
GET /v1/colors/:input
POST /v1/colors/chat
```

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| `input` | `string` | Yes | Description or theme for the color palette |

##### Response Schema
```typescript
{
  colors: Array<{
    code: string,  // Hex color code
    name: string   // Color name
  }>
}
```

##### Example Request
```bash
# GET request
curl -X GET 'https://api.thanachon.me/v1/colors/sunset'

# POST request
curl -X POST 'https://api.thanachon.me/v1/colors/chat' \
  -H 'Content-Type: application/json' \
  -d '{"input": "sunset colors"}'
```

---

### 📝 General API

#### Text Processing Endpoints

| Endpoint | Method | Description |
| :------- | :----- | :---------- |
| `/v1/general/fix-grammar` | POST | Fix spelling and grammar |
| `/v1/general/summarize` | POST | Summarize text |
| `/v1/general/rewrite` | POST | Rewrite text |
| `/v1/general/explain` | POST | Explain text |
| `/v1/general/translate` | POST | Translate text |
| `/v1/general/brainstorm` | POST | Generate ideas |
| `/v1/general/outline` | POST | Create outline |
| `/v1/general/write-blog` | POST | Generate blog content |
| `/v1/general/shorter` | POST | Make text shorter |
| `/v1/general/longer` | POST | Make text longer |

##### Request Body
```json
{
  "input": "string",    // Required: Text to process
  "lang": "string"      // Optional: Target language (default: "en")
}
```

Note: `lang` parameter is only used for translate, summarize, explain, brainstorm, outline, write-blog, shorter, and longer endpoints.

---

### 🎮 Stack Connect API

#### Generate Feelinks Scenario
```http
POST /v1/stack-connect/feelinks
```

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| `category` | `string` | Yes | Category for scenario generation |

##### Response
```json
{
  "scenario": "string",
  "audio": "base64"     // Audio version of the scenario
}
```

#### Generate ITO Question
```http
POST /v1/stack-connect/ito
```

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| `category` | `string` | Yes | Category for question generation |
| `lang` | `string` | No | Language (default: "en") |

##### Response
```json
{
  "data": {
    "question": "string",
    "least": "string",
    "most": "string"
  },
  "audio": "base64"     // Audio version of the question
}
```

---

### 📚 Manga Comparator API

#### Compare Manga Characters
```http
POST /v1/manga
```

| Parameter | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| `char1` | `string` | Yes | First character name |
| `char2` | `string` | Yes | Second character name |
| `manga1` | `string` | Yes | First manga title |
| `manga2` | `string` | Yes | Second manga title |

##### Example Request
```bash
curl -X POST 'https://api.thanachon.me/v1/manga' \
  -H 'Content-Type: application/json' \
  -d '{
    "char1": "Luffy",
    "char2": "Naruto",
    "manga1": "One Piece",
    "manga2": "Naruto"
  }'
```

### Error Responses

All endpoints follow this error format:
```json
{
  "error": {
    "message": "Error description"
  }
}
```

Common HTTP Status Codes:
- 200: Success
- 400: Bad Request (missing parameters)
- 500: Internal Server Error

### Rate Limiting
The server implements rate limiting based on the endpoint usage. Contact the administrator for specific limits.

## 🔒 Security

The server implements CORS protection with the following configurations:

- Development: All origins allowed
- Production: Whitelist of specific domains
  - color-palette-generator-v0ah.onrender.com
  - thanachon.me and subdomains
  - Other configured domains

## 🚀 Deployment

### DigitalOcean Deployment
```bash
npm run build:digitalocean
```

## 📝 Project Structure

```
general-chatgpt-server/
├── backend/
│   ├── config/         # Configuration files
│   ├── middlewares/    # Express middlewares
│   ├── routes/         # API routes
│   └── server.ts       # Main server file
├── dist/               # Compiled JavaScript
├── tests/              # Test files
├── .env               # Environment variables
└── package.json       # Project dependencies
```

## 🧪 Testing

Run the test suite:
```bash
npm test               # Run all tests
npm run test:watch     # Run tests in watch mode
```