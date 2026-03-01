import { typescriptWithBiome } from "@mkobayashime/shared-config/eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(typescriptWithBiome, {
	languageOptions: {
		parserOptions: {
			project: "./tsconfig.json",
		},
	},
});
