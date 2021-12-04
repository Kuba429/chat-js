import React, { useContext, useEffect, useState } from "react";
import MyContext from "../ContextWrapper";
export default function Navbar() {
    const [onlineCount, setOnlineCount] = useState(0);
    const context = useContext(MyContext);
    const changeUsernameHandler = () => {
        context.setLoginModalState(true);
    };
    const checkOnlineHandler = () => {
        context.socket.emit("checkOnline", context.roomId);
    };
    context.socket.on("onlineStatus", (data) => {
        setOnlineCount(data);
    });

    useEffect(() => {
        checkOnlineHandler();
    }, []);
    return (
        <nav id="navbar">
            <span className="username" onClick={changeUsernameHandler}>
                {context.usernameState}
            </span>
            <span className="onlineUsers" onClick={checkOnlineHandler}>
                Online: <span>{onlineCount || "0"}</span>
            </span>
        </nav>
    );
}
