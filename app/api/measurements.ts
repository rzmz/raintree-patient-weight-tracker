import { getMeasurements } from "~/data/measurements"
import { getPatients } from "~/data/patients"
import type { Route } from "./+types/measurements"

export function action() {
	return new Response("This is a placeholder for the measurements API endpoint.")
}

export async function loader({ params }: Route.LoaderArgs) {
	if (!params.patientId) throw new Response("Patient ID is required", { status: 400 })

	const patient = getPatients.find((p) => p.id === params.patientId)
	if (!patient) throw new Response("Patient not found", { status: 404 })

	return await getMeasurements(patient.id)
}
