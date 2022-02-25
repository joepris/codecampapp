import { useState } from "react";
import { themeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import { SpeakerProvider, SpeakerContext } from "../contexts/SpeakerContext";
import SpeakerDelete from "./SpeakerDelete";

function Session({ title, room }) {
	console.log(room);
	return (
		<span className="session w-100">
			{title} <strong>Room: {room.name}</strong>
		</span>
	);
}

function Sessions() {
	const { eventYear } = useContext(SpeakerFilterContext);
	const {speaker} = useContext(SpeakerContext);
	const sessions = speaker.sessions;
	return (
		<div className="sessionBox card h-250">
			{sessions
				.filter(function (session) {
					return session.eventYear === eventYear;
				})
				.map(function (session) {
					return (
						<div className="session w-100" key={session.id}>
							<Session {...sessions[0]} />
						</div>
					);
				})}
		</div>
	);
}
//this is for new speakers with no images,
function ImageWithFallback({src, ...props}) {
	// this will indicate if there is an error
	const [error, setError] = useState(false);
	const [imgSrc, setImgSrc] = useState(src);
	// for now let return a standard image tag
	// errors when no image is found and returns dummy image
	function onError(){
		if (!error) {
			setImgSrc("images/speakers-99999.jpg");
			setError(true);
		}
	}
	return <img src = {imgSrc} {...props} onError = {onError}/>
}

function SpeakerImage() {
	const { speaker: {id, first, last}} = useContext (SpeakerContext);
	
	// code above is a shortcut of 
	// const speakerObject = useContext(SpeakerContext);
	// const { speaker } = speakerObject;
	// const { id, first, last } = speaker;

	// ****
	// code above is a shortcute of
	// const speaker = speakerObject.speaker;

	// old method
	// const id = speaker.id;
	// const first = speaker.first;
	// const last = speaker.last;

	// another way to get id, first and last
	// const id = speakerObject.speaker.id;
	// const first = speakerObject.speaker.first;
	// const last = speakerObject.speaker.last;

	return (
		<div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
			{/* chagne img to ImageWithFallback as it is for the new speakers*/}
			<ImageWithFallback
				className="contain-fit"
				src={`/images/speaker-${id}.jpg`}
				width="300"
				alt={`${first} ${last}`}
			/>
		</div>
	);
}

function SpeakerFavorite() {
	const {speaker, updateRecord} = useContext(SpeakerContext);
	const [inTransition, setTransition] = useState(false);
	const {id, first, last} = speaker;
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
					updateRecord(
						{
							...speaker, favorite: !speaker.favorite,
						},
						doneCallBack
					);
				}}
			>
				<i
					className={
						speaker.favorite === true
							? "fa fa-star orange" : "fa fa-star-o orange"
					}
				/>{" "}
				Favorite{" "}
				{inTransition === true ? (
					<div>
						<span className="fas fa-circle-notch fa-spin"></span> What is that??
						--{">   "}
						<div className="speaker-img fas fa-spin">
							<ImageWithFallback
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

function SpeakerDemographics({speaker, updateRecord}) {
	const { id, first, last, bio, company, twitterHandle, favorite } = speaker;
	return (
		<div className="speaker-info">
			<div className="d-flex justify-content-between mb-3">
				<h3 className="text-truncate w-200">
					{first} {last}
				</h3>
			</div>
			<SpeakerFavorite speaker={speaker} updateRecord={updateRecord}/>
			<div>
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
function Speaker({ speaker, updateRecord, insertRecord, deleteRecord }) {
	const { id, first, last, sessions } = speaker;
	const { showSessions } = useContext(SpeakerFilterContext);
	// const { Theme } = useContext(themeContext);
	return (
		<SpeakerProvider
			speaker={speaker}
			updateRecord={updateRecord}
			insertRecord={insertRecord}
			deleteRecord={deleteRecord}
		>
			<div
				key={id}
				className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12"
			>
				<div className="card card-height p-4 mt-4">
					<SpeakerImage speaker={speaker} />
					<SpeakerDemographics speaker={speaker} updateRecord={updateRecord}/>
				</div>
				{showSessions === true ? <Sessions speaker={speaker} /> : null}
				<SpeakerDelete />
			</div>
		</SpeakerProvider>
	);
}

export default Speaker;
