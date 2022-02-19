import SpeakersList from '../components/SpeakersList'
import SpeakersToolbar from '../components/SpeakersToolbar'
import {useState} from 'react';

function Speakers({data, theme, setTheme}) {
    const [showSession, setshowSessions] = useState(true);
    return(
        <>
            <SpeakersToolbar theme={theme} setTheme={setTheme} showSession={showSession} setshowSessions={setshowSessions}/>
            <SpeakersList data={data} setshowSessions={setshowSessions}/> 
        </>
    ); 
}
export default Speakers;