import React, { createContext, useContext, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react"
import { MdCheckCircle, MdError } from "react-icons/md"

const notificationVariant = {
	initial: {
		y: "-100vh" // Start above the screen
	},
	animate: {
		y: "0", // Move to original position
		opacity: 1,
		transition: {
			duration: 0.2
		}
	}
}
interface NotificationProviderProps {
	children: React.ReactNode
}

interface NotificationContextType {
	triggerNotification: (type: "SUCCESS" | "ERROR", message?: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(
	undefined
)

export const useNotification = () => {
	const context = useContext(NotificationContext)
	if (!context) {
		throw new Error(
			"useNotification must be used within a NotificationProvider"
		)
	}
	return context
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
	children
}) => {
	const [notification, setNotification] = useState<{
		type: "SUCCESS" | "ERROR"
		message?: string
	} | null>(null)

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				setNotification(null) // Clear notification
			}, 2000) // Display for 1 second
			return () => clearTimeout(timer)
		}
	}, [notification])

	const triggerNotification = (type: "SUCCESS" | "ERROR", message?: string) => {
		setNotification({ type, message })
	}

	const notificationElement = notification && (
		<Modal
			motionProps={notificationVariant}
			hideCloseButton
			isOpen={!!notification}
			shadow="md"
			onClose={() => setNotification(null)}
			backdrop="transparent"
			placement="top">
			<ModalContent>
				<ModalHeader className="flex items-center gap-2 text-medium">
					{notification.type === "SUCCESS" ? (
						<MdCheckCircle size="24" color="green" />
					) : (
						<MdError size="24" color="red" />
					)}
					{notification.type === "SUCCESS" ? "Success!" : "Error!"}{" "}
					{notification.message || ""}
				</ModalHeader>
			</ModalContent>
		</Modal>
	)

	return (
		<NotificationContext.Provider value={{ triggerNotification }}>
			{notification &&
				ReactDOM.createPortal(notificationElement, document.body)}
			{children}
		</NotificationContext.Provider>
	)
}
