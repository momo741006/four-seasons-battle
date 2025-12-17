import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const reactPlugins = {
  "react-hooks": reactHooks,
  "react-refresh": reactRefresh,
};

const reactRules = {
  ...reactHooks.configs.recommended.rules,
  "react-refresh/only-export-components": [
    "warn",
    { allowConstantExport: true },
  ],
};

const tsRecommendedConfigs = Array.isArray(tseslint.configs.recommended)
  ? tseslint.configs.recommended
  : [tseslint.configs.recommended];
const [tsBase, tsEslintRecommended, tsRecommended] = tsRecommendedConfigs;

const jsRules = {
  ...(js.configs.recommended.rules ?? {}),
  ...reactRules,
};

const tsRules = Object.assign(
  {},
  js.configs.recommended.rules ?? {},
  tsEslintRecommended?.rules ?? {},
  tsRecommended?.rules ?? {},
  reactRules,
  {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
  }
);

export default [
  { ignores: ["dist", "node_modules", "docs/**"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: reactPlugins,
    rules: jsRules,
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ...tsBase?.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      ...(tsBase?.plugins ?? {}),
      ...reactPlugins,
    },
    rules: tsRules,
  },
];
