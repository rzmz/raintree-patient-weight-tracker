import { reactRouter } from "@react-router/dev/vite"
import { reactRouterDevTools } from "react-router-devtools"
import { reactRouterHonoServer } from "react-router-hono-server/dev"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	plugins: [
		// Run the react-compiler on .tsx files only when bundling
		reactRouterDevTools(),
		reactRouter(),
		reactRouterHonoServer({
			dev: {
				exclude: [/^\/(resources)\/.+/],
			},
		}),
		tsconfigPaths(),
	],
	server: {
		open: true,
		// biome-ignore lint/style/noProcessEnv: Its ok to use process.env here
		port: Number(process.env.PORT || 4280),
	},
})
