module.exports = {
    root: true,
    extends: ["next/core-web-vitals"],
    overrides: [
      {
        files: ["*.ts", "*.tsx", "*.mjs", "*.cjs"],
        extends: [
          "eslint:recommended",
          "plugin:prettier/recommended",
          "plugin:@typescript-eslint/recommended",
        ],
        parser: "@typescript-eslint/parser",
        plugins: ["@typescript-eslint"],
        rules: {
          "prettier/prettier": "warn",
          "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        },
      },
    ],
  };
  