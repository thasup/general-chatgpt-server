import { type Request, type Response } from "express";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

import { chatCompletion, openAiDefaultConfig } from "../utilities/openai";
import { colorsPaletteChatInstruction2, colorsPaletteChatInstruction3 } from "../models/colors-palette.model";
import { handleApiResponse, handleError } from "../utilities/common";
import { type ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";

// Define a schema for individual color objects
const ColorSchema = z.object({
  code: z.string(),
  name: z.string()
});

// Define a schema for the main object containing the colors array
const ColorsResponseSchema = z.object({
  colors: z.array(ColorSchema) // Colors must be an array of ColorSchema
});

// const jsonSchemaFormat = {
//   type: "json_schema",
//   json_schema: {
//     name: "color_schema",
//     schema: {
//       type: "object",
//       properties: {
//         colors: {
//           type: "array",
//           items: {
//             type: "object",
//             properties: {
//               code: {
//                 description: "The hex code for the color",
//                 type: "string",
//                 pattern: "^#[0-9A-Fa-f]{6}$" // regex to validate hex color codes
//               },
//               name: {
//                 description: "The name of the color",
//                 type: "string"
//               }
//             },
//             required: ["code", "name"],
//             additionalProperties: false
//           }
//         }
//       },
//       required: ["colors"], // The main object must have the `colors` property
//       additionalProperties: false
//     }
//   }
// };

const colorsOptions: Partial<ChatCompletionCreateParamsBase> = {
  ...openAiDefaultConfig,
  temperature: 0.8
};

async function getColorsPalette (req: Request, res: Response): Promise<void> {
  const input = req.params.input;
  const inputObj = {
    input
  };

  if (!inputObj.input) {
    res.status(404).json({
      error: "Missing an input"
    });
  }

  try {
    const palette = await chatCompletion(
      inputObj,
      colorsPaletteChatInstruction2,
      colorsOptions,
      zodResponseFormat(ColorsResponseSchema, "color_schema")
    );

    await handleApiResponse(res, palette);
  } catch (error) {
    await handleError(res, error);
  }
}

async function postColorsPaletteChatCompletion (req: Request, res: Response): Promise<void> {
  const { input } = req.body;
  const inputObj = {
    input
  };

  if (!inputObj) {
    res.status(400).json({
      error: "Missing an input"
    });
  }

  try {
    const palette = await chatCompletion(
      inputObj,
      colorsPaletteChatInstruction3,
      colorsOptions,
      zodResponseFormat(ColorsResponseSchema, "color_schema")
    );

    await handleApiResponse(res, palette);
  } catch (error) {
    await handleError(res, error);
  }
}

export {
  getColorsPalette,
  postColorsPaletteChatCompletion
};
