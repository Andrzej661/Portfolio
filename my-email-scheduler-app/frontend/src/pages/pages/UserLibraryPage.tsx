import React, { useCallback, useEffect, useState } from "react"
import { useFileDrop } from "../../context/FileDropProvider"
import Project from "../../components/UserLibrary/Project"
import { Input, Accordion, AccordionItem, Button } from "@nextui-org/react"
import { FaSearch } from "react-icons/fa"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import {
	EmailTemplateProject,
	LibraryOfEmailTemplateProjects
} from "../../../types"
import { useNavigate, useParams } from "react-router-dom"
import { LibraryEmailTemplatesProvider } from "../../api/LibraryEmailTemplatesProvider"
import { LibraryDeleteProject } from "../../api/LibraryDeleteProject"
const UserLibraryPage: React.FC = () => {
	const { handleDrop } = useFileDrop()
	const [inputValue, setInputValue] = useState<string>("")
	// const navigate = useNavigate()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const clearInputValue = () => {
		setInputValue("")
	}
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
	type OpenState = {
		[key: string]: boolean
	}

	const [isOpen, setIsOpen] = useState<OpenState>({
		"1": true,
		"2": false,
		"3": false
	})

	const toggleOpen = (id: string) => {
		setIsOpen(prevState => ({ ...prevState, [id]: !prevState[id] }))
	}
	const [emailProjects, setEmailProjects] = useState<EmailTemplateProject[]>([])
	const fetchEmailTemplates = useCallback(async () => {
		try {
			const fetchedProjects = await LibraryEmailTemplatesProvider()
			const sortedProjects = fetchedProjects.EmailProjects.sort((a, b) => {
				const timestampA = new Date(a.updatedAt).getTime()
				const timestampB = new Date(b.updatedAt).getTime()
				return timestampB - timestampA // For descending order
			})
			setEmailProjects(sortedProjects)
		} catch (error) {
			console.error("Error fetching email templates:", error)
		}
	}, [])

	useEffect(() => {
		fetchEmailTemplates()
	}, [fetchEmailTemplates])

	const handleProjectDelete = async (projectId: number) => {
		try {
			await LibraryDeleteProject(projectId)
			await fetchEmailTemplates() // Refetch projects after deletion
			console.log("Project deleted successfully")
		} catch (error) {
			console.error("Failed to delete project", error)
		}
	}

	const [gridCol, setGridCol] = useState(false)

	const toggleGrid = (status: boolean) => {
		setGridCol(status)
	}
	const leftGridButtonClass = gridCol
		? "bg-primary text-white"
		: "bg-primary-50 text-black"
	const rightGridButtonClass = gridCol
		? "bg-primary-50 text-black"
		: "bg-primary text-white"
	const gridClass = gridCol
		? "lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid gap-y-8 place-items-center lg:justify-start"
		: "grid-cols-10 flex justify-start"
	return (
		// navigate(`/email-templates/${uploadResult.emailTemplate.id}`),
		<div className=" min-h-[85vh] flex-1   text-center sm:mt-10">
			<Input
				isClearable
				radius="lg"
				classNames={{
					input: [
						"bg-transparent text-center",
						"text-black/90 dark:text-white/90",
						"placeholder:text-default-700/50 dark:placeholder:text-white/60"
					],

					inputWrapper: [
						"rounded-full",
						"w-[97%]",
						"2xl:w-[100%]",
						"bg-transparent",
						"shadow-md",
						"bg-default-200/50",
						"dark:bg-default/60",
						"backdrop-blur-xl",
						"backdrop-saturate-200",
						"hover:bg-default-200/70",
						"dark:hover:bg-default/70",
						"group-data-[focused=true]:bg-default-200/50",
						"dark:group-data-[focused=true]:bg-default/60",
						"!cursor-text"
					]
				}}
				value={inputValue}
				onChange={handleInputChange}
				onClear={clearInputValue}
				defaultValue=""
				placeholder="Type to search..."
				startContent={
					<FaSearch className="pointer-events-none mt-0.5 flex-shrink-0 text-primary" />
				}
			/>
			<Accordion defaultExpandedKeys={["1"]}>
				<AccordionItem
					key="1"
					className="sm:mt-10"
					hideIndicator
					onClick={() => toggleOpen("1")}
					title={
						<>
							<div className="my-4 border-b-1 pb-4 text-center text-3xl">
								Recent projects
							</div>

							{isOpen["1"] ? (
								<div className="flex flex-col">
									<FiChevronUp className="mx-auto mb-3 align-middle" />
									<div className="mx-auto">
										<Button
											isIconOnly
											onClick={() => toggleGrid(true)}
											className={`  ${leftGridButtonClass} mr-1 rotate-90 text-[18px] font-bold tracking-wide `}>
											<p className="mb-1">|||</p>
										</Button>
										<Button
											onClick={() => toggleGrid(false)}
											isIconOnly
											className={` ${rightGridButtonClass} mb-1 text-[18px] font-bold tracking-wide `}>
											<p className="mb-1">|||</p>
										</Button>
									</div>
								</div>
							) : (
								<FiChevronDown className="mx-auto  align-middle" />
							)}
						</>
					}>
					<div className={` mb-8  ${gridClass}  gap-2 px-1 `}>
						{emailProjects
							.filter(project =>
								project.projectName
									.toLowerCase()
									.includes(inputValue.toLowerCase())
							)
							.map(project => (
								<Project
									key={project.id}
									projectDate={new Date(
										project.dateToBeSendAt
									).toLocaleDateString()}
									projectId={project.id}
									projectName={project.projectName}
									projectStatus="pending"
									projectThumbnailUrl={project.projectThumbnailUrl}
									onDelete={() => handleProjectDelete(project.id)}
								/>
							))}
					</div>
				</AccordionItem>
			</Accordion>

			{/* <Accordion>
				<AccordionItem
					key="2"
					hideIndicator
					aria-label="Projects archive"
					onClick={() => toggleOpen("2")}
					title={
						<>
							<div className="my-4 border-b-1 pb-4 text-center text-3xl">
								Archive
							</div>
							{isOpen["2"] ? (
								<FiChevronUp className="mx-auto  align-middle" />
							) : (
								<FiChevronDown className="mx-auto  align-middle" />
							)}
						</>
					}>
					<div className=" mb-8 flex grid-cols-5 justify-between px-1  ">
						<Project
							projectDate="12.04.2024"
							projectId=""
							projectName="project1"
							projectStatus="pending"
							projectThumbnailUrl="https://myemailapp.s3.eu-north-1.amazonaws.com/uploads/fad2ae1a-161f-48f6-93ae-6a7c942856e9/tvn24-nieaktywni/thumbnail"
						/>
						<Project
							projectDate="12.04.2024"
							projectId=""
							projectName="project1"
							projectStatus="pending"
							projectThumbnailUrl="https://myemailapp.s3.eu-north-1.amazonaws.com/uploads/fad2ae1a-161f-48f6-93ae-6a7c942856e9/tvn24-nieaktywni/thumbnail"
						/>
						<Project
							projectDate="12.04.2024"
							projectId=""
							projectName="project1"
							projectStatus="pending"
							projectThumbnailUrl="https://th.bing.com/th/id/OIP.m_uh6VUKg1lGusTVp7JfWQHaFj?rs=1&pid=ImgDetMain"
						/>
						<Project
							projectDate="12.04.2024"
							projectId=""
							projectName="project1"
							projectStatus="pending"
							projectThumbnailUrl="https://myemailapp.s3.eu-north-1.amazonaws.com/uploads/fad2ae1a-161f-48f6-93ae-6a7c942856e9/tvn24-nieaktywni/thumbnail"
						/>
						<Project
							projectDate="12.04.2024"
							projectId=""
							projectName="project1"
							projectStatus="pending"
							projectThumbnailUrl="https://th.bing.com/th/id/OIP.m_uh6VUKg1lGusTVp7JfWQHaFj?rs=1&pid=ImgDetMain"
						/>
					</div>
				</AccordionItem>
			</Accordion> */}
		</div>
	)
}

export default UserLibraryPage
