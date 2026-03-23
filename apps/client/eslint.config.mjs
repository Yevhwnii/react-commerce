import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import { nextJsConfig } from "@commerce/eslint-config/next";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...nextJsConfig
]);

export default eslintConfig;
