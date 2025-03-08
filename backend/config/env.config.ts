import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  port: number
  nodeEnv: string
  isDevelopment: boolean
}

export const envConfig: EnvConfig = {
  port: Number(process.env.PORT) ?? 9999,
  nodeEnv: process.env.NODE_ENV ?? "development",
  isDevelopment: (process.env.NODE_ENV ?? "development") === "development"
};
