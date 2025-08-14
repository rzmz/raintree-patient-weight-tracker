import { route } from "@react-router/dev/routes"

export const apiRoutes = [route("/api/measurements/:patientId", "./api/measurements.ts")]
