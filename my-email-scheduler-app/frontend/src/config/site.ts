export type SiteConfig = typeof siteConfig

export const siteConfig = {
	name: "EmailProgram",
	description: "Send things",
	navItems: [
		{
			label: "New Email",
			href: "/"
		},
		{
			label: "Library",
			href: "/library"
		},
		{
			label: "Credits",
			href: "/credits"
		}
	],
	navMenuItems: [
		{
			label: "New Email",
			href: "/"
		},
		{
			label: "Library",
			href: "/library"
		},
		{
			label: "Credits",
			href: "/credits"
		}
	]
}
