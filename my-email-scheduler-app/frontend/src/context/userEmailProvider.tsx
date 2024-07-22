import axios from "axios"
import { getTokenValue } from "./isUserLoggedIn"

const backendUrl = import.meta.env.VITE_BACKEND_URL

async function userEmailProvider(): Promise<string | null> {
	// Check if the 'token' cookie exists
	const token = getTokenValue("token")
	if (!token) {
		// If the 'token' cookie doesn't exist, assume the user is not logged in
		return null
	}
	try {
		const response = await axios.post(`${backendUrl}/auth/isLoggedIn`, token, {
			withCredentials: true
		})
		console.log(response.data.userEmail)
		return response.data.userEmail // Assuming the endpoint returns an object with a loggedIn boolean
	} catch (error) {
		console.error("Error checking login status:", error)
		return null // Consider the user not logged in if there's an error
	}
}
export default userEmailProvider
