import type { RouteConfig } from "@react-router/dev/routes"
import { index, layout, route } from "@react-router/dev/routes"
import { apiRoutes } from "./api/_routes"
import { patientsRoutes } from "./features/patients/_routes"

export default [
	layout("./components/Layout.tsx", [
		...apiRoutes,
		...patientsRoutes,
		index("./features/home.tsx"),
		route("/sitemap-index.xml", "./features/sitemap.xml.ts"),
		route("/sitemap/:lang.xml", "./features/sitemap.$lang.xml.ts"),
		route("/robots.txt", "./features/robots.txt.ts"),
		route("/*", "./features/404.tsx"),
	]),
] satisfies RouteConfig
