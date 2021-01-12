import { useState, createContext } from "react";

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(0);

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, userId, setUserId}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
