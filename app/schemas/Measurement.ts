import { z } from "zod/v4"

const MinWeight = 25
const MaxWeight = 250

export const MeasurementSchema = z.object({
	Id: z.uuid(),
	PatientId: z.uuid(),
	Weight: z.number().min(MinWeight).max(MaxWeight),
	CreatedAt: z.date(),
	UpdatedAt: z.date(),
})

export type Measurement = z.infer<typeof MeasurementSchema>
