import axios from "axios"
import { CollectedEmailData } from "../../types"

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const UserGetEmailTemplateDataProvider = async (
	id: string
): Promise<CollectedEmailData> => {
	try {
		const response = await axios.get(`${backendUrl}/email-templates/${id}`, {
			withCredentials: true
		})

		// Assuming the response directly returns the template data without a wrapper
		const data = response.data

		// Wrap the response data in an 'emailTemplate' object to match the expected structure
		const wrappedData: CollectedEmailData = {
			emailTemplate: {
				id: data.id,
				projectName: data.projectName,
				htmlContent: data.htmlContent,
				dateToBeSendAt: data.dateToBeSendAt,
				emailTitle: data.emailTitle
			}
		}

		console.log("Email template fetched successfully.", wrappedData)

		return wrappedData
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Axios error:", error.message)
			throw new Error(`Server responded with ${error.response?.status}`)
		} else {
			console.error("An unknown error occurred:", error)
			throw new Error(
				"An unknown error occurred during the email template fetch"
			)
		}
	}
}
