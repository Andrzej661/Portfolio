import React, {
	ReactNode,
	useEffect,
	useState,
	createContext,
	Dispatch,
	SetStateAction
} from "react"
import { isUserLoggedIn } from "./isUserLoggedIn"
import userEmailProvider from "./userEmailProvider"

interface LoginContextType {
	isLoggedIn: boolean
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>
	userEmail: string
}

const LoginContext = createContext<LoginContextType>({
	isLoggedIn: false,
	setIsLoggedIn: () => {},
	userEmail: ""
})

// Create a LoginProvider that provides the login status to its children
interface LoginProviderProp {
	children: ReactNode
}

const LoginProvider: React.FC<LoginProviderProp> = ({ children }) => {
	let [isLoggedIn, setIsLoggedIn] = useState(false)
	let [userEmail, setUserEmail] = useState("")
	useEffect(() => {
		const checkLoginStatus = async () => {
			const data = await isUserLoggedIn()
			setIsLoggedIn(data)
		}

		checkLoginStatus()
	}, [])
	useEffect(() => {
		const checkUserEmail = async () => {
			const data = await userEmailProvider()
			if (data !== null) setUserEmail(data)
		}
		checkUserEmail()
	}, [isLoggedIn])

	return (
		<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail }}>
			{children}
		</LoginContext.Provider>
	)
}
// export LoginContext
export { LoginProvider, LoginContext }
