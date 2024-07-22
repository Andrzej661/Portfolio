import React, { useState } from "react"
import { submitAuthDataSignup } from "../../../api/authProvider"
import { FaGoogle, FaGithub } from "react-icons/fa"
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	useDisclosure,
	Checkbox,
	Input,
	Link
} from "@nextui-org/react"
import { useNotification } from "../../Notifications/Notifications"

// Importing a hypothetical AuthContext for authentication status checking
// import { AuthContext } from "../context/AuthContext"
const SignInButton: React.FC = () => {
	// Context to check if the user is logged in
	// const { isLoggedIn } = useContext(AuthContext)

	const { triggerNotification } = useNotification()

	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")

	const handleSignup = async () => {
		try {
			console.log("Attempting to log in...")
			await submitAuthDataSignup({ email, password, username })
			// After a successful login, immediately check the login status again

			onOpenChange() // Assuming this is intended to close a modal or similar
			triggerNotification("SUCCESS", "You have been signed up!")
		} catch (error) {
			console.error("Login error:", error)
			const errorMessage =
				error instanceof Error ? error.message : "Something went wrong!"
			triggerNotification("ERROR", errorMessage)
		}
	}
	return (
		<div className="inline-block">
			<Button onPress={onOpen} className="bg-white  text-medium text-primary">
				Sign Up
			</Button>
			<Modal
				backdrop={"transparent"}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center">
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className="flex flex-col gap-1 text-center">
								Create new account
							</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									//   endContent={
									//     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									//   }
									value={username}
									label="Username"
									placeholder="Enter your username"
									variant="bordered"
									// Update state on input change
									onChange={e => setUsername(e.target.value)}
								/>
								<Input
									autoFocus
									//   endContent={
									//     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									//   }
									value={email}
									label="Email"
									placeholder="Enter your email"
									variant="bordered"
									// Update state on input change
									onChange={e => setEmail(e.target.value)}
								/>
								<Input
									//   endContent={
									//     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									//   }
									value={password}
									label="Password"
									placeholder="Enter your password"
									type="password"
									variant="bordered"
									onChange={e => setPassword(e.target.value)}
								/>
								<div className="flex justify-between px-1 py-2">
									<Checkbox
										classNames={{
											label: "text-small"
										}}>
										I accept{" "}
										<Link color="primary" href="#" size="sm">
											regulamin
										</Link>
									</Checkbox>
								</div>
								<Button
									color="primary"
									type="submit"
									onPress={() => {
										// console.log({ email, password, username })
										// submitAuthDataSignup({ email, password, username })
										handleSignup()
										// onClose()
									}}>
									Sign Up
								</Button>
								<div className="mt-2 text-center">Create account with</div>
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
									You have an account?
									<div
										onClick={onClose}
										className="mx-2 inline-block  cursor-pointer text-primary">
										Log in
									</div>
								</div>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}

export default SignInButton
