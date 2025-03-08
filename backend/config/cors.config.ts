import { type CorsOptions } from "cors";

const productionOrigins = [
  "https://color-palette-generator-v0ah.onrender.com",
  "https://suppee.shop/general-chatgpt-server",
  "http://thanachon.me",
  "http://*.thanachon.me"
];

const defaultCorsOptions: CorsOptions = {
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"]
};

const productionCorsOptions: CorsOptions = {
  origin: productionOrigins,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"]
};

export const getCorsConfig = (isDevelopment: boolean): CorsOptions => {
  return isDevelopment ? defaultCorsOptions : productionCorsOptions;
};
