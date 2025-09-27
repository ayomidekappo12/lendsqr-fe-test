// jest.setup.ts

// Extend Jest with custom DOM matchers from React Testing Library
import "@testing-library/jest-dom";
import "fake-indexeddb/auto"; // gives Jest a working indexedDB

// Optional: mock Next.js router if needed
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

// Example: mock next/router
jest.mock("next/router", () => require("next-router-mock"));
