import React, { createContext, useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";

const MyContext = createContext();
export function ContextWrapper({ children }) {
    //username stored in local storage
    const lsUsername = localStorage.getItem("username");
    const [usernameState, setUsernameState] = useState(lsUsername || "guest");
    const [loginModalState, setLoginModalState] = useState(!lsUsername);

    const setUsername = (newUsername) => {
        if (newUsername.length < 1) newUsername = "guest";
        setUsernameState(newUsername);
        localStorage.setItem("username", newUsername);
        setLoginModalState(false);
    };
     

    return (
        <MyContext.Provider value={{ usernameState,setUsername,setLoginModalState }}>
            {loginModalState && <LoginModal setUsername={setUsername} />}
            {children}
        </MyContext.Provider>
    );
}

export default MyContext;
