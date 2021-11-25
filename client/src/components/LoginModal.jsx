import React, { useRef } from "react";

export default function LoginModal({ setUsername }) {
    const inputRef = useRef(null);
    const setUsernameHandler = (e) => {
        e.preventDefault();
        setUsername(inputRef.current.value);
    };

    return (
        <div className="loginModal">
            <div className="container">
                <h1>Enter your username</h1>

                <form onSubmit={setUsernameHandler}>
                    <input
                        ref={inputRef}
                        type="text"
                        className="zoom-input"
                        defaultValue={localStorage.getItem("username") || ""}
                    />
                    <button type="submit" className="zoom-button">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                </form>
            </div>
        </div>
    );
}
