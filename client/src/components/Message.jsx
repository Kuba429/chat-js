import React from "react";

export default function Message({ messageData }) {
    const isOwn = false;
    const date = new Date(messageData.time);
    const processedTime = `${date.getHours()}:${date.getMinutes()}`;

    return (
        <div className={`message  ${isOwn ? "own" : ""}`}>
            <div className="upperPart">
                <span className="author">{messageData.author}</span>
                <span className="time">
                    {processedTime}
                </span>
            </div>
            <div className="bottomPart">{messageData.content}</div>
        </div>
    );
}
