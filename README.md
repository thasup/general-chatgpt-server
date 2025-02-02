# General ChatGPT API Server

A simple Express.js server that provides an API interface for utilizing OpenAI's ChatGPT capabilities, designed to process and return responses in Markdown format.

## Features

- Lightweight and easy-to-use Express server
- Communicates with OpenAI's ChatGPT API
- Returns responses in JSON format
- Easily customizable for different use cases

## Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/thasup/general-chatgpt-server.git
   ```
2. Navigate to the project directory:
   ```sh
   cd general-chatgpt-server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Configuration

Create a `.env` file in the root directory and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=
PORT=9999 # Optional, defaults to 9999
```

## Usage

1. Start the server:
   ```sh
   npm run debug
   ```
2. Make a request to the API:
   ```sh
   curl -X GET http://localhost:9999/v1/
   ```
3. Example JSON response:
   ```json
   {
     "response": "Hello! This is general API :D"
   }
   ```

## API Endpoints

### `GET /v1/`
- **Description:** Returns a simple message indicating the API is working.
- **Response:**
  ```json
  {
    "response": "Hello! This is general API :D"
  }
  ```

## Author

[thasup](https://github.com/thasup)

