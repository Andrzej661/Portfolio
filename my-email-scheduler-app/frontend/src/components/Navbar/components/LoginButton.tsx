import React, { useContext,  } from "react"
import { useNotification } from "../../Notifications/Notifications"
import AvatarDropDown from "./AvatarDropdown"
import {
	Button,
	useDisclosure,
} from "@nextui-org/react"
import {
	submitAuthDataLogout,
} from "../../../api/authProvider"
import LoginModal from "../../modals/LoginModal"
import { LoginContext } from "../../../context/LoginContext"

// Importing a hypothetical AuthContext for authentication status checking
// import { AuthContext } from "../context/AuthContext"
const LoginButton: React.FC = () => {
	// Context to check if the user is logged in

	// const [isLoggedIn, setIsLoggedIn] = useState(false)
	const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)
	// useEffect(() => {
	// 	// Check if user is logged in when component mounts
	// 	const checkLoginStatus = async () => {
	// 		const loggedIn = await isUserLoggedIn()
	// 		setIsLoggedIn(loggedIn)
	// 	}
	// 	checkLoginStatus()
	// }, [])
	// const [email, setEmail] = useState("")
	// const [password, setPassword] = useState("")
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const { triggerNotification } = useNotification()

	// const handleLogin = async () => {
	// 	try {
	// 		console.log("Attempting to log in...")

	// 		await submitAuthDataSignin({ email, password })
	// 		// After a successful login, immediately check the login status again
	// 		await checkLoginStatus()
	// 		onOpenChange() // Assuming this is intended to close a modal or similar
	// 		triggerNotification("SUCCESS", "You have signed in")
	// 	} catch (error) {
	// 		console.error("Login error:", error)
	// 		const errorMessage =
	// 			error instanceof Error ? error.message : "Something went wrong!"
	// 		triggerNotification("ERROR", errorMessage)
	// 	}
	// }

	const handleLogout = async () => {
		try {
			await submitAuthDataLogout() // Call your sign-out API
			setIsLoggedIn(false) // Update state to reflect that the user is logged out
			triggerNotification("SUCCESS", "You have been logged out!")
		} catch (error) {
			console.error("Logout error:", error)
			const errorMessage =
				error instanceof Error ? error.message : "Something went wrong!"
			triggerNotification("ERROR", errorMessage)
		}
	}

	return (
		<div className="">
			{isLoggedIn ? (
				<AvatarDropDown onSignOut={handleLogout} />
			) : (
				<>
					<Button className="w-[89px]" onPress={onOpen} color="primary">
						Log in
					</Button>
					<LoginModal
						isOpen={isOpen}
						onOpen={onOpen}
						onOpenChange={onOpenChange}
						setIsLoggedIn={setIsLoggedIn}
					/>
				</>
			)}
		</div>
	)
}

export default LoginButton
