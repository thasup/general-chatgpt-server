export enum OPENAI_MODEL {
  GPT_4_5_PREVIEW = "openai/gpt-4.5-preview", // 128K context | $75/M input tokens | $150/M output tokens | $108.40/K input imgs
  GPT_O1_PRO = "openai/o1-pro", // 200K context | $150/M input tokens | $600/M output tokens | $216.80/K input imgs
  GPT_O1_MINI = "openai/o1-mini", // 128K context | $1.10/M input tokens | $4.40/M output tokens
  GPT_O1 = "openai/o1", // 200K context | $15/M input tokens | $60/M output tokens | $21.68/K input imgs
  GPT_4_1_NANO = "openai/gpt-4.1-nano", // 1.05M context | $0.10/M input tokens | $0.40/M output tokens
  GPT_4_1_MINI = "openai/gpt-4.1-mini", // 1.05M context | $0.40/M input tokens | $1.60/M output tokens
  GPT_4_1 = "openai/gpt-4.1", // 1.05M context | $2/M input tokens | $8/M output tokens
  GPT_4O_MINI = "openai/gpt-4o-mini", // 128K context | $0.15/M input tokens | $0.60/M output tokens | $0.217/K input imgs
  GPT_4O = "openai/gpt-4o", // 128K context | $2.50/M input tokens | $10/M output tokens | $3.613/K input imgs
  GPT_4 = "openai/gpt-4", // 8K context | $30/M input tokens | $60/M output tokens
  GPT_35_TURBO = "openai/gpt-3.5-turbo", // 16K context | $0.50/M input tokens | $1.50/M output tokens
}

export enum GEMINI_MODEL {
  GEMMA_3_1B_FREE = "google/gemma-3-1b-it:free", // 33K context | $0/M input tokens | $0/M output tokens
  GEMMA_27B_FREE = "google/gemma-3-27b-it:free", // 96K context | $0/M input tokens | $0/M output tokens
  GEMINI_2_0_FLASH_EXP_FREE = "google/gemini-2.0-flash-exp:free", // 1.05M context | $0/M input tokens | $0/M output tokens
  GEMINI_FLASH_1_5_8B = 'google/gemini-flash-1.5-8b' // 1,000,000 context | $0.038/M input tokens | $0.15/M output tokens
}

export enum DEEPSEEK_MODEL {
  DEEPSEEK_V3_0324_FREE = "deepseek/deepseek-chat-v3-0324:free", // 164K context | $0/M input tokens | $0/M output tokens
  DEEPSEEK_R1_FREE = "deepseek/deepseek-r1:free", // 164K context | $0/M input tokens | $0/M output tokens
}
