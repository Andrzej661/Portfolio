import axios from "axios"

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const LibraryDeleteProject = async (id: number): Promise<void> => {
	try {
		await axios.post(
			`${backendUrl}/email-templates/delete`,
			{ id },
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Axios error:", error.response?.status, error.message)
			throw new Error(
				`Server responded with ${error.response?.status}: ${error.message}`
			)
		} else {
			console.error("An unknown error occurred:", error)
			throw new Error("An unknown error occurred during the update")
		}
	}
}
