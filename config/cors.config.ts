import { type CorsOptions } from "cors";

const productionOrigins = [
  "https://color-palette-generator-v0ah.onrender.com",
  "https://thanachon.me",
  "https://www.thanachon.me",
  "https://uk.thanachon.me",
  "https://stack-connect.thanachon.me"
];

const defaultCorsOptions: CorsOptions = {
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

const productionCorsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (productionOrigins.includes(origin) ||
        // Allow all subdomains of thanachon.me
        /^https:\/\/[a-zA-Z0-9-]+\.thanachon\.me$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

export const getCorsConfig = (isDevelopment: boolean): CorsOptions => {
  return isDevelopment ? defaultCorsOptions : productionCorsOptions;
};
