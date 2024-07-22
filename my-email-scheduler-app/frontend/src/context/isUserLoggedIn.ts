import axios from "axios"

const backendUrl = import.meta.env.VITE_BACKEND_URL

export async function isUserLoggedIn(): Promise<boolean> {
	// Check if the 'token' cookie exists
	const token = getTokenValue("token")
	if (!token) {
		// If the 'token' cookie doesn't exist, assume the user is not logged in
		return false
	}
	try {
		const response = await axios.post(`${backendUrl}/auth/isLoggedIn`, token, {
			withCredentials: true
		})
		return response.data.loggedIn // Assuming the endpoint returns an object with a loggedIn boolean
	} catch (error) {
		console.error("Error checking login status:", error)
		return false // Consider the user not logged in if there's an error
	}
}
export function getTokenValue(cookieName: string): string | null {
	const cookies = document.cookie.split(";")
	const tokenCookie = cookies.find(cookie =>
		cookie.trim().startsWith(`${cookieName}=`)
	)
	if (tokenCookie) {
		return tokenCookie.split("=")[1]
	}
	return null
}
