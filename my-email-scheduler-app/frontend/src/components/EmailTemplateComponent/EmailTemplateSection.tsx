import React, { useContext, useEffect, useState } from "react"
import EmailTemplateCodeEditor from "./EmailTemplateCodeEditor"
import EmailTemplateWindow from "./EmailTemplateWindow"
import {
	Autocomplete,
	AutocompleteItem,
	Button,
	Input,
	Spinner,
	useDisclosure
} from "@nextui-org/react"
import { MdOutlineEmail } from "react-icons/md"
import Calendar from "../calendar/Calendar"
import { useNavigate, useParams } from "react-router-dom"
import { UserGetEmailTemplateDataProvider } from "../../api/UserGetEmailTemplateDataProvider"
import { CollectedEmailData } from "../../../types"
import { UserEmailTemplateUpdateHandler } from "../../api/UserEmailTemplateUpdateHandler"
import { format, isValid, parse, getHours, getMinutes } from "date-fns"
import { motion, useAnimation } from "framer-motion"
import { FileSelectHandler } from "../../context/FileSelectHandler"
import LoginModal from "../modals/LoginModal"
import { LoginContext } from "../../context/LoginContext"
import sendTestEmail from "../../api/UserEmailSendTestHandler"

const hours = Array.from({ length: 24 }, (_, i) => ({
	label: String(i),
	value: i
}))

const minutes = Array.from({ length: 60 }, (_, i) => ({
	label: String(i).padStart(2, "0"),
	value: i
}))

const clientEmailcustomerLibrary = [
	{ emails: ["123@wp.pl", "123@wp.pl"], name: "list1" },
	{ emails: ["123@wp.pl", "123@wp.pl"], name: "list2" }
]

const EmailTemplateSection: React.FC = () => {
	const { id } = useParams<string>()
	// const fileDropContext = useFileDrop()
	const [collectedData, setCollectedData] = useState<
		CollectedEmailData | undefined
	>()
	const [isLoading, setIsLoading] = useState(true)

	// Fetch data either from file drop or API based on context or URL ID
	useEffect(() => {
		const fetchData = async () => {
			// Check if file drop context has collected data
			// if (fileDropContext?.collectedData?.emailTemplate) {
			// 	const { emailTemplate } = fileDropContext.collectedData
			// 	setCollectedData(fileDropContext.collectedData)
			// 	setCode(emailTemplate.htmlContent)
			// 	setProjectName(emailTemplate.projectName)
			// 	setProjectId(Number(emailTemplate.id))
			// } else
			setIsLoading(true)
			if (id && !collectedData) {
				// If not, try to fetch the data using the provided ID
				try {
					const data = await UserGetEmailTemplateDataProvider(id)
					if (data?.emailTemplate) {
						setCollectedData(data)
						setCode(data.emailTemplate.htmlContent)
						setProjectName(data.emailTemplate.projectName)
						setProjectId(Number(data.emailTemplate.id))
						setEmailTitle(data.emailTemplate.emailTitle)
						setDateValue(data.emailTemplate.dateToBeSendAt)
						extractAndSetTimeFromDate(data.emailTemplate.dateToBeSendAt)
						setInputDateValue(
							parseDateToString(data.emailTemplate.dateToBeSendAt)
						)
					}
				} catch (error) {
					console.error("Failed to fetch email template data", error)
				}
			}
			setIsLoading(false)
		}
		fetchData()
	}, [
		id
		//  fileDropContext?.collectedData
	])

	let [code, setCode] = useState("")
	const [projectName, setProjectName] = useState<string | undefined>(undefined)
	const [emailTitle, setEmailTitle] = useState<string | undefined>(undefined)
	const [projectid, setProjectId] = useState<number | undefined>(undefined)
	const [selectedHour, setSelectedHour] = useState<number>(12) // Example initial value
	const [selectedMinute, setSelectedMinute] = useState<number>(12) // Example initial value

	const [emailAdresses, setEmailAdresses] = useState("")
	const [dateValue, setDateValue] = useState<Date>(new Date())
	const [isInvalid, setIsInvalid] = useState<boolean>(false)
	const selectedDate = new Date(dateValue)
	function sendEmailClick() {
		saveChanges()
		if (projectid !== undefined) sendTestEmail(emailAdresses, projectid)
	}
	function saveChanges() {
		if (
			projectid !== undefined &&
			projectName !== undefined &&
			emailTitle !== undefined
		) {
			selectedDate.setHours(selectedHour, selectedMinute)
			UserEmailTemplateUpdateHandler(
				projectid,
				projectName,
				code,
				selectedDate,
				emailTitle
			)
			console.log("saved: ", projectid, projectName, code, selectedDate)
		} else console.log("EMPTY EMAIL TEMPLATE")
	}

	const handleChangeName = (value: string) => {
		setProjectName(value)
	}
	const handleChangeEmailTitle = (value: string) => {
		setEmailTitle(value)
	}
	const parseDateToString = (date: Date): string => {
		return format(date, "dd-MM-yyyy")
	}

	const parseStringToDate = (dateString: string): Date | undefined => {
		try {
			const parsedDate = parse(dateString, "dd-MM-yyyy", new Date())
			if (isValid(parsedDate)) {
				return parsedDate
			}
		} catch (error) {
			console.error("Error parsing date:", error)
		}
		return undefined
	}
	const [inputDateValue, setInputDateValue] = useState<string>(
		parseDateToString(new Date())
	)
	const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputDateValue(e.target.value) // Update the input value as user types
	}
	const handleInputDateBlur = () => {
		const newDate = parseStringToDate(inputDateValue)
		if (newDate) {
			setDateValue(newDate) // Update the dateValue state if newDate is valid
			setIsInvalid(false) // Reset invalid state
		} else {
			setIsInvalid(true) // Set invalid state if parsing fails
		}
	}
	function extractAndSetTimeFromDate(date: Date) {
		// Extract hours and minutes from the date
		const hours = getHours(date)
		const minutes = getMinutes(date)

		// Set the extracted hours and minutes using the state setter functions
		setSelectedHour(hours)
		setSelectedMinute(minutes)
	}
	useEffect(() => {
		extractAndSetTimeFromDate(dateValue)
		setInputDateValue(parseDateToString(dateValue))
	}, [dateValue])
	const controls = useAnimation()
	const navigate = useNavigate()
	const jumpVariants = {
		hover: {
			y: -20, // The "jump" height
			transition: {
				y: {
					duration: 0.2,
					ease: "easeOut"
				}
			}
		},
		rest: {
			y: 0 // Resting state should be at 0
		}
	}
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)

	function handleFolderClick() {
		if (isLoggedIn) {
			FileSelectHandler(navigate, setIsLoading)
		} else {
			onOpen() // Open the login modal
		}
	}
	return (
		<>
			{isLoading ? (
				<div className="flex h-full min-h-[85vh] w-full items-center justify-center justify-items-center">
					<Spinner label="loading" size="lg" />
				</div>
			) : collectedData ? (
				<div className="m-3  flex-1 lg:p-0 2xl:mt-8">
					<div className="z-0 flex    ">
						<div className="flex w-full flex-col-reverse items-center justify-center gap-4  lg:max-h-screen lg:flex-row ">
							<div className=" w-full max-w-screen-sm overflow-hidden lg:w-[50%]">
								<div className="max-h-[800px] max-w-screen-sm break-words pb-4 pt-2  text-center md:text-left lg:mt-12 xl:w-full ">
									Current project: {projectName}
								</div>
								<EmailTemplateCodeEditor code={code} setCode={setCode} />
							</div>
							<div className="lg:min-h-none h-full   w-full max-w-[640px] ">
								<EmailTemplateWindow code={code} />
							</div>
						</div>
					</div>
					<div className="mb-16 flex flex-col place-items-center py-10  lg:mt-24 xl:mb-48 ">
						<div className="mx-auto mb-16 text-center text-3xl">
							Test and setup deadline
						</div>
						<div className="max-w-screen-md  grid-cols-7  gap-24 lg:justify-between xl:max-w-none 2xl:grid">
							<div className="col-span-2 flex  h-full flex-col  gap-2">
								<div className="col-span-2 ">
									<Input
										className="mb-2"
										autoFocus
										//   endContent={
										//     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
										//   }
										// value={""}
										// onChange={e => setEmail(e.target.value)}
										label="Project name"
										value={projectName}
										onValueChange={value => {
											handleChangeName(value)
										}}
										variant="bordered"
									/>
									<Input
										className="mb-2"
										autoFocus
										//   endContent={
										//     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
										//   }
										// value={""}
										// onChange={e => setEmail(e.target.value)}
										label="Email title"
										value={emailTitle}
										onValueChange={value => {
											handleChangeEmailTitle(value)
										}}
										variant="bordered"
									/>
								</div>
								<div className="col-span-2   flex flex-col gap-2  md:flex-row">
									<Input
										className=""
										autoFocus
										label="Scheduled day"
										defaultValue={parseDateToString(dateValue)}
										value={inputDateValue}
										onChange={handleDateInputChange}
										onBlur={handleInputDateBlur} // Validate and format onBlur
										placeholder="dd-MM-yyyy"
										variant="bordered"
										isInvalid={isInvalid}
									/>

									<div className=" flex  w-full gap-2 md:flex-nowrap">
										<Autocomplete
											isClearable={false}
											label="Hour"
											clearIcon={false}
											className="max-w-xs"
											defaultInputValue={selectedHour.toString()}>
											{hours.map(hour => (
												<AutocompleteItem
													onClick={() => setSelectedHour(hour.value)}
													key={hour.value}
													value={hour.value}>
													{hour.label}
												</AutocompleteItem>
											))}
										</Autocomplete>
										<Autocomplete
											label="Minute"
											defaultInputValue={selectedMinute.toString()}
											isClearable={false}
											className="max-w-xs">
											{minutes.map(minute => (
												<AutocompleteItem
													onClick={() => setSelectedMinute(minute.value)}
													key={minute.value}
													value={minute.value}>
													{minute.label}
												</AutocompleteItem>
											))}
										</Autocomplete>
									</div>
								</div>
							</div>

							<div className="col-span-7 my-8   lg:col-span-3 xl:my-0 ">
								<Calendar
									onChange={newDate => {
										setDateValue(newDate) // Calendar updates dateValue directly
										setIsInvalid(false) // Reset validation state when date is selected from the calendar
									}}
									value={selectedDate}
								/>
							</div>

							<div className="col-span-2  flex w-full flex-col flex-wrap justify-between gap-2 md:flex-nowrap">
								<div className="flex  gap-2">
									<Input
										autoFocus
										//   endContent={
										//     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
										//   }
										// value={""}
										// onChange={e => setEmail(e.target.value)}
										label="Emails for test"
										placeholder="sample@gmail.com, sample2@gmail.com..."
										variant="bordered"
										value={emailAdresses}
										onValueChange={value => setEmailAdresses(value)}
									/>
									<Button
										className=" mt-1 w-full py-6"
										color="primary"
										onClick={sendEmailClick}
										endContent={<MdOutlineEmail />}>
										Send test email
									</Button>
								</div>
								{/* <div className="flex h-full items-center mt-6">
									<Autocomplete
										isClearable={false}
										label="Choose client library"
										clearIcon={false}
										className=" ">
										{clientEmailcustomerLibrary.map(customerEmail => (
											<AutocompleteItem
												onClick={() => setEmailLibrary(customerEmail.name)}
												key={customerEmail.name}
												value={customerEmail.emails}>
												{customerEmail.name}
											</AutocompleteItem>
										))}
									</Autocomplete>
								</div> */}
								<Button
									className="mt-6 w-full py-6 lg:mt-0"
									onClick={saveChanges}
									color="primary">
									Save changes
								</Button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="relative flex h-[89vh] w-full items-center ">
					<div
						// Assuming you want to trigger a file input or similar action here
						className=" flex  h-full w-full place-items-center rounded-lg 
						   px-5 py-2.5 text-center text-medium  font-medium">
						<div className="mx-auto  justify-center ">
							<div className="flex flex-col items-center">
								<div className=" flex min-h-full flex-col items-center justify-center gap-10 p-8">
									<div>Select your zip file:</div>
									<div className="relative">
										<motion.div
											onClick={handleFolderClick}
											whileHover="hover"
											className="folder flex h-40 w-64 cursor-pointer items-center justify-center rounded-md bg-yellow-400 shadow-lg"
											variants={jumpVariants}
											animate={controls}>
											<div className="folder-tab"></div>
											<div className="folder-sheet-text"></div>
											<div className="h-5/6 w-full rounded-b-md bg-yellow-400"></div>
											<div className="absolute top-0 h-20 w-64 rounded-t-md bg-yellow-500"></div>
										</motion.div>
										<LoginModal
											isOpen={isOpen}
											onOpen={onOpen}
											onOpenChange={onOpenChange}
											setIsLoggedIn={setIsLoggedIn}
										/>
									</div>

									<div>Or drag and drop it somewhere</div>
									<div className="flex items-center gap-2 rounded-xl bg-primary-50 p-4 leading-5">
										<div className="rounded-full  bg-primary-300 px-3 py-1  text-white">
											!
										</div>
										<div className="inline tracking-tight">
											Your .zip file need to contain .html file
											<br />
											please don't use any subfolders inside
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default EmailTemplateSection
