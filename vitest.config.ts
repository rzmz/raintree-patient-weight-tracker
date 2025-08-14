import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		css: true,
		coverage: {
			all: false,
			include: ["app/**"],
			reporter: ["text", "json-summary", "json"],
			reportOnFailure: true,
		},
		projects: [
			{
				extends: "./vitest.config.ts",
				test: {
					name: "server tests",
					environment: "node",
					include: ["./**/*.server.test.{ts,tsx}", "!./**/*.browser.test.{ts,tsx}", "./**/*.test.{ts,tsx}"],
				},
			},
			{
				extends: "./vitest.config.ts",
				optimizeDeps: {
					include: ["react/jsx-dev-runtime"],
				},
				server: {
					fs: {
						strict: false,
					},
				},
				test: {
					includeTaskLocation: true,
					include: ["./**/*.test.{ts,tsx}", "./**/*.browser.test.{ts,tsx}", "!./**/*.server.test.{ts,tsx}"],
					setupFiles: ["./tests/setup.browser.tsx"],
					name: "browser tests",
					browser: {
						enabled: true,
						instances: [{ browser: "chromium" }],
						provider: "playwright",
					},
				},
			},
		],
	},
})
