import { routerType } from "../types/router.types"
import CreditsPage from "./pages/CreditsPage"
import EmailTemplateEditorPage from "./pages/EmailTemplateEditorPage"
import UserLibraryPage from "./pages/UserLibraryPage"

const pagesData: routerType[] = [
	{
		path: "",
		element: <EmailTemplateEditorPage />,
		title: "Email editor"
	},
	{
		path: "email-templates/:id", // Adding dynamic route for handling individual template IDs
		element: <EmailTemplateEditorPage />,
		title: "Email Template Editor"
	},
	{
		path: "library",
		element: <UserLibraryPage />,
		title: "Library"
	},
	{
		path: "credits",
		element: <CreditsPage />, //tba
		title: "Credits"
	}
]

export default pagesData
