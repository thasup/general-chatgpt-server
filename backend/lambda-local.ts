import http from "http";
import { handler } from "./lambda";

export const runLocal = async function (): Promise<void> {
  const PORT = process.env.PORT ?? 3000;

  // Create a simple HTTP server that forwards requests to the Lambda handler
  const server = http.createServer(async (req, res) => {
    console.log(`${req.method ?? ""} ${req.url ?? ""}`);

    // Collect request body
    let body = "";
    req.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        // Create event object for Lambda handler
        const event = {
          path: req.url,
          httpMethod: req.method,
          headers: req.headers,
          body,
          isBase64Encoded: false
        };

        // Call the Lambda handler
        const lambdaResponse = await handler(event, {});

        // Set response status and headers
        res.statusCode = lambdaResponse.statusCode;

        if (lambdaResponse.headers) {
          Object.keys(lambdaResponse.headers).forEach(key => {
            res.setHeader(key, lambdaResponse.headers[key]);
          });
        }

        // Send response body
        res.end(lambdaResponse.body);
      } catch (error) {
        console.error("Error handling request:", error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      }
    });
  });

  server.listen(PORT, () => {
    console.log(`Local Lambda server running at http://localhost:${PORT}`);
  });
};
