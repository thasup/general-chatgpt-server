import { type Response } from "express";

function handleApiResponse (res: Response, data: any): void {
  if (!data) {
    res.status(500).json({
      error: "Something went wrong!"
    });
    return;
  }

  try {
    let response;
    if (typeof data === "string") {
      // If data is a string, try to parse it as JSON
      try {
        response = JSON.parse(data);
      } catch {
        // If parsing fails, return the string as is
        response = { data };
      }
    } else {
      response = data;
    }

    res.status(200).json(response);
  } catch {
    res.status(500).json({
      error: "Something went wrong!"
    });
  }
}

function handleError (res: Response, error: any): void {
  res.status(500).json({
    error: "Something went wrong!"
  });
}

async function streamToBuffer (stream: NodeJS.ReadableStream): Promise<Buffer> {
  return await new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => { resolve(Buffer.concat(chunks)); });
  });
}

export {
  handleApiResponse,
  handleError,
  streamToBuffer
};
