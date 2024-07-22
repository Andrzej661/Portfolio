import { useState } from "react"
import {
	Listbox,
	ListboxItem,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Button
} from "@nextui-org/react"
// import { LibraryDeleteProject } from '../../api/LibraryDeleteProject';

interface ProjectToolsProps {
	id: number
	onDelete: () => void
}

const ProjectTools: React.FC<ProjectToolsProps> = ({ id, onDelete }) => {
	const items = [
		// Uncomment or add other items as needed
		// {
		//   key: 'edit',
		//   label: 'Edit project',
		// },
		{
			key: "delete",
			label: "Delete project"
		}
	]

	async function handleDelete(itemKey: string) {
		if (itemKey === "delete") {
			try {
				// await LibraryDeleteProject(id); // Assume this function properly deletes the project
				console.log("Project deleted successfully")
				onDelete() // Call the onDelete callback
			} catch (error) {
				console.error("Failed to delete project", error)
			}
		}
	}

	// Using a useState hook to manage click effect feedback (optional)
	const [clickedItem, setClickedItem] = useState("")

	return (
		<Popover placement="bottom" showArrow={true}>
			<PopoverTrigger>
				<Button
					color={"primary"}
					className="mx-auto h-6 w-full tracking-widest">
					...
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Listbox aria-label="Dynamic Actions">
					{items.map(item => (
						<ListboxItem
							key={item.key}
							color={item.key === "delete" ? "danger" : "default"}>
							<div
								onClick={() => {
									handleDelete(item.key)
									setClickedItem(item.key) // For click effect feedback
								}}
								className={`cursor-pointer  ${
									item.key === clickedItem
										? "bg-red-500  text-white"
										: "bg-white text-black "
								} duration-50  rounded-md transition ease-in-out hover:bg-red-500 hover:text-white`}>
								{item.label}
							</div>
						</ListboxItem>
					))}
				</Listbox>
			</PopoverContent>
		</Popover>
	)
}

export default ProjectTools
