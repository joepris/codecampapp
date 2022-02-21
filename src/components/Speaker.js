import { useState } from "react";
import { themeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";

function Session(props) {
	const { title, room } = props;
	return (
		<span className="session w-100">
			{title}
			{""} <strong>Room: {room}</strong>
		</span>
	);
}

function Sessions({ sessions }) {
	return (
		<div className="sessionBox card h-250">
			<Session title={sessions[0].title} room={sessions[0].room.name} />
		</div>
	);
}

function SpeakerImage({ id, first, last }) {
	return (
		<div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
			<img
				className="contain-fit"
				src={`/images/speaker-${id}.jpg`}
				width="300"
				alt={`${first} ${last}`}
			/>
		</div>
	);
}

function SpeakerFavorite({ favorite, onFavoriteToggle, id, first, last }) {
	const [inTransition, setTransition] = useState(false);
	function doneCallBack() {
		setTransition(false);
		console.log(
			`In SpeakerFavorite:doneCallBack   ${new Date().getMilliseconds()}`
		);
	}

	return (
		<div className="action padB1">
			<span
				onClick={function () {
					setTransition(true);
					return onFavoriteToggle(doneCallBack);
				}}
			>
				<i
					className={
						favorite === true ? "fa fa-star orange" : "fa fa-star-o orange"
					}
				/>{" "}
				Favorite{" "}
				{inTransition === true ? (
					<div>
						<span className="fas fa-circle-notch fa-spin"></span> What is that??
						--{">   "}
						<div className="speaker-img fas fa-spin">
							<img
								className="contain-fit"
								src={`/images/speaker-${id}.jpg`}
								width="20"
								alt={`${first} ${last}`}
							/>
						</div>
					</div>
				) : null}
			</span>
		</div>
	);
}

function SpeakerDemographics({
	id,
	first,
	last,
	bio,
	company,
	twitterHandle,
	favorite,
	onFavoriteToggle,
}) {
	const { Theme } = useContext(themeContext);
	return (
		<div className="speaker-info">
			<div className="d-flex justify-content-between mb-3">
				<h3 className="text-truncate w-200">
					{first} {last}
				</h3>
			</div>
			<SpeakerFavorite
				favorite={favorite}
				onFavoriteToggle={onFavoriteToggle}
				id={id}
				first={first}
				last={last}
			/>
			<div className={Theme === "light" ? "" : "text-info"}>
				<p className="card-description">{bio}</p>
				<div className="social d-flex flex-rown mt-4">
					<div className="company">
						<h5>Company</h5>
						<h6>{company}</h6>
					</div>
					<div className="twitter">
						<h5>Twitter</h5>
						<h6>{twitterHandle}</h6>
					</div>
				</div>
			</div>
		</div>
	);
}
function Speaker({ speaker, onFavoriteToggle }) {
	const { id, first, last, sessions } = speaker;
	const { showSessions } = useContext(SpeakerFilterContext);
	// const { Theme } = useContext(themeContext);
	return (
		<div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
			<div className="card card-height p-4 mt-4">
				{/* <div className={Theme === "light" ? "" : "text-info"}> */}
				<SpeakerImage id={id} first={first} last={last} />
				<SpeakerDemographics {...speaker} onFavoriteToggle={onFavoriteToggle} />
				{/* </div> */}
			</div>
			{showSessions === true ? <Sessions sessions={sessions} /> : null}
		</div>
	);
}

export default Speaker;
