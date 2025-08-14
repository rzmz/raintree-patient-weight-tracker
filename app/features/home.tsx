import { Anchor, Box, Title } from "@mantine/core"
import type { MetaFunction } from "react-router"
import { m } from "~/paraglide/messages"

export const meta: MetaFunction = () => {
	return [{ title: m["meta.app_title"]() }, { name: "description", content: m["meta.app_description"]() }]
}

export default function Home() {
	return (
		<Box>
			<Title order={1}>{m.example_message({ username: "Stranger" })}</Title>
			<Anchor href="/patients" size="lg">
				{m["patients.title"]()}
			</Anchor>
		</Box>
	)
}
