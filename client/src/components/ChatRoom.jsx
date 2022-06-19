import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import MyContext from "../ContextWrapper";
import Navbar from "./Navbar";
import Message from "./Message";
import { v4 } from "uuid";
import InputPanel from "./InputPanel";

export default function ChatRoom() {
    const { roomId } = useParams();
    const context = useContext(MyContext);
    context.roomId = roomId;
    const [messagesState, setMessagesState] = useState([]);

    context.socket.emit("join", roomId);
    context.socket.off("receiveMessage");
    context.socket.once("receiveMessage", async (message) => {
        if (message.image) message.image = await toBase64(message.image); // convert img file to base64 so it can be used as src on image element
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
                    <div className="messages customScrollbar">
                        {messagesState.map((item) => {
                            return <Message key={v4()} messageData={item} />;
                        })}
                    </div>
                </div>
                <InputPanel />
            </div>
        </>
    );
}

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(new Blob([file]));
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
