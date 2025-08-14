import type { MetaFunction } from "react-router"
import { m } from "~/paraglide/messages"

export const meta: MetaFunction = () => {
	return [
		{ title: "Patients weight tracker" },
		{ name: "description", content: "Welcome to Patients weight tracker!" },
	]
}

export default function Home() {
	return (
		<div>
			<h1>Hello from React Router!</h1>
			{m.example_message({ username: "Stranger" })}
		</div>
	)
}
