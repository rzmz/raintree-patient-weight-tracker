import { Container } from "@mantine/core"
import { Outlet } from "react-router"

export default function Layout() {
	return (
		<Container>
			<Outlet />
		</Container>
	)
}
