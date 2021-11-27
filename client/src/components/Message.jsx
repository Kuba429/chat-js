import React, { useContext } from "react";
import MyContext from "../ContextWrapper";

export default function Message({ messageData }) {
    const { socket } = useContext(MyContext);
    const isOwn = socket.id === messageData.authorId;
    const date = new Date(messageData.time);
    const processedTime = `${date.getHours()}:${date.getMinutes()}`;

    return (
        <div className={`message  ${isOwn ? "own" : ""}`}>
            <div className="upperPart">
                <span className="author">{messageData.author}</span>
                <span className="time">{processedTime}</span>
            </div>
            <div className="bottomPart">{messageData.content}</div>
        </div>
    );
}
