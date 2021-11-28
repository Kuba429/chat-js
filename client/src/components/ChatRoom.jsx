import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import MyContext from "../ContextWrapper";
import Message from "./Message";
import { v4 } from "uuid";

export default function ChatRoom() {
    const { roomId } = useParams();
    const context = useContext(MyContext);
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

    context.socket.emit(`join`, roomId);
    context.socket.off('receiveMessage')
    context.socket.once("receiveMessage", (message) => {
        console.log("receiveMessage");
        setMessagesState([...messagesState, message]);
    });

    return (
        <div className="chatRoom">
            <div className="container">
                <div className="messages">
                    {messagesState.map((item) => {
                        return <Message key={v4()} messageData={item} />;
                    })}
                </div>
            </div>
            <form className="inputPanel" onSubmit={submitHandler}>
                <input type="text" ref={inputRef} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
