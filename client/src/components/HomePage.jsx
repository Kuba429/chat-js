import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../ContextWrapper";
export default function HomePage() {
    const usernameInput = useRef(null);
    const roomInput = useRef(null);
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const putUsername = usernameInput.current.value;
        const putRoom = roomInput.current.value;
        if (putRoom.length < 1) alert("'Room' can't be empty");
        putUsername.length > 0 && context.setUsername(putUsername);
        navigate(`/r/${putRoom}`);
    };

    return (
        <div className="homePage">
            <form onSubmit={submitHandler}>
                <input
                    className="zoom-input"
                    type="text"
                    placeholder="Username"
                    defaultValue={
                        context.usernameState != "guest"
                            ? context.usernameState
                            : ""
                    }
                    ref={usernameInput}
                />
                <input
                    className="zoom-input"
                    type="text"
                    placeholder="Room"
                    ref={roomInput}
                />
                <button type="submit" className="button">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>
            </form>
        </div>
    );
}
