import SpeakersList from "../components/SpeakersList";
import SpeakersToolbar from "../components/SpeakersToolbar";
import { useState } from "react";

function Speakers() {
	const [showSession, setshowSessions] = useState(true);
	return (
		<>
			<SpeakersToolbar
				showSession={showSession}
				setshowSessions={setshowSessions}
			/>
			<SpeakersList setshowSessions={setshowSessions} />
		</>
	);
}
export default Speakers;
