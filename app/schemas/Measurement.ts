import type { Models } from "node-appwrite"
import { z } from "zod/v4"

export const MinWeight = 25
export const MaxWeight = 250

export const MeasurementSchema = z.object({
	PatientId: z.uuid(),
	Weight: z.number().min(MinWeight).max(MaxWeight),
})

export type Measurement = Models.Document & z.infer<typeof MeasurementSchema>
