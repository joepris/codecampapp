import { useContext } from "react";
import { ThemeProvider, themeContext } from "../contexts/ThemeContext";

function Layout({ startingTheme, children }) {
	return (
		<ThemeProvider startingTheme={startingTheme}>
			<LayoutNoThemeProvider>{children}</LayoutNoThemeProvider>
		</ThemeProvider>
	);
}
function LayoutNoThemeProvider({ startingTheme, children }) {
	const { Theme } = useContext(themeContext);

	return (
		<div
			className={
				Theme === "light" ? "container-fluid light" : "container-fluid dark"
			}
		>
			{children}
		</div>
	);
}

export default Layout;
