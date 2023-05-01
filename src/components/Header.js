import { themeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import withAuth from "./withAuth";

function Header({loggedInUser, setLoggedInUser}) {
	const { Theme } = useContext(themeContext);

//log in function
function LoggedIn ({loggedInUser, setLoggedInUser}){
	return(
		<div>
			<span>Logged in as {loggedInUser}  </span>
			<button className="btn btn-secondary"
			onClick={()=>{
				setLoggedInUser("");
			}}>
				Logout
			</button>
		</div>
	);
}

function NotLoggedIn ({loggedInUser, setLoggedInUser}) {
	return(
		<button className="btn btn-secondary"
		onClick={(e)=>{
			e.preventDefault();
			const username = window.prompt("enter login name:", "");
			setLoggedInUser(username);
		}}>Login</button>
	);
}


	return (
		<div className="padT4 padB4">
			<div className="container mobile-container">
				<div className="d-flex justify-content-between">
					<div>
						<img alt="SVCC Home Page" src="/images/SVCCLogo.png" />
					</div>
					<div className={Theme === "light" ? "" : "text-info"}>
						<h4 className="header-title">Silicon Valley Code Camp</h4>
					</div>
					<div className={Theme === "light" ? "" : "text-info"}>
						{loggedInUser && loggedInUser.length > 0 ?
						<LoggedIn loggedInUser={loggedInUser} setLoggedInUser = {setLoggedInUser} /> :
						<NotLoggedIn loggedInUser={loggedInUser} setLoggedInUser = {setLoggedInUser} /> 
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default withAuth(Header);

//what is &&?