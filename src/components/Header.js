import { themeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

function Header() {
	const { Theme } = useContext(themeContext);

	return (
		<div className="padT4 padB4">
			<div className="container mobile-container">
				<div className="d-flex justify-content-between">
					<div>
						<img alt="SVCC Home Page" src="/images/SVCCLogo.png" />
					</div>
					<div className={Theme === "light" ? "" : "text-info"}>
						<h4 className="header-title">Silicon Valley Code Camp</h4>
					</div>
					<div className={Theme === "light" ? "" : "text-info"}>
						Yo Waddup boy! Try the favorite &nbsp;
						<span>
							<a href="#">sign-out</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Header;
