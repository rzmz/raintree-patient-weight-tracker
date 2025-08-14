import { route } from "@react-router/dev/routes"

export const patientsRoutes = [
	route("/patients", "./features/patients/list.tsx"),
	route("/patients/:patientId", "./features/patients/details.tsx"),
]
