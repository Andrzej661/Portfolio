import clsx from "clsx"

interface Props extends React.PropsWithChildren {
	className?: string
	isActive?: boolean
	onClick?: () => void
}

const Cell: React.FC<Props> = ({
	onClick,
	children,
	className,
	isActive = false
}) => {
	return (
		<div
			onClick={!isActive ? onClick : undefined}
			className={clsx(
				"flex h-10 select-none items-center justify-center border-b border-r transition-colors",
				{
					"cursor-pointer hover:bg-primary-50 active:text-primary":
						!isActive && onClick,
					"bg-primary-100 font-bold text-primary": isActive
				},
				className
			)}>
			{children}
		</div>
	)
}

export default Cell
