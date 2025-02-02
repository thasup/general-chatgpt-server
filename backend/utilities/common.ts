import { type Response } from "express";

async function handleApiResponse (res: Response, data: any): Promise<void> {
  if (!data) {
    res.status(500).json({
      error: "Something went wrong!"
    });
    return;
  }

  try {
    const jsonResponse = {
      result: JSON.parse(String(data))
    };

    res.status(200).json(jsonResponse);
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
