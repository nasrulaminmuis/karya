import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  projects: [
    // API routes + library tests — need Node environment (with real Request/Response)
    {
      displayName: "server",
      testEnvironment: "node",
      testMatch: [
        "<rootDir>/src/lib/__tests__/**/*.test.ts",
        "<rootDir>/src/app/api/**/__tests__/**/*.test.ts",
      ],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      transform: {
        "^.+\\.tsx?$": [
          "ts-jest",
          { tsconfig: "tsconfig.jest.json" },
        ],
      },
    },
    // Store tests — need jsdom (for localStorage) but no DOM rendering
    {
      displayName: "store",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/src/store/__tests__/**/*.test.ts"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      transform: {
        "^.+\\.tsx?$": [
          "ts-jest",
          { tsconfig: "tsconfig.jest.json" },
        ],
      },
    },
    // Component tests — need jsdom + testing-library
    {
      displayName: "components",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/src/components/__tests__/**/*.test.tsx"],
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      transform: {
        "^.+\\.tsx?$": [
          "ts-jest",
          { tsconfig: "tsconfig.jest.json" },
        ],
      },
    },
  ],
  collectCoverageFrom: [
    "src/lib/**/*.ts",
    "src/store/**/*.ts",
    "src/app/api/**/*.ts",
    "src/components/**/*.tsx",
    "!src/**/__tests__/**",
    "!src/**/__mocks__/**",
  ],
};

// Don't use createJestConfig wrapper since we configure projects manually
export default config;
