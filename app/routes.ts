import type { RouteConfig } from "@react-router/dev/routes"
import { index, layout, route } from "@react-router/dev/routes"

export default [
	layout("./components/Layout.tsx", [
		index("./features/home.tsx"),
		route("/sitemap-index.xml", "./features/sitemap.xml.ts"),
		route("/sitemap/:lang.xml", "./features/sitemap.$lang.xml.ts"),
		route("/robots.txt", "./features/robots.txt.ts"),
		route("/*", "./features/404.tsx"),
	]),
] satisfies RouteConfig
