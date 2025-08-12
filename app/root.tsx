import type { LinksFunction } from "react-router"
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "react-router"
import type { Route } from "./+types/root"
import { ClientHintCheck, getHints } from "./services/client-hints"

export async function loader({ context, request }: Route.LoaderArgs) {
	const { lang, clientEnv } = context
	const hints = getHints(request)
	return { lang, clientEnv, hints }
}

export const links: LinksFunction = () => []

export default function App({ loaderData }: Route.ComponentProps) {
	const { clientEnv } = loaderData
	return (
		<>
			<Outlet />
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: We set the window.env variable to the client env */}
			<script dangerouslySetInnerHTML={{ __html: `window.env = ${JSON.stringify(clientEnv)}` }} />
		</>
	)
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html className="overflow-y-auto overflow-x-hidden" lang="en">
			<head>
				<ClientHintCheck />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="h-full w-full">
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export const ErrorBoundary = () => {
	const error = useRouteError()
	// Constrain the generic type so we don't provide a non-existent key
	const statusCode = () => {
		if (!isRouteErrorResponse(error)) {
			return "500"
		}
		// Supported error code messages
		switch (error.status) {
			case 200:
				return "200"
			case 403:
				return "403"
			case 404:
				return "404"
			default:
				return "500"
		}
	}
	const errorStatusCode = statusCode()

	return (
		<div className="relative flex h-full min-h-screen w-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 placeholder-index sm:pt-8 sm:pb-16 dark:bg-white dark:from-blue-950 dark:to-blue-900">
			<div className="relative mx-auto max-w-[90rem] sm:px-6 lg:px-8">
				<div className="relative flex min-h-72 flex-col justify-center p-1 sm:overflow-hidden sm:rounded-2xl md:p-4 lg:p-6">
					<h1 className="w-full pb-2 text-center text-2xl text-red-600">
						{"error." + errorStatusCode + ".title"}
					</h1>
					<p className="w-full text-center text-lg dark:text-white">
						{"error." + errorStatusCode + ".description"}
					</p>
				</div>
			</div>
		</div>
	)
}
