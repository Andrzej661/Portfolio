import axios from "axios"
import { CollectedEmailData } from "../../types"
// import { useNotification } from "../components/Notifications/Notifications"

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const UserEmailTemplateUpdateHandler = async (
	id: number,
	projectName: string,
	htmlContent: string,
	dateToBeSendAt: Date,
	emailTitle: string
): Promise<CollectedEmailData> => {
	// const { triggerNotification } = useNotification()
	const updatedAt = new Date().toISOString()
	try {
		const updateResponse = await axios.put(
			`${backendUrl}/email-templates/${id}`,
			{
				id,
				projectName,
				htmlContent,
				updatedAt,
				dateToBeSendAt,
				emailTitle
			},
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json"
				}
			}
		)

		const data: CollectedEmailData = updateResponse.data
		console.log("Update success", data)
		// triggerNotification("SUCCESS", "Updated successfull")

		return data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Axios error:", error.response?.status, error.message)
			// triggerNotification("ERROR", "something went wrong!")
			throw new Error(
				`Server responded with ${error.response?.status}: ${error.message}`
			)
		} else {
			// triggerNotification("ERROR", "something went wrong!")

			console.error("An unknown error occurred:", error)
			throw new Error("An unknown error occurred during the update")
		}
	}
}
