import type OpenAI from "openai";
import { type InputObject } from "../types/openai";

const generateFeelinksScenerioChatInstruction = (
  inputObj: InputObject
): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        You are a scenario generator for an ice-breaking game.
        Your task is to create a compelling, emotionally engaging scenario that feels authentic to the game.
        The scenario must fit into one of six categories: Family, Friend, School, Social, Work, or Entertainment.
        Each scenario should be generated randomly and must not repeat.
        Never lead with any emotion clues.
        Always, add appropriate emoji(s) at the end.
      `
    },
    {
      role: "user",
      content: "Category: Family"
    },
    {
      role: "assistant",
      content: "Your parents surprise you with a gift, but it’s something you don’t like."
    },
    {
      role: "user",
      content: "Category: Friend"
    },
    {
      role: "assistant",
      content: "A friend cancels plans at the last minute without explanation."
    },
    {
      role: "user",
      content: "Category: School"
    },
    {
      role: "assistant",
      content: "Your teacher reads your essay aloud in class as an example of good work."
    },
    {
      role: "user",
      content: "Category: Social"
    },
    {
      role: "assistant",
      content: "A stranger compliments you on something you didn’t expect to be noticed."
    },
    {
      role: "user",
      content: "Category: Work"
    },
    {
      role: "assistant",
      content:
        "Your boss gives you an unexpected compliment about your work, but you feel it’s not deserved."
    },
    {
      role: "user",
      content: "Category: Entertainment"
    },
    {
      role: "assistant",
      content: "You get lost in a new city and feel both excited and nervous about exploring."
    },
    {
      role: "user",
      content: `Category: ${inputObj.category}`
    }
  ];
};

const generateSoundsFishyScenerioChatInstruction = (
  inputObj: InputObject
): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
        You're an Absurd Trivia Question Generator.
        Your task is to generate trivia questions where the real answer sounds so absurd that players think it must be fake.
        The question must belong to a specific category.
        The answer must be factually correct but highly unexpected.
        You must include real-world references, such as:
        - Names of historical figures, scientists, politicians, or inventors.
        - Actual locations, country names, or city names.
        - Specific years, dates, or historical periods.
        - Real laws, treaties, or legal rulings.
        - Scientific papers, theories, or discoveries.

        You must return a JSON object in this format:
        {
          "question": <generated_question>,
          "answer": <real_answer>,
          "reference": <real_world_reference>,
          "category": <category>,
          "lang": <language, default: English>
        }.
        If you receive the same input, generate a new trivia question again.
      `
    },
    {
      role: "user",
      content: "Generate an absurd trivia question in the category: History"
    },
    {
      role: "assistant",
      content: `
        {
          "question": "Which animal was officially enlisted as a soldier in World War II?",
          "answer": "A bear named Wojtek",
          "reference": "Wojtek, a Syrian brown bear, was enlisted in the Polish Army in 1942 and helped carry artillery shells during the Battle of Monte Cassino in 1944.",
          "category": "History",
          "lang": "English"
        }
      `
    },
    {
      role: "user",
      content: "Generate an absurd trivia question in the category: Science"
    },
    {
      role: "assistant",
      content: `
        {
          "question": "What substance, found in most living organisms, was once used as an explosive ingredient?",
          "answer": "Urea",
          "reference": "Urea was used in the 19th century for making urea nitrate, an explosive compound. The first synthetic urea was created by Friedrich Wähler in 1828.",
          "category": "Science",
          "lang": "German"
        }
      `
    },
    {
      role: "user",
      content: "Generate an absurd trivia question in the category: Food"
    },
    {
      role: "assistant",
      content: `
        {
          "question": "What popular candy was originally invented as a tool to help people quit smoking?",
          "answer": "Cotton candy",
          "reference": "Cotton candy was first patented by dentist William Morrison in 1897, who promoted it as a way to satisfy sugar cravings and reduce cigarette consumption.",
          "category": "Food",
          "lang": "English"
        }
      `
    },
    {
      role: "user",
      content: "Generate an absurd trivia question in the category: Law"
    },
    {
      role: "assistant",
      content: `
        {
          "question": "In what U.S. state is it illegal to carry an ice cream cone in your back pocket?",
          "answer": "Alabama",
          "reference": "An old Alabama law, originally enacted to prevent horse theft, made it illegal to place an ice cream cone in your back pocket because it could be used to lure away horses.",
          "category": "Law",
          "lang": "English"
        }
      `
    },
    {
      role: "user",
      content: `Generate an absurd trivia question in the category: ${inputObj.category}, language: ${inputObj.lang}`
    }
  ];
};

const generateItoQuestionChatInstruction = (
  inputObj: InputObject
): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
  return [
    {
      role: "developer",
      content: `
          You are an AI that generates **fun and engaging theme questions** for the party game "ITO."
          Your goal is to create **simple, recognizable, and discussion-worthy** topics that players can easily rank from least to most.

          ✅ **Rules for a good question:**
          - **Short & Clear**: Easy to understand at a glance.
          - **Engaging & Relatable**: Based on pop culture, daily life, humor, or absurd situations.
          - **Easy to Rank**: Players should naturally debate and order their choices.

          ✅ **Format of your response (JSON format):**
          {
            "question": "<A simple and fun theme>",
            "least": "<Least extreme choice>",
            "most": "<Most extreme choice>"
          }

          🎯 **Examples of great questions:**

          - **Entertainment & Celebrities**
            {
              "question": "Famous Cartoons",
              "least": "Not Well-Known",
              "most": "Everyone Knows It"
            }
            {
              "question": "Superpowers You Want!",
              "least": "Not That Useful",
              "most": "Totally Overpowered"
            }

          - **Daily Life & Objects**
            {
              "question": "Household Items You Can't Live Without",
              "least": "Rarely Used",
              "most": "Essential Every Day"
            }
            {
              "question": "Things That Scare You!",
              "least": "Not That Scary",
              "most": "Terrifying"
            }

          - **Humor & Absurdity**
            {
              "question": "Worst Things to Yell as a Battle Cry!",
              "least": "Sounds Okay",
              "most": "Totally Ridiculous"
            }
            {
              "question": "Best Souvenirs for Aliens!",
              "least": "Not Impressive",
              "most": "The Perfect Gift"
            }

          - **Brands & Products**
            {
              "question": "Popular Convenience Store Items",
              "least": "Rarely Bought",
              "most": "Best-Seller"
            }
            {
              "question": "Most Iconic Brands!",
              "least": "Lesser Known",
              "most": "Famous"
            }

          💡 **Guidelines:**
          - **Keep the question format clean and familiar.**
          - **Make sure players can rank their choices naturally.**
          - **Ensure fun and variety, suitable for different audiences.**
        `
    },
    {
      role: "user",
      content: `Generate a question for Food theme, in English language`
    },
    {
      role: "assistant",
      content: `
          {
            "question": "Most Addictive Snacks!",
            "least": "Easy to Stop Eating",
            "most": "Can't Stop Eating"
          }
        `
    },
    {
      role: "user",
      content: `Generate a question for Superheroes theme, in English language`
    },
    {
      role: "assistant",
      content: `
          {
            "question": "Most Overpowered Superheroes!",
            "least": "Kinda Strong",
            "most": "Unbeatable"
          }
        `
    },
    {
      role: "user",
      content: `Generate a question for ${inputObj.category} theme, in ${inputObj.lang} language`
    }
  ];
};

export {
  generateFeelinksScenerioChatInstruction,
  generateSoundsFishyScenerioChatInstruction,
  generateItoQuestionChatInstruction
};
