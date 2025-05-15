export enum OPENAI_MODEL {
  GPT_45_PREVIEW = "openai/gpt-4.5-preview", // 128K context, $75/M input tokens, $150/M output tokens, $108.40/K input imgs
  GPT_O1_PRO = "openai/o1-pro", // 200K context, $150/M input tokens, $600/M output tokens, $216.80/K input imgs
  GPT_O1_MINI = "openai/o1-mini", // 128K context, $1.10/M input tokens, $4.40/M output tokens
  GPT_O1 = "openai/o1", // 200K context, $15/M input tokens, $60/M output tokens, $21.68/K input imgs
  GPT_41_NANO = "openai/gpt-4.1-nano", // 1.05M context, $0.10/M input tokens, $0.40/M output tokens
  GPT_41_MINI = "openai/gpt-4.1-mini", // 1.05M context, $0.40/M input tokens, $1.60/M output tokens
  GPT_41 = "openai/gpt-4.1", // 1.05M context, $2/M input tokens, $8/M output tokens
  GPT_4O_MINI = "openai/gpt-4o-mini", // 128K context, $0.15/M input tokens, $0.60/M output tokens, $0.217/K input imgs
  GPT_4O = "openai/gpt-4o", // 128K context, $2.50/M input tokens, $10/M output tokens, $3.613/K input imgs
  GPT_4 = "openai/gpt-4", // 8K context, $30/M input tokens, $60/M output tokens
  GPT_35_TURBO = "openai/gpt-3.5-turbo", // 16K context, $0.50/M input tokens, $1.50/M output tokens
}
