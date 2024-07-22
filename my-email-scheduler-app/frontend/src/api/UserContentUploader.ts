const backendUrl = import.meta.env.VITE_BACKEND_URL
import { CollectedEmailData } from "../../types"
import axios from "axios"

export const UserContentUploader = async (
	files: FileList
): Promise<CollectedEmailData> => {
	const formData = new FormData()

	if (files.length > 0) {
		formData.append("file", files[0])
	}

	try {
		const response = await axios.post(
			`${backendUrl}/file-upload/upload-zip`,
			formData,
			{ withCredentials: true }
		)

		const data: CollectedEmailData = response.data
		console.log(data)

		return data
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(`Server responded with ${error.response.status}`)
		} else {
			throw new Error("An unknown error occurred during the file upload")
		}
	}
}
