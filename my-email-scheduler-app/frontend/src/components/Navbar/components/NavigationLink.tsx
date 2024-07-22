import React, { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"

interface NavigationLinkProps {
	to: string
	children: React.ReactNode
	className?: string
	onClick?: () => void
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
	to,
	children,
	onClick
}) => {
	const location = useLocation()
	const activeClass = "text-primary font-semibold" // Adjust as needed
	const inactiveClass = "text-current"
	const isLinkActive = (): boolean => {
		if (to === "/" && /^\/email-templates\/\d+$/.test(location.pathname)) {
			return true
		}

		return false
	}

	return (
		<NavLink
			to={to}
			onClick={onClick}
			className={({ isActive }) =>
				isActive || isLinkActive() ? activeClass : inactiveClass
			}>
			{children}
		</NavLink>
	)
}

export default NavigationLink
