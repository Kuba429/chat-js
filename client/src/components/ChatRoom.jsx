import React, { useContext } from "react";
import { useParams } from "react-router";
import MyContext from "../ContextWrapper";
import Message from "./Message";

export default function ChatRoom() {
    const { roomId } = useParams();
    const context = useContext(MyContext);

    return (
        <div className="chatRoom">
            <div className="container">
                <div className="messages">
                    <Message/>
                    <Message isOwn={true}/>
                    <Message/>
                </div>
            </div>
            <form className="inputPanel">
                <input type="text" /> <button type="submit">Send</button>
            </form>
        </div>
    );
}
