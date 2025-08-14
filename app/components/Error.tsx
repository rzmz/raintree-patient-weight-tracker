import { Button, Container, Group, Text, Title } from "@mantine/core"
import { Link } from "react-router"
import { m } from "~/paraglide/messages"
import classes from "./Error.module.css"

type TErrorComponentProps = {
	code: number
	title: string
	description: string
}

export function ErrorComponent({ code, title, description }: TErrorComponentProps) {
	return (
		<Container className={classes.root}>
			<div className={classes.label}>{code}</div>
			<Title className={classes.title}>{title}</Title>
			<Text c="dimmed" size="lg" ta="center" className={classes.description}>
				{description}
			</Text>
			<Group justify="center">
				<Button component={Link} variant="subtle" size="md" to="/">
					{m["navigation.back"]()}
				</Button>
			</Group>
		</Container>
	)
}
