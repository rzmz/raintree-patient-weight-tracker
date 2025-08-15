import type { Models } from "node-appwrite"
import * as v from "valibot"

export const MinWeight = 25
export const MaxWeight = 250

export const MeasurementSchema = v.object({
	PatientId: v.pipe(v.string(), v.uuid()),
	Weight: v.pipe(v.number(), v.minValue(MinWeight), v.maxValue(MaxWeight)),
})

export type Measurement = Models.Document & v.InferOutput<typeof MeasurementSchema>
