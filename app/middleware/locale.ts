import { paraglideMiddleware } from "~/paraglide/server"
import type { Route } from "../+types/root"

// Paraglide middleware for translations to work with server side rendering
export const localeMiddleware: Route.unstable_MiddlewareFunction = async ({ request }, next) => {
	return await paraglideMiddleware(request.clone(), async () => await next())
}
