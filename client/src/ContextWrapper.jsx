import React, { createContext, useState } from "react";
import LoginModal from "./components/LoginModal";

const MyContext = createContext();
export function ContextWrapper({ children }) {
    const [usernameState, setUsernameState] = useState("guest");
    const [loginModalState, setLoginModalState] = useState(true);
    const setUsername = (newUsername) => {
        setUsernameState(newUsername);
        setLoginModalState(false);
    };
    return (
        <MyContext.Provider value={{ usernameState, setUsernameState }}>
            {loginModalState && <LoginModal setUsername={setUsername}/>}
            {children}
        </MyContext.Provider>
    );
}

export default MyContext;
