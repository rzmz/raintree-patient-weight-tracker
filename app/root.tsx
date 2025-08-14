// biome-ignore assist/source/organizeImports: I am not sure why this gets complained about
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core"
import type { LinksFunction } from "react-router"
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "react-router"
import type { Route } from "./+types/root"
import { localeMiddleware } from "./middleware/locale"
import { m } from "./paraglide/messages"
import { ClientHintCheck, getHints } from "./services/client-hints"

import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "@mantine/notifications/styles.css"
import "@mantine/nprogress/styles.css"
import { ErrorComponent } from "./components/Error"

export async function loader({ context, request }: Route.LoaderArgs) {
	const { lang, clientEnv } = context
	const hints = getHints(request)
	return { lang, clientEnv, hints }
}

export const unstable_middleware = [localeMiddleware]

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
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ClientHintCheck />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<ColorSchemeScript />
				<Meta />
				<Links />
			</head>
			<body>
				<MantineProvider>{children}</MantineProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

function getErrorMessage(statusCode: number) {
	// Add supported error code messages here
	switch (statusCode) {
		case 200:
			return { statusCode, title: m["errors.200.title"], description: m["errors.200.description"] }
		case 403:
			return { statusCode, title: m["errors.403.title"], description: m["errors.403.description"] }
		case 404:
			return { statusCode, title: m["errors.404.title"], description: m["errors.404.description"] }
		default:
			return { statusCode: 500, title: m["errors.500.title"], description: m["errors.500.description"] }
	}
}

export const ErrorBoundary = () => {
	const error = useRouteError()
	const errorMessage = !isRouteErrorResponse(error) ? getErrorMessage(500) : getErrorMessage(error.status)

	return (
		<ErrorComponent
			code={errorMessage.statusCode}
			title={errorMessage.title()}
			description={errorMessage.description()}
		/>
	)
}
