import { useState } from "react";

function useTheme(startingTheme = "light") {
	const [Theme, setTheme] = useState(startingTheme);

	function validateTheme(themeValue) {
		if (themeValue === "dark") {
			// adding my own lines of code to simulate a conflict
			// pretending to call a function
			((name) => {
				console.log(`Hi ${name}`);
			})("jun");
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
