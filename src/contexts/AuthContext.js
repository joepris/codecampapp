import react, {createContext, useState} from "react";

export const AuthContext = createContext();

function AuthProvider({children, initialLoginUser}){
    const [loggedInUser, setLoggedInUser] = useState(initialLoginUser);
    return (
        <AuthContext.Provider value={
            {loggedInUser, setLoggedInUser}
        }>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthProvider};