import React, { useState } from "react"
import { CoffeeIcon } from "../../components/icons"
import { Button, Textarea } from "@nextui-org/react"
import sendMessToDev from "../../api/SendMessToDeveloperHandler"
import { useNotification } from "../../components/Notifications/Notifications"
const CreditsPage = () => {
	// const { triggerNotification } = useNotification()
	const [message, setMessage] = useState<string | undefined>(undefined)
	function sendMessageClick(message: string | undefined) {
		if (message !== undefined) {
			try {
				sendMessToDev(message)
				// triggerNotification("SUCCESS", "sent successfull")
			} catch (e) {
				// triggerNotification("ERROR", "something went wrong")
			}
		}
		setMessage("")
	}
	return (
		<div className="mb-16 flex flex-col items-center sm:mb-0 sm:h-[89vh]">
			<div className="flex w-full max-w-screen-md flex-col-reverse place-items-center justify-center gap-8 sm:h-[70vh] sm:flex-row">
				<div className="text-center sm:text-left">
					<div className="text-2xl font-semibold">Thank you! </div>
					<div className="mt-2 text-xl">
						I'm glad we could <br className="hidden sm:inline" /> work together!
					</div>
					<Button className="mt-6" href="#1" color="primary">
						Learn more about me!
					</Button>
				</div>
				<div className="">
					<CoffeeIcon />
				</div>
			</div>
			<div className="mt-6 flex w-full max-w-screen-md flex-col items-end gap-4 sm:mt-0 sm:flex-row">
				<Textarea
					label="Send message / Report the bug"
					labelPlacement="outside"
					placeholder="Enter your message"
					className="p-4 pb-0 text-center sm:w-[80%]"
					value={message}
					onValueChange={value => setMessage(value)}
				/>
				<Button
					className="mr-4 px-14"
					color="primary"
					onClick={() => sendMessageClick(message)}>
					Send
				</Button>
			</div>
		</div>
	)
}
export default CreditsPage
