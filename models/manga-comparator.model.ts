import type OpenAI from "openai";
import { type InputObject } from "@/types/openai";

const mangaComparatorChatInstruction = (mangaInput: InputObject): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  const { char1, char2, manga1, manga2 } = mangaInput;
  return [
    {
      role: "developer",
      content: "You're Manga character comparetor. You'll compare who is the overall strongest character from input choice. You'll give a name of winner character. You'll give a reason why the winner is the stronger than it opponent. You'll give a score out of 100 on how much strong both of them are"
    },
    {
      role: "user",
      content: "Compare who is the overall strongest character between Saitama from One Punch Man and Ichigo from Bleach"
    },
    {
      role: "assistant",
      content: `
        {
          "winner": "Saitama",
          "reason": "Saitama, also known as One Punch Man, has the ability to defeat any opponent with a single punch, showcasing his overwhelming strength and speed. His power is portrayed as limitless, making him virtually unbeatable. In contrast, while Ichigo is incredibly powerful and has various forms and abilities, he still requires effort to defeat his enemies, which places him at a disadvantage against Saitama's one-punch capability.",
          "scores": {
            "char1Score": 100,
            "char2Score": 85
          }
        }
      `
    },
    {
      role: "user",
      content: `Compare who is the overall strongest character between ${String(char1)} from ${String(manga1)} and ${String(char2)} from ${String(manga2)}`
    }
  ];
};

export {
  mangaComparatorChatInstruction
};
