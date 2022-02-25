// installed AXIOS to call REST server npm install axios
// copy of useRequestDelay 
import { useState, useEffect } from "react";
// import it for the REST calls
import axios from "axios";

export const REQUEST_STATUS = {
	LOADING: "loading",
	SUCCESS: "success",
	FAILURE: "failure",
};

const restURL = "api/speakers";
// update functions from useRequestDelay to useRequestRest
function useRequestRest() {
	const [data, setData] = useState([]);
	const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
	const [error, setError] = useState("");

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// useEffect runs after component renders
	useEffect(() => {
		//instead of delay, use REST get call using axios
		async function delayFunc() {
			try {
				const result = await axios.get(restURL);
				setRequestStatus(REQUEST_STATUS.SUCCESS);
				console.log(result);
				// setData(result.data);
			} catch (e) {
				setRequestStatus(REQUEST_STATUS.FAILURE),
				setError(e)
			}
		}
		delayFunc();
	}, []);

	function updateRecord(record, doneCallBack) {
		console.log();
		const originalRecord = [...data];
		const newRecord = data.map(function(rec) {
			return rec.id === record.id ? record : rec;
			});

		async function delayFunction() {
			try {
				setData(newRecord);
				await axios.put(`${restURL}/${record.id}`, record);
				if (doneCallBack) {
					doneCallBack();
				}
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
	
	function deleteRecord(record, doneCallBack) {
		console.log();
		const originalRecord = [...data];
		const newRecord = data.filter(function(rec) {
		return rec.id !== record.id;
		});

		async function delayFunction() {
			try {
				setData(newRecord);
				await axios.delete(`${restURL}/${record.id}`, record);
				if (doneCallBack) {
					doneCallBack();
				}
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

	function insertRecord(record, doneCallBack) {
		console.log();
		const originalRecord = [...data];
		const newRecord = [record, ...data];

		async function delayFunction() {
			try {
				setData(newRecord);
				await axios.post(`${restURL}/99999`, record);
				if (doneCallBack) {
					doneCallBack();
				}
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
		insertRecord,
		deleteRecord,
	};
}

export default useRequestRest;
