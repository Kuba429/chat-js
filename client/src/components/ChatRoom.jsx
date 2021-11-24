import React, { useContext } from "react";
import { useParams } from "react-router";
import MyContext from "../ContextWrapper";

export default function ChatRoom() {
    const { roomId } = useParams();
    const context = useContext(MyContext);

    return (
        <div>
            <h1>Chat Room</h1>
            <p>{context.usernameState}</p>
            <p>{roomId}</p>
        </div>
    );
}
