import { Box, Stack, Title } from "@mantine/core"
import { getMeasurements } from "~/data/measurements"
import { getPatients } from "~/data/patients"
import { m } from "~/paraglide/messages"
import type { Route } from "./+types/details"
import { Measurements } from "./components/Measurements"

export async function loader({ params }: Route.LoaderArgs) {
	const patient = getPatients.find((p) => p.id === params.patientId)
	if (!patient) {
		throw new Response("Patient not found", { status: 404 })
	}
	const measurements = await getMeasurements(patient.id)
	return { patient, measurements }
}

export default function PatientDetails({ loaderData }: Route.ComponentProps) {
	const { patient, measurements } = loaderData
	const { documents, total } = measurements.result || { documents: [], total: 0 }

	return (
		<Stack>
			<Title>{m["patients.details"]({ name: patient.name })}</Title>
			<Box>
				{m["patients.id"]()} <br />
				<b>{patient.id}</b>
			</Box>
			<Box>
				{m["patients.dob"]()} <br />
				<b>{patient.dob.toLocaleDateString()}</b>
			</Box>
			<Measurements documents={documents} total={total} />
		</Stack>
	)
}
