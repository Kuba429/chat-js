import React, { useContext, useEffect } from "react";
import MyContext from "../ContextWrapper";

export default function Navbar() {
    const context = useContext(MyContext);
    const changeUsernameHandler = () => {
        context.setLoginModalState(true);
    };
    return (
        <nav id="navbar">
            <span className="username" onClick={changeUsernameHandler}>
                {context.usernameState}
            </span>
        </nav>
    );
}
