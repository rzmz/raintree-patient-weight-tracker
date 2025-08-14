import { paraglideVitePlugin } from "@inlang/paraglide-js"
import { reactRouter } from "@react-router/dev/vite"
import { reactRouterDevTools } from "react-router-devtools"
import { reactRouterHonoServer } from "react-router-hono-server/dev"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// biome-ignore lint/style/noProcessEnv: TODO: How else can we determine the environment here?
const isProd = process.env.NODE_ENV === "production"

export default defineConfig({
	plugins: [
		// The paraglide plugin is used to handle i18n
		paraglideVitePlugin({
			outputStructure: isProd ? "message-modules" : "locale-modules",
			project: "./project.inlang",
			outdir: "./app/paraglide",
			strategy: ["cookie", "preferredLanguage", "baseLocale"],
			cookieName: "lang",
		}),
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
