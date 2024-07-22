import MainNavbar from "./components/Navbar/MainNavbar"
import Router from "./pages/router"
import { FileDropProvider } from "./context/FileDropProvider.tsx"
import { LoginProvider } from "./context/LoginContext.tsx"
import Footer from "./components/footer/Footer.tsx"
function App() {
	return (
		// <div className="App mx-auto max-w-screen-3xl flex-1">
		// 	<EmailTemplateEditor />
		// </div>
		<LoginProvider>
			<MainNavbar />
			<div className="mx-auto max-w-screen-3xl">
				<FileDropProvider>
					<Router />
				</FileDropProvider>
			</div>
			<Footer />
		</LoginProvider>
	)
}

export default App
