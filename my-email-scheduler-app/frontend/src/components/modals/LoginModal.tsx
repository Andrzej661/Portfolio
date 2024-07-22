import React, { useState, useContext } from "react"
import { FaGoogle, FaGithub } from "react-icons/fa"
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	Checkbox,
	Input,
	Link
} from "@nextui-org/react"
import SignInButton from "../Navbar/components/SignInButton"
import { useNotification } from "../Notifications/Notifications"
import { submitAuthDataSignin } from "../../api/authProvider"
// import { LoginContext } from "../../context/LoginContext" // Adjust the import path as necessary

interface LoginModalProps {
	isOpen: boolean
	onOpen: () => void
	onOpenChange: () => void
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal: React.FC<LoginModalProps> = ({
	isOpen,
	onOpen,
	onOpenChange,
	setIsLoggedIn
}) => {
	// const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { triggerNotification } = useNotification()

	const handleLogin = async () => {
		try {
			console.log("Attempting to log in...")
			await submitAuthDataSignin({ email, password })
			setIsLoggedIn(true) // Update the login status in the context
			onOpenChange()
			triggerNotification("SUCCESS", "You have signed in")
		} catch (error) {
			console.error("Login error:", error)
			const errorMessage =
				error instanceof Error ? error.message : "Something went wrong!"
			triggerNotification("ERROR", errorMessage)
		}
	}

	return (
		<>
			<Modal
				backdrop={"blur"}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center">
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1 text-center">
						{" "}
						Log into your account{" "}
					</ModalHeader>
					<ModalBody>
						<Input
							autoFocus
							value={email}
							onChange={e => setEmail(e.target.value)}
							label="Email"
							placeholder="Enter your email"
							variant="bordered"
						/>
						<Input
							value={password}
							onChange={e => setPassword(e.target.value)}
							label="Password"
							placeholder="Enter your password"
							type="password"
							variant="bordered"
						/>
						<div className="flex justify-between px-1 py-2">
							<Checkbox classNames={{ label: "text-small" }}>
								{" "}
								Remember me{" "}
							</Checkbox>
							<Link color="primary" href="#" size="sm">
								{" "}
								Forgot password?{" "}
							</Link>
						</div>
						<Button color="primary" onPress={handleLogin}>
							{" "}
							Log In{" "}
						</Button>
						<div className="mt-2 text-center">Log in with</div>
						<div className="mb-4 flex justify-center gap-4">
							<FaGoogle
								className="cursor-pointer rounded-xl hover:bg-gray-200"
								size={30}
								onClick={() => console.log("Sign in with Google")}
							/>
							<FaGithub
								className="cursor-pointer rounded-xl hover:bg-gray-200"
								size={30}
								onClick={() => console.log("Sign in with github")}
							/>
						</div>
						<div className="mb-4 mt-2 w-full text-center">
							{" "}
							Dont have an account? <SignInButton />{" "}
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default LoginModal
