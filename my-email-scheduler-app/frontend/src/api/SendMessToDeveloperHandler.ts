import axios from "axios"
import { useNotification } from "../components/Notifications/Notifications"

const backendUrl = import.meta.env.VITE_BACKEND_URL

interface SendEmailDto {
	messageMail: string
}

async function sendMessToDev(messageMail: string): Promise<void> {
	// const { triggerNotification } = useNotification()
	// Split the emailAddresses string into an array
	const data: SendEmailDto = {
		messageMail
	}

	try {
		const response = await axios.post(
			`${backendUrl}/email-templates/send-dev`,
			JSON.stringify(data),
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json" // Specify content type as JSON
				}
			}
		)
		// triggerNotification("SUCCESS", "Sent successfull")

		console.log("Success:", response.data)
		return response.data // Resolve the promise with response data
	} catch (error: any) {
		// triggerNotification("ERROR", "something went wrong!")
		// Adjust error typing as needed
		console.error("Error submitting login data:", error)
		throw new Error("Error sending email") // Reject the promise with a meaningful error message
	}
}

export default sendMessToDev
