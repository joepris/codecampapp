import { useContext } from "react";
import { SpeakerContext } from "../contexts/SpeakerContext";
import withAuth from "./withAuth";

function SpeakerDelete({loggedInUser}){
    // if no login, there is no delete function

    if (!loggedInUser || loggedInUser.length === 0 ) return null;
    
    const {speaker, deleteRecord} = useContext(SpeakerContext)
    return(
        <span className="session w-10" onClick={(e) => {
            e.preventDefault();
            if (
                window.confirm("Are you sure you want to delete this speaker?")
             ) {
            deleteRecord(speaker);
             }
        }}>
            <a href="#" className="remSes" >
                <i >
                    -
                </i>
            </a><span className="padL2">Delete</span>
        </span>
    )
}
export default withAuth(SpeakerDelete);