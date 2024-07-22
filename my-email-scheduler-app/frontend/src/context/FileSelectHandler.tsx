import { UserContentUploader } from "../api/UserContentUploader" // Adjust the import path as necessary
import { CollectedEmailData } from "../../types" // Adjust the import path for CollectedEmailData
import { Dispatch, SetStateAction } from "react"
// import { useNotification } from "../components/Notifications/Notifications"

export const FileSelectHandler = async (
	navigate: Function,
	setLoading: Dispatch<SetStateAction<boolean>>
) => {
	const input = document.createElement("input")
	input.type = "file"
	input.multiple = false
	input.click()
	// const { triggerNotification } = useNotification()

	input.onchange = async e => {
		setLoading(true)
		if (e.target && (e.target as HTMLInputElement).files) {
			const files = (e.target as HTMLInputElement).files

			if (files !== null && files !== undefined) {
				const file = files[0] // Assuming single file upload, adjust as necessary
				console.log("Selected file:", file.name) // Log the selected file name

				try {
					const uploadResult: CollectedEmailData =
						await UserContentUploader(files)
					console.log("Upload result:", uploadResult)

					// Explicitly check if the upload result is empty
					if (!uploadResult || Object.keys(uploadResult).length === 0) {
						throw new Error("Upload resulted in an empty response")
					}
					// triggerNotification("SUCCESS", "uploaded successfull")

					navigate(`/email-templates/${uploadResult.emailTemplate.id}`)
				} catch (error) {
					console.error("Upload failed:", error)
					navigate(``)
					// triggerNotification("ERROR", "something went wrong!")

					// Optionally, re-throw the error if you want calling code to handle it as well
					setLoading(false)
					throw error
				}
			}
		}
	}
}
