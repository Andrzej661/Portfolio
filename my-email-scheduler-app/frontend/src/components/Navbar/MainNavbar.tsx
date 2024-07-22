import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem
} from "@nextui-org/react"
import { link as linkStyles } from "@nextui-org/theme"

import NavigationLink from "./components/NavigationLink"
import { siteConfig } from "../../config/site"
import clsx from "clsx"
import { ThemeSwitch } from "./components/theme-switch"
import LoginButton from "./components/LoginButton"
import { Logo } from "../icons"
import { Link } from "react-router-dom"
import { useState } from "react"

const MainNavbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const handleNavlinkClick = (state: boolean) => {
		setIsMenuOpen(state)
	}
	return (
		<NextUINavbar
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			position="static"
			maxWidth="full"
			className="mx-auto flex max-w-[1548px] px-0">
			<NavbarContent
				className=" max-w-fit basis-1/5 sm:basis-full"
				justify="start">
				<NavbarBrand className="">
					<Link
						className="flex items-center justify-start gap-1 text-primary"
						to="/">
						<Logo />
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden  lg:flex">
				<div className="flex w-full  justify-center gap-8">
					{siteConfig.navItems.map(item => (
						<NavbarItem key={item.href}>
							<NavigationLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:font-medium, data-[active=true]:text-primary"
								)}
								to={item.href}>
								{item.label}
							</NavigationLink>
						</NavbarItem>
					))}
				</div>
				<ThemeSwitch />
				<LoginButton />
			</NavbarContent>

			<NavbarContent className="basis-1 pl-4 lg:hidden" justify="end">
				<ThemeSwitch />
				<LoginButton />
				<NavbarMenuToggle onClick={() => handleNavlinkClick(isMenuOpen)} />
			</NavbarContent>
			{isMenuOpen && (
				<NavbarMenu>
					<div className="mx-4  mt-2 flex flex-col items-center justify-center gap-10">
						{siteConfig.navMenuItems.map((item, index) => (
							<NavbarMenuItem key={`${item}-${index}`}>
								<NavigationLink
									to={item.href}
									onClick={() => handleNavlinkClick(false)}>
									{item.label}
								</NavigationLink>
							</NavbarMenuItem>
						))}
					</div>
				</NavbarMenu>
			)}
			{/* <NavbarMenu>
				<div className="mx-4  mt-2 flex flex-col items-center justify-center gap-10">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<NavigationLink to={item.href}>{item.label}</NavigationLink>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu> */}
		</NextUINavbar>
	)
}
export default MainNavbar
