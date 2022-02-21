import { themeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";

function SpeakersToolbar() {
	const { Theme, setTheme } = useContext(themeContext);
	const { showSessions, setshowSessions } = useContext(SpeakerFilterContext);

	return (
		<section className="toolbar dark-theme-header">
			<div className="container">
				<div className="justify-content-between">
					<ul className="toolrow d-flex flex-column flex-lg-row">
						<li className="d-flex flex-column flex-md-row">
							<b>Show Sessions&nbsp;&nbsp;</b>
							<label className="fav">
								<input
									type="checkbox"
									checked={showSessions}
									onChange={(event) => {
										setshowSessions(event.target.checked);
									}}
								/>
								<span className="switch"></span>
							</label>
						</li>
						<li className="d-flex flex-column flex-md-row ml-sm-5 ml-0">
							<strong>Theme</strong>
							<label className="dropdown">
								<select
									className="form-control theme"
									value={Theme}
									onChange={(event) => {
										setTheme(event.target.value);
									}}
								>
									<option
										className={Theme === "light" ? "" : "text-info"}
										value="light"
									>
										Light
									</option>
									<option
										className={Theme === "light" ? "" : "text-info"}
										value="dark"
									>
										Dark
									</option>
								</select>
							</label>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
export default SpeakersToolbar;
