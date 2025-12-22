import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import pluginCypress from "eslint-plugin-cypress";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    {
        files: ["server.js", "api/**/*.js", "db/**/*.js", "utils/**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                ...globals.node,
            },
        },
    },
    // client-side react files scoped
    {
        files: ["client/**/*.{js,jsx}"],
        ...pluginReact.configs.flat.recommended,
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    // cypress plugin setup
    {
        files: ["cypress/**/*.js"],
        extends: [pluginCypress.configs.recommended],
    },
    {
        files: ["**/*.json"],
        ignores: ["**/package-lock.json", ".vscode/**"],
        plugins: { json },
        language: "json/json",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.md"],
        plugins: { markdown },
        language: "markdown/gfm",
        extends: ["markdown/recommended"],
    },
]);
