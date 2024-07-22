import React from "react"
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react"
import ProjectTools from "./ProjectTools"
import { useNavigate } from "react-router-dom"
interface ProjectProps {
	projectName: string
	projectId: number
	projectThumbnailUrl: string
	projectStatus: string
	projectDate: string
	onDelete: () => void
}

const Project: React.FC<ProjectProps> = ({
	projectName,
	projectId,
	projectThumbnailUrl,
	projectStatus,
	projectDate,
	onDelete
}) => {
	const navigate = useNavigate()
	return (
		<Card
			shadow="sm"
			isHoverable
			className="min-w-64 max-w-64 cursor-pointer py-4">
			<CardBody
				onClick={() => {
					navigate(`../email-templates/${projectId.toString()}`)
					// setActivate(true)
				}}
				className="overflow-visible pt-0">
				<Image
					isZoomed
					alt={projectName}
					className="max-h-[300px] min-h-[300px] rounded-xl object-cover"
					src={projectThumbnailUrl}
					width={270}
				/>
			</CardBody>
			<CardHeader className="flex-col items-start px-4 pb-0 pt-2">
				<div className="mb-2 break-words text-large font-bold">
					{projectName}
				</div>
				<div className="text-tiny font-bold ">
					Status: <div className="inline uppercase">{projectStatus}</div>
				</div>

				<small className="mb-2 text-default-500">
					Sending at: {projectDate}
				</small>
				<ProjectTools id={projectId} onDelete={onDelete} />
			</CardHeader>
		</Card>
	)
}
export default Project
