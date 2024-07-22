import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
	DragEvent
} from "react"
import { UserContentUploader } from "../api/UserContentUploader" // Adjust the import path as necessary
import { CollectedEmailData } from "../../types" // Adjust the import path for CollectedEmailData
import { useNavigate } from "react-router-dom" // Assuming you are using React Router for routing
import { useNotification } from "../components/Notifications/Notifications"

interface FileDropContextType {
	uploadedFileName: string // Add state to hold the uploaded file's name
	collectedData: CollectedEmailData | undefined // Use the interface from types.ts
	handleDrop: (e: DragEvent) => void
}

const FileDropContext = createContext<FileDropContextType | undefined>(
	undefined
)

interface FileDropProviderProps {
	children: ReactNode
}

export const FileDropProvider: React.FC<FileDropProviderProps> = ({
	children
}) => {
	// const { triggerNotification } = useNotification()
	const [uploadedFileName, setUploadedFileName] = useState("") // State to store the uploaded file's name
	const [collectedData, setCollectedData] = useState<
		CollectedEmailData | undefined
	>(undefined)
	const navigate = useNavigate()

	const handleDrop = useCallback(async (e: DragEvent) => {
		e.preventDefault()
		if (e.dataTransfer && e.dataTransfer.files.length) {
			const file = e.dataTransfer.files[0] // Assuming single file upload, adjust as necessary
			setUploadedFileName(file.name) // Set the uploaded file's name

			try {
				const uploadResult: CollectedEmailData = await UserContentUploader(
					e.dataTransfer.files
				)
				// triggerNotification("SUCCESS", "uploaded successfull")
				console.log("Uploaded file:", file.name) // Log the uploaded file name
				console.log("Upload result:", uploadResult)

				// Explicitly check if the upload result is empty
				if (!uploadResult || Object.keys(uploadResult).length === 0) {
					// triggerNotification("ERROR", "something went wrong!")
					throw new Error("Upload resulted in an empty response")
				}
				setCollectedData(uploadResult)

				navigate(`/email-templates/${uploadResult.emailTemplate.id}`)
			} catch (error) {
				console.error("Upload failed:", error)
				// triggerNotification("ERROR", "something went wrong!")

				navigate(``)
				// Optionally, re-throw the error if you want calling code to handle it as well
				throw error
			}
		}
	}, [])
	return (
		<FileDropContext.Provider
			value={{ uploadedFileName, collectedData, handleDrop }}>
			{children}
		</FileDropContext.Provider>
	)
}

export const useFileDrop = (): FileDropContextType => {
	const context = useContext(FileDropContext)
	if (!context) {
		throw new Error("useFileDrop must be used within a FileDropProvider")
	}
	return context
}
