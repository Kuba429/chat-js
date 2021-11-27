import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router";
import MyContext from "../ContextWrapper";
import Message from "./Message";
import { v4 } from "uuid";

export default function ChatRoom() {
    const { roomId } = useParams();
    const context = useContext(MyContext);
    const inputRef = useRef(null);
    const [messagesState, setMessagesState] = useState([
        {
            author: "author",
            content: "lorem ipsum asdasdasd  asd q21e20 8as 89dasd 7awd7",
            time: new Date().getTime(),
        },
    ]);

    const submitHandler = (e) => {
        e.preventDefault();
        let message = {
            author: context.usernameState,
            content: inputRef.current.value,
            time: new Date().getTime(),
        };
        setMessagesState([...messagesState, message]);
        inputRef.current.value = "";
    };

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
