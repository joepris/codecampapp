import Speaker from "./Speaker";
import ReactPlaceHolder from "react-placeholder";
import useRequestDelay, { REQUEST_STATUS } from "../hooks/useRequestDelay";
import { data } from "../SpeakerData";

function SpeakersList() {
	const {
		data: speakerData,
		requestStatus,
		error,
		updateRecord,
	} = useRequestDelay(2000, data);
	if (requestStatus === REQUEST_STATUS.FAILURE) {
		return <div className="text-danger">ERROR: {error}</div>;
	}
	// if (isLoading===true) {
	//     return(
	//         <div>Loading...</div>
	//     );
	// }
	return (
		<div className="container speakers-list">
			<ReactPlaceHolder
				type="media"
				rows={15}
				className="speakerslist-placeholder"
				ready={requestStatus === REQUEST_STATUS.SUCCESS}
			>
				<div className="row">
					{speakerData.map(function (speaker) {
						return (
							<Speaker
								key={speaker.id}
								speaker={speaker}
								// updateRecord = {updateRecord}
								onFavoriteToggle={(doneCallBack) => {
									updateRecord(
										{
											...speaker,
											favorite: !speaker.favorite,
										},
										doneCallBack
									);
								}}
							/>
						);
					})}
				</div>
			</ReactPlaceHolder>
		</div>
	);
}
export default SpeakersList;
