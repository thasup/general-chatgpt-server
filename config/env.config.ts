import dotenv from "dotenv";

// Load .env file in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

interface EnvConfig {
  port: number
  nodeEnv: string
  isDevelopment: boolean
  isProduction: boolean
  isTest: boolean
  isLambda: boolean
}

export const envConfig: EnvConfig = {
  port: Number(process.env.PORT) ?? 3000,
  nodeEnv: process.env.NODE_ENV ?? "development",
  isDevelopment: (process.env.NODE_ENV ?? "development") === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  isLambda: Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME)
};

// Helper function to get environment variables with type safety and defaults
export const getEnv = {
  // Get a string environment variable
  string: (key: string, defaultValue?: string): string => {
    const value = process.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Environment variable ${key} is required but not set`);
    }
    return value;
  },

  // Get a number environment variable
  number: (key: string, defaultValue?: number): number => {
    const value = process.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Environment variable ${key} is required but not set`);
    }
    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
      throw new Error(`Environment variable ${key} must be a number`);
    }
    return parsedValue;
  },

  // Get a boolean environment variable
  boolean: (key: string, defaultValue?: boolean): boolean => {
    const value = process.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Environment variable ${key} is required but not set`);
    }
    return value.toLowerCase() === "true";
  }
};
