import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import MyContext from "../ContextWrapper";
import Navbar from "./Navbar";
import Message from "./Message";
import { v4 } from "uuid";

export default function ChatRoom() {
    const { roomId } = useParams();
    const context = useContext(MyContext);
    context.roomId = roomId;
    const inputRef = useRef(null);
    const [messagesState, setMessagesState] = useState([]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (inputRef.current.value.length < 1) return;
        let message = {
            author: context.usernameState,
            authorId: context.socket.id,
            content: inputRef.current.value,
            time: new Date().getTime(),
        };
        inputRef.current.value = "";
        context.socket.emit(`sendMessage`, { roomId, message });
    };

    context.socket.emit("join", roomId);
    context.socket.off("receiveMessage");
    context.socket.once("receiveMessage", (message) => {
        setMessagesState([message, ...messagesState]);
    });

    useEffect(() => {
        if (
            context.usernameState.length < 1 ||
            context.usernameState === "guest"
        ) {
            context.setLoginModalState(true);
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="chatRoom">
                <div className="container">
                    <div className="messages">
                        {messagesState.map((item) => {
                            return <Message key={v4()} messageData={item} />;
                        })}
                    </div>
                </div>
                <form className="inputPanel" onSubmit={submitHandler}>
                    <input
                        type="text"
                        placeholder="Type here..."
                        ref={inputRef}
                    />
                    <button type="submit">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                </form>
            </div>
        </>
    );
}
