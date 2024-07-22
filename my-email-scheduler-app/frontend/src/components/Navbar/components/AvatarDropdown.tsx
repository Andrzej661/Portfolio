import {
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar
} from "@nextui-org/react"
import { useContext } from "react"
import { LoginContext } from "../../../context/LoginContext"
interface AvatarDropdownProps {
	onSignOut: () => void // Defines a logout function that doesn't take any arguments and doesn't return anything
}
const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ onSignOut }) => {
	let { userEmail } = useContext(LoginContext)

	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger>
				<Avatar
					isBordered
					as="button"
					className="transition-transform"
					color="primary"
					name={userEmail}
					size="sm"
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label="Profile Actions" variant="flat">
				<DropdownItem key="profile" className="h-14 gap-2">
					<p className="font-semibold">Signed in as</p>
					<p className="font-semibold">{userEmail}</p>
				</DropdownItem>
				{/* <DropdownItem key="settings">My Settings</DropdownItem> */}
				{/* <DropdownItem key="team_settings">Team Settings</DropdownItem> */}
				{/* <DropdownItem key="analytics">Analytics</DropdownItem> */}
				{/* <DropdownItem key="system">System</DropdownItem> */}
				{/* <DropdownItem key="configurations">Configurations</DropdownItem> */}
				{/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
				<DropdownItem
					key="logout"
					className="text-red-400 hover:text-red-500"
					onPress={onSignOut}>
					Log Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	)
}
export default AvatarDropdown
