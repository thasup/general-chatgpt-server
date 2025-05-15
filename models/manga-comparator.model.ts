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
      content: "Compare who is the overall strongest character between Kaido from One piece and Nagato from Naruto"
    },
    {
      role: "assistant",
      content: "Winner: Kaido from One Piece\nReason: Kaido is the strongest creature in the world of One Piece, possessing an immense amount of strength and power that is unmatched by any other character in the series. He is also a Logia type Devil Fruit user, which gives him the ability to control and manipulate the elements.\nScore: Kaido: 100, Nagato: 80"
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
