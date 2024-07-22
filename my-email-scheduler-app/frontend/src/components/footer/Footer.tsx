import React from "react"
import { Logo } from "../icons"
import { useNavigate } from "react-router-dom"
const Footer = () => {
	const navigate = useNavigate()
	return (
		<div className="flex  flex-col items-center pt-2 ">
			<div className="w-full max-w-screen-3xl border-b-1 border-default-100 p-1">
				<Logo
					className="mx-auto cursor-pointer text-primary"
					onClick={() => navigate("")}
				/>
			</div>
			<div className="grid w-full max-w-screen-md place-items-center gap-2 pb-0 pt-4   sm:grid-cols-3 sm:justify-items-center  ">
				<div
					className="w-fit text-center
sm:text-left">
					<div
						onClick={() => navigate("")}
						className="cursor-pointer border-b-1 border-primary-400 py-1 text-default-600 hover:border-primary-100 hover:text-default-500 sm:w-fit">
						New Email
					</div>
					<div
						onClick={() => navigate("library")}
						className=" cursor-pointer border-b-1 border-primary-400 py-1 text-default-600 hover:border-primary-100 hover:text-default-500 sm:w-fit">
						Library
					</div>
					<div
						onClick={() => navigate("credits")}
						className=" cursor-pointer border-b-1 border-primary-400 py-1 text-default-600 hover:border-primary-100 hover:text-default-500 sm:w-fit">
						Credits
					</div>
				</div>
				<div
					className="w-fit text-center
sm:text-left">
					<div
						onClick={() => navigate("credits")}
						className="cursor-pointer border-b-1 border-primary py-1 text-default-600 hover:border-primary-100 hover:text-default-500 sm:w-fit ">
						Contact developer
					</div>
					<div
						onClick={() => navigate("credits")}
						className="cursor-pointer border-b-1 border-primary-400 py-1 text-default-600 hover:border-primary-100 hover:text-default-500 sm:w-fit">
						Report a bug
					</div>
				</div>
				<div
					className="w-fit text-center
sm:text-left">
					<div
						onClick={() => navigate("credits")}
						className="cursor-pointer border-b-1 border-primary-400 py-1 text-default-600 hover:border-primary-100 hover:text-default-500 sm:w-fit">
						Customer support
					</div>
					<div
						onClick={() => navigate("credits")}
						className="cursor-pointer border-b-1 border-primary-400 py-1 text-default-600 hover:border-primary-100 hover:text-default-500 sm:w-fit">
						Policy and rights
					</div>
				</div>
			</div>
			<div className="mt-8 w-full bg-gray-100 text-center text-black">
				Andrzej Suchecki @2024
			</div>
		</div>
	)
}
export default Footer
