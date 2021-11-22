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
                    <input ref={inputRef} type="text" className="zoom-input" />
                    <button type="submit" className="zoom-button">
                        Go
                    </button>
                </form>
            </div>
        </div>
    );
}
