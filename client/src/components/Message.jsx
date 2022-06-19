import React, { useContext } from "react";
import MyContext from "../ContextWrapper";

export default function Message({ messageData }) {
    const { socket } = useContext(MyContext);
    const isOwn = socket.id === messageData.authorId;
    const date = new Date(messageData.time);
    let hour = date.getHours().toString();
    let minute = date.getMinutes().toString();
    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;
    // const processedTime = `${hour}:${minute}`;
    const processedTime = hour + ":" + minute;
    return (
        <div className={`message  ${isOwn ? "own" : ""}`}>
            <div className="upperPart">
                <span className="author">{messageData.author}</span>
                <span className="time">{processedTime}</span>
            </div>
            {/* content depends on the type of message */}
            {messageData.type == "text" ? (
                <>
                    {messageData.image && <img src={messageData.image} />}
                    <pre className="bottomPart">{messageData.content}</pre>
                </>
            ) : messageData.type == "gif" ? (
                <img src={messageData.content} alt="" />
            ) : (
                <div>aa</div>
            )}
        </div>
    );
}
