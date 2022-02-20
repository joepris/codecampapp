import { useState } from "react";

function useTheme(startingTheme = "light") {
	const [Theme, setTheme] = useState(startingTheme);

	function validateTheme(themeValue) {
		if (themeValue === "dark") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}

	return {
		Theme,
		setTheme: validateTheme,
	};
}
export default useTheme;
