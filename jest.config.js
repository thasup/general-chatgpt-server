/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>"],
  testMatch: [
    "**/__tests__/**/*.spec.ts",
    "**/__tests__/**/*.test.ts"
  ],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      isolatedModules: true,
      diagnostics: {
        ignoreCodes: [
          "TS2769", // Type error in function arguments
          "TS2345", // Argument type error
          "TS2322" // Type assignment error
        ]
      }
    }]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
  verbose: true
};

module.exports = config;
