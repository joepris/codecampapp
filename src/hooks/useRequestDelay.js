import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
	LOADING: "loading",
	SUCCESS: "success",
	FAILURE: "failure",
};

function useRequestDelay(delayTime = 1000, initialData = []) {
	const [data, setData] = useState(initialData);
	const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
	const [error, setError] = useState("");

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	useEffect(() => {
		async function delayFunc() {
			try {
				await delay(delayTime);
				//throw "test."
				setRequestStatus(REQUEST_STATUS.SUCCESS);
				setData(data);
			} catch (e) {
				setRequestStatus(REQUEST_STATUS.FAILURE);
				setHasErrored(true);
				setError(e);
			}
		}
		delayFunc();
	});
	// function onFavoriteToggle(id) {
	// 	const speakerRecPrevious = speakerData.find(function (rec) {
	// 		return rec.id === id;
	// 	});
	// 	const speakerRecUpdated = {
	// 		...speakerRecPrevious,
	// 		favorite: !speakerRecPrevious.favorite,
	// 	};
	// 	const speakerDataNew = speakerData.map(function (rec) {
	// 		return rec.id === id ? speakerRecUpdated : rec;
	// 	});
	// 	setSpeakerData(speakerDataNew);
	// }
	function updateRecord(recordUpdated, doneCallBack) {
		console.log();
		const originalRecord = [...data];
		const newRecord = data.map(function (rec) {
			return rec.id === recordUpdated.id ? recordUpdated : rec;
		});

		async function delayFunction() {
			try {
				await delay(delayTime);
				if (doneCallBack) {
					doneCallBack();
				}
				setData(newRecord);
			} catch (error) {
				console.log("error thrown inside delayFunction", error);
				if (doneCallBack) {
					doneCallBack();
				}
				setData(originalRecord);
			}
		}
		delayFunction();
	}
	return {
		data,
		requestStatus,
		error,
		updateRecord,
	};
}

export default useRequestDelay;
