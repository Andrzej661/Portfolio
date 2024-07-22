import axios from "axios"
import { isUserLoggedIn } from "../context/isUserLoggedIn"

const backendUrl = import.meta.env.VITE_BACKEND_URL

interface AuthDataCreate {
	email: string
	password: string
	username: string
}
export async function submitAuthDataSignup({
	email,
	password,
	username
}: AuthDataCreate): Promise<any> {
	// Adjust return type as needed
	try {
		const response = await axios.post(`${backendUrl}/auth/signup`, {
			email,
			password,
			username
		})

		console.log("Success:", response.data)
		return response.data // Resolve the promise with response data
	} catch (error: any) {
		// Adjust error typing as needed
		console.error("Error submitting auth data:", error)
		throw new Error("Error during signup.") // Reject the promise with a meaningful error message
	}
}
interface AuthDataLogin {
	email: string
	password: string
}
export async function submitAuthDataSignin({
	email,
	password
}: AuthDataLogin): Promise<any> {
	// Adjust return type as needed
	try {
		const response = await axios.post(
			`${backendUrl}/auth/signin`,
			{ email, password },
			{ withCredentials: true }
		)

		console.log("Success:", response.data)
		return response.data // Resolve the promise with response data
	} catch (error: any) {
		// Adjust error typing as needed
		console.error("Error submitting login data:", error)
		throw new Error("Wrong email or password") // Reject the promise with a meaningful error message
	}
}
export async function submitAuthDataLogout() {
	try {
		const response = await axios.get(`${backendUrl}/auth/signout`, {
			withCredentials: true
		})
		isUserLoggedIn()
		window.location.reload()
		console.log("Success:", response.data)
	} catch (error: any) {
		console.error("Error when logging out:", error)
		throw new Error(error.response?.data?.message || "Error during logout.") // Reject the promise with a meaningful error message
	}
}
