import type { MetaFunction } from "react-router"
import { m } from "~/paraglide/messages"

export const meta: MetaFunction = () => {
	return [{ title: m["general.app_title"]() }, { name: "description", content: m["general.app_description"]() }]
}

export default function Home() {
	return <div>{m.example_message({ username: "Stranger" })}</div>
}
