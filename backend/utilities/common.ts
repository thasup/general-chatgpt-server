import { type Response } from "express";

async function handleApiResponse (res: Response, data: any): Promise<void> {
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
    }

    res.status(200).json(response);
  } catch {
    res.status(500).json({
      error: "Something went wrong!"
    });
  }
}

async function handleError (res: Response, error: any): Promise<void> {
  res.status(500).json({
    error: "Something went wrong!"
  });
}

export {
  handleApiResponse,
  handleError
};
