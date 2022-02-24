import { useContext } from "react";
import { SpeakerContext } from "../contexts/SpeakerContext";

function SpeakerDelete(){
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
export default SpeakerDelete;