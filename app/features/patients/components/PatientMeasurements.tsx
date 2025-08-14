import { Box, Button, Flex, Modal, Stack, Table, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Form } from "react-router"
import { m } from "~/paraglide/messages"
import { MaxWeight, type Measurement, MinWeight } from "~/schemas/Measurement"

type MeasurementsTableProps = {
	total: number
	documents: Measurement[]
}

export function PatientMeasurements({ documents, total }: MeasurementsTableProps) {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<Modal opened={opened} onClose={close} title={m["measurements.add"]()} centered>
				<Form method="post">
					<Stack>
						<label>
							{m["measurements.weight"]()}:{" "}
							<input type="number" name="weight" min={MinWeight} max={MaxWeight} required />
						</label>
						<Button type="submit">{m["general.submit"]()}</Button>
					</Stack>
				</Form>
			</Modal>
			<Stack>
				<Title order={3}>{m["measurements.title"]()}</Title>
				{total > 0 ? (
					<Table.ScrollContainer minWidth={600} maxHeight={300}>
						<Table withTableBorder withRowBorders withColumnBorders>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>{m["measurements.id"]()}</Table.Th>
									<Table.Th>{m["measurements.weight"]()}</Table.Th>
									<Table.Th>{m["measurements.date"]()}</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{documents.map((doc) => (
									<Table.Tr key={doc.$id}>
										<Table.Td>{doc.$id}</Table.Td>
										<Table.Td>{doc.Weight}</Table.Td>
										<Table.Td>{new Date(doc.$updatedAt).toLocaleDateString()}</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
						</Table>
					</Table.ScrollContainer>
				) : (
					<Box>{m["measurements.missing"]()}</Box>
				)}
				<Flex>
					<Button onClick={open}>{m["measurements.add"]()}</Button>
				</Flex>
			</Stack>
		</>
	)
}
