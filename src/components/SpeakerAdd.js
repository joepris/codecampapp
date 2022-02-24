import { useState } from "react";

function SpeakerAdd ({eventYear, insertRecord}){
    // const addId = useState("99999");
    // const addIdSession = useState("88888");
    return (
        <a href="#" className="addSes">

            <i onClick={(e)=> {
                e.preventDefault();
                const firstLast = window.prompt("Enter first and last name:", "");
                const firstLastArray = firstLast.split(' ');
                insertRecord ({
                    // id: `${addId}`,
                    id: 99999,
                    first: firstLastArray[0],
                    last: firstLastArray[1], bio: "Bio not entered yet",
                    sessions: [
                        {
                            // id: `${addIdSession}`,
                            id: 88888,
                            title: `'New Session for' ${firstLastArray[0]}`,
                            room: {
                                name: "Main Bell Room"
                            },
                            eventYear,
                        }
                    ]
                })
            }}>
                +
            </i>
        </a>
    )
}
export default SpeakerAdd;