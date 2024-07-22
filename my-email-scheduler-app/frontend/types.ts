import { SVGProps } from "react"

interface CollectedEmailData {
	emailTemplate: {
		id: number
		projectName: string
		htmlContent: string
		dateToBeSendAt: Date
		emailTitle: string
	}
}
interface UpdatedEmailData {
	updatedEmailTemplate: {
		projectName: string
		htmlContent: string
		dateToBeSendAt: Date
		emailTitle: string
	}
}
interface EmailTemplateProject {
	id: number
	projectName: string
	dateToBeSendAt: Date
	projectThumbnailUrl: string
	updatedAt: Date
	emailTitle: string
}

interface LibraryOfEmailTemplateProjects {
	EmailProjects: EmailTemplateProject[]
}
type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
}
export type {
	CollectedEmailData,
	IconSvgProps,
	UpdatedEmailData,
	EmailTemplateProject,
	LibraryOfEmailTemplateProjects
}
