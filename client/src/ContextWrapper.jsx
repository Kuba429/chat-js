import React, { createContext, useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import socket from "./Socket";
const MyContext = createContext();
export function ContextWrapper({ children }) {
    //username stored in local storage
    const lsUsername = localStorage.getItem("username");
    const [usernameState, setUsernameState] = useState(lsUsername || "guest");
    const [loginModalState, setLoginModalState] = useState(false);
    let roomId;

    socket.on("connect_error", (err) => {
        console.log(err);
        // console.log(`connect_error due to ${err.message}`);
    });
    const setUsername = (newUsername) => {
        if (newUsername.length < 1) newUsername = "guest";
        if (newUsername.length > 12) {
            alert("Username must be 12 or under characters");
            return;
        }
        setUsernameState(newUsername);
        localStorage.setItem("username", newUsername);
        setLoginModalState(false);
    };

    return (
        <MyContext.Provider
            value={{ usernameState, setUsername, setLoginModalState, socket }}
        >
            {loginModalState && <LoginModal setUsername={setUsername} />}
            {children}
        </MyContext.Provider>
    );
}

export default MyContext;
