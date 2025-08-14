import { patients } from "~/data/patients"
import { m } from "~/paraglide/messages"
import type { Route } from "./+types/details"

export function loader({ params }: Route.LoaderArgs) {
	const patient = patients.find((p) => p.id === params.patientId)
	if (!patient) {
		throw new Response("Patient not found", { status: 404 })
	}
	return { patient }
}

export default function PatientDetails({ loaderData }: Route.ComponentProps) {
	const { patient } = loaderData
	return (
		<div>
			<h1>{m["patients.details"]({ name: patient.name })}</h1>
			<p>
				{m["patients.id"]()} <br />
				<b>{patient.id}</b>
			</p>
			<p>
				{m["patients.dob"]()} <br />
				<b>{patient.dob.toLocaleDateString()}</b>
			</p>
		</div>
	)
}
