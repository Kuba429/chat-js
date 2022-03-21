import { useContext, useRef } from "react";
import { useState } from "react";
import MyContext from "../ContextWrapper";
import GifPanelWrapper from "./GifPanel";

const InputPanel = () => {
    const context = useContext(MyContext);
    const [gifPanelState, setGifPanelState] = useState(false);
    const toggleGifPanel = () => {
        setGifPanelState(!gifPanelState);
    };
    const inputRef = useRef(null);
    const submitHandler = (e) => {
        e.preventDefault();
        if (inputRef.current.value.length < 1) return;
        let message = {
            type: "text",
            author: context.usernameState,
            authorId: context.socket.id,
            content: inputRef.current.value,
            time: new Date().getTime(),
        };
        inputRef.current.value = "";
        resizeHandler();
        context.socket.emit(`sendMessage`, {
            roomId: context.roomId,
            message,
        });
    };
    const resizeHandler = () => {
        inputRef.current.style.height = "auto";
        if (inputRef.current.scrollHeight <= 150) {
            inputRef.current.style.height =
                inputRef.current.scrollHeight + "px";
        } else {
            inputRef.current.style.height = "150px";
        }
    };
    const keyDownHandler = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            submitHandler(e);
        }
    };
    return (
        <form className="inputPanel" onSubmit={submitHandler}>
            <textarea
                className="customScrollbar"
                type="text"
                placeholder="Type here..."
                ref={inputRef}
                rows="1"
                onInput={resizeHandler}
                onKeyDown={keyDownHandler}
            />

            <button
                type="button"
                className={gifPanelState ? "active" : ""}
                onClick={toggleGifPanel}
            >
                <ion-icon name="sparkles-outline"></ion-icon>
            </button>
            <button type="submit">
                <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
            {gifPanelState && (
                <GifPanelWrapper
                    toggleGifPanel={toggleGifPanel}
                    inputRef={inputRef}
                />
            )}
        </form>
    );
};

export default InputPanel;
