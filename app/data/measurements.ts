import { Client, Databases, ID, Query } from "node-appwrite"
import type { Measurement } from "~/schemas/Measurement"
import { Config } from "~/server/config"
import { Logger } from "~/utils/logger"

const getClient = () => {
	return new Client().setEndpoint(Config.Endpoint).setProject(Config.ProjectId)
}

export async function getMeasurements(patientId: string) {
	const client = getClient()
	const databases = new Databases(client)

	try {
		const result = await databases.listDocuments<Measurement>(Config.DatabaseId, Config.MeasurementsCollectionId, [
			Query.equal("PatientId", patientId),
		])
		return { success: true, result }
	} catch (error) {
		Logger.error("Error fetching measurements: ", error)
		return { success: false, error }
	}
}

export async function createMeasurement(patientId: string, measurement: Measurement) {
	const client = getClient()
	const databases = new Databases(client)

	try {
		const result = await databases.createDocument<Measurement>(
			Config.DatabaseId,
			Config.MeasurementsCollectionId,
			ID.unique(),
			{
				...measurement,
				PatientId: patientId,
			}
		)
		return { success: true, result }
	} catch (error) {
		Logger.error("Error creating measurement: ", error)
		return { success: false, error }
	}
}

export async function updateMeasurement(patientId: string, measurementId: string, measurement: Measurement) {
	const client = getClient()
	const databases = new Databases(client)

	try {
		const result = await databases.updateDocument<Measurement>(
			Config.DatabaseId,
			Config.MeasurementsCollectionId,
			measurementId,
			{
				...measurement,
				PatientId: patientId,
			}
		)
		return { success: true, result }
	} catch (error) {
		Logger.error("Error updating measurement: ", error)
		return { success: false, error }
	}
}

export async function deleteMeasurement(measurementId: string) {
	const client = getClient()
	const databases = new Databases(client)

	try {
		await databases.deleteDocument(Config.DatabaseId, Config.MeasurementsCollectionId, measurementId)
		return { success: true }
	} catch (error) {
		Logger.error("Error deleting measurement: ", error)
		return { success: false, error }
	}
}
