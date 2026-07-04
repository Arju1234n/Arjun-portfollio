import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Admin dashboard uses many dynamic API responses — any is acceptable here
      "@typescript-eslint/no-explicit-any": "off",
      // Unused vars: warn only, don't error
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      // img elements are fine in admin (Cloudinary URLs, dynamic)
      "@next/next/no-img-element": "off",
      // setState inside useEffect is valid for syncing server data into local state
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
