import axios from "axios"
import { LibraryOfEmailTemplateProjects } from "../../types"
import { getTokenValue } from "../context/isUserLoggedIn"

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const LibraryEmailTemplatesProvider =
	async (): Promise<LibraryOfEmailTemplateProjects> => {
		const token = getTokenValue("token")
		if (!token) {
			throw new Error(`Server responded with no cookie`)
		} else {
			try {
				const response = await axios.post(
					`${backendUrl}/email-templates/library`,
					token,
					{
						withCredentials: true
					}
				)

				// Assuming the response directly returns the template data without a wrapper
				const data = response.data

				// Wrap the response data in an 'emailTemplate' object to match the expected structure
				const emailTemplateData: LibraryOfEmailTemplateProjects = {
					...data
				}

				console.log("Email projects loaded: ", emailTemplateData)

				return emailTemplateData
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
	}
