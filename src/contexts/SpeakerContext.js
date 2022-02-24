import {createContext} from "react";

const speakerContext = createContext();

function speakerProvider({
	children,
	speaker,
	updateRecord,
	insertRecord,
	deleteRecord
}) {
	return (
		<speakerContext.Provider
			value={speaker, updateRecord, insertRecord, deleteRecord}
		>
			{children}
		</speakerContext.Provider>
	);
}

export {speakerContext, speakerProvider};
