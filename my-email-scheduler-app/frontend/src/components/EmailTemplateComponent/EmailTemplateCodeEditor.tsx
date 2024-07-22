import React, { useEffect, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { html } from "@codemirror/lang-html"
import { css } from "@codemirror/lang-css"
import { HTMLHint } from "htmlhint"

interface CodeContentProp {
	code: string
	setCode: React.Dispatch<React.SetStateAction<string>>
}
interface MyRuleset {
	[rule: string]: boolean | any
}

interface HTMLHintError {
	message: string
	line: number
}

const EmailTemplateCodeEditor: React.FC<CodeContentProp> = ({
	code,
	setCode
}) => {
	const [errors, setErrors] = useState<string[]>([])
	useEffect(() => {
		lintCode(code)
	}, [code])

	const lintCode = (value: string): void => {
		const newErrors: string[] = []
		const HTMLRules: MyRuleset = {
			...HTMLHint.defaultRuleset,
			"spec-char-escape": false
		}

		// Adjust based on how HTMLHint is actually used, might need to directly call HTMLHint.default.verify if using UMD
		const HTMLResults = HTMLHint.verify(value, HTMLRules) as HTMLHintError[]
		HTMLResults.forEach((result: HTMLHintError) => {
			newErrors.push(`HTML Error: ${result.message} at line ${result.line}`)
		})

		setErrors(newErrors)
	}

	const handleChange = (value: string) => {
		lintCode(value)
		setCode(value)
	}

	return (
		<div className="flex h-full flex-col  pt-0.5">
			<div
				className="max-h-[800px] overflow-x-hidden
            ">
				<CodeMirror
					defaultValue={code}
					value={code}
					height="100%"
					width="100%"
					className=" h-full "
					theme="dark"
					extensions={[html(), css()]}
					onChange={value => {
						handleChange(value)
					}}
				/>
			</div>

			<div className="flex">
				<div
					className="terminal  min-h-[44px] w-full overflow-scroll"
					style={{
						backgroundColor: "#333",
						color: "lime",
						padding: "10px",
						marginTop: "10px"
					}}>
					{errors.length > 0 ? (
						errors.map((error, index) => <p key={index}>{error}</p>)
					) : (
						<p>No syntax errors.</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default EmailTemplateCodeEditor
