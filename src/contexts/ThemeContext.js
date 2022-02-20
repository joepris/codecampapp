import React, { createContext } from "react";
import useTheme from "../hooks/useTheme";

export const themeContext = createContext();

function ThemeProvider({ children, startingTheme }) {
	const { Theme, setTheme } = useTheme(startingTheme);
	return (
		<themeContext.Provider value={{ setTheme, Theme }}>
			{children}
		</themeContext.Provider>
	);
}

export { ThemeProvider };
