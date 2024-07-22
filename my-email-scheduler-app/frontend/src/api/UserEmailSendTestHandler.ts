import axios from "axios"

const backendUrl = import.meta.env.VITE_BACKEND_URL

interface SendEmailDto {
	templateId: number
	emailAddresses: string[]
}

async function sendTestEmail(
	emailAddresses: string,
	templateId: number
): Promise<void> {
	// Split the emailAddresses string into an array
	let emailAddressesArray = emailAddresses.split(",").map(email => email.trim())
	console.log(emailAddressesArray)
	const data: SendEmailDto = {
		templateId,
		emailAddresses: emailAddressesArray
	}

	try {
		const response = await axios.post(
			`${backendUrl}/email-templates/send`,
			data,
			{
				withCredentials: true
			}
		)

		console.log("Success:", response.data)
		return response.data // Resolve the promise with response data
	} catch (error: any) {
		// Adjust error typing as needed
		console.error("Error submitting login data:", error)
		throw new Error("Error sending email") // Reject the promise with a meaningful error message
	}
}

export default sendTestEmail
