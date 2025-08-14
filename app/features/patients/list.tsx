import { Anchor, Box, Table, Title } from "@mantine/core"
import { data, Link } from "react-router"
import { patients } from "~/data/patients"
import { m } from "~/paraglide/messages"
import type { Route } from "./+types/list"

export async function loader() {
	// Load patient data here
	return data({ patients })
}

export default function PatientsList({ loaderData }: Route.ComponentProps) {
	const { patients } = loaderData
	return (
		<Box>
			<Title size="lg">{m["patients.title"]()}</Title>
			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>{m["patients.id"]()}</Table.Th>
						<Table.Th>{m["patients.name"]()}</Table.Th>
						<Table.Th>{m["patients.dob"]()}</Table.Th>
						<Table.Th> </Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{patients.map((patient) => (
						<Table.Tr key={patient.id}>
							<Table.Td>{patient.id}</Table.Td>
							<Table.Td>{patient.name}</Table.Td>
							<Table.Td>{patient.dob.toLocaleDateString()}</Table.Td>
							<Table.Td align="right">
								<Anchor size="sm" component={Link} to={`/patients/${patient.id}`}>
									{m["general.details"]()}
								</Anchor>
							</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</Box>
	)
}
