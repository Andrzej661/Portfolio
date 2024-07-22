import EmailTemplateSection from "../../components/EmailTemplateComponent/EmailTemplateSection"
import React, { useEffect } from "react"
import { useFileDrop } from "../../context/FileDropProvider"
const EmailTemplateEditorPage: React.FC = () => {
	const { handleDrop } = useFileDrop()

	useEffect(() => {
		// Use React's event type for consistency within React components
		const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault()
		}

		// Convert the React event handler to be compatible with the native event listener
		const adaptedHandleDrop = (event: DragEvent) => {
			// Manually create a React event with the native event
			const reactEvent = event as unknown as React.DragEvent<HTMLDivElement>
			handleDrop(reactEvent)
			event.preventDefault() // Prevent default action (e.g., opening the file)
		}

		// Add native event listeners
		window.addEventListener(
			"dragover",
			handleDragOver as unknown as EventListener
		)
		window.addEventListener(
			"drop",
			adaptedHandleDrop as unknown as EventListener
		)

		// Clean up
		return () => {
			window.removeEventListener(
				"dragover",
				handleDragOver as unknown as EventListener
			)
			window.removeEventListener(
				"drop",
				adaptedHandleDrop as unknown as EventListener
			)
		}
	}, [handleDrop])
	return (
		<div className="">
			<EmailTemplateSection />
		</div>
	)
}

export default EmailTemplateEditorPage
