import React, { useState, useEffect, useRef } from "react"
import { Switch } from "@nextui-org/switch"
import { FaDesktop } from "react-icons/fa"
import { AiOutlineMobile } from "react-icons/ai"
// import DataCollector from "./DataCollector"
interface CodeWindowProps {
	code: string
}

const EmailTemplateWindow: React.FC<CodeWindowProps> = ({ code }) => {
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const [resolution, setResolution] = useState<"mobile" | "desktop">("desktop")

	useEffect(() => {
		if (iframeRef.current && code) {
			const iframe = iframeRef.current
			iframe.contentWindow?.document.open()
			iframe.contentWindow?.document.write(code)
			iframe.contentWindow?.document.close()
		}
	}, [code])
	const handleSwitchChange = (selected: boolean) => {
		setResolution(selected ? "desktop" : "mobile")
	}

	return (
		<div className=" flex h-full max-h-[94%] flex-col items-center">
			<div className="my-2 flex justify-center gap-2">
				<AiOutlineMobile
					onClick={() => handleSwitchChange(false)}
					className="text-3xl"
					style={{ opacity: resolution === "desktop" ? 0.7 : 1 }}
				/>
				<Switch
					defaultSelected
					isSelected={resolution === "desktop"}
					onValueChange={handleSwitchChange}
				/>
				<FaDesktop
					onClick={() => handleSwitchChange(true)}
					className="text-3xl"
					style={{ opacity: resolution === "desktop" ? 1 : 0.7 }}
				/>
			</div>
			<div className="code-window flex  h-full max-w-[320px]  items-center justify-center overflow-hidden border border-gray-700 p-4 sm:max-w-screen-sm">
				<iframe
					ref={iframeRef}
					title="Preview"
					style={{
						width: resolution === "desktop" ? "1024px" : "355px", // Adjust iframe size based on resolution
						minWidth: resolution === "desktop" ? "640px" : "355px"
					}}
					className="mx-auto h-[200%] w-full scale-50  border-none  sm:h-full sm:scale-100"
				/>
			</div>
		</div>
	)
}

export default EmailTemplateWindow
