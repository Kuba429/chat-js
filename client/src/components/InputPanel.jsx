import { useContext, useRef } from "react";
import { useState } from "react";
import MyContext from "../ContextWrapper";
import { toBase64 } from "./ChatRoom";
import GifPanelWrapper from "./GifPanel";
import UploadedImagePreview from "./UploadedImagePreview";

const InputPanel = () => {
    const context = useContext(MyContext);
    const [gifPanelState, setGifPanelState] = useState(false);
    const toggleGifPanel = () => {
        setGifPanelState(!gifPanelState);
    };
    const [fileState, setFileState] = useState(null);
    const [fileBase64, setFileBase64] = useState(null); // for file preview; might change the way it's handled later if it causes too much latency; not in it's component to avoid unnecesary memory allocation as the component remounts on fileState change anyway
    const removeUploadedImage = () => {
        setFileState(null);
        setFileBase64(null);
    }; // might make a custom hook later
    const inputRef = useRef(null);
    const submitHandler = (e) => {
        e.preventDefault();
        const image = fileState; // for some reason passing state directly causes problems; have to dereference
        if (inputRef.current.value.length < 1 && !image) return;
        let message = {
            type: "text",
            image: image,
            author: context.usernameState,
            authorId: context.socket.id,
            content: inputRef.current.value,
            time: new Date().getTime(),
        };
        context.socket.emit(`sendMessage`, {
            roomId: context.roomId,
            message,
        });
        setFileState(null);
        setFileBase64(null);
        inputRef.current.value = "";
        resizeHandler();
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
    const handleFileInput = async (e) => {
        setFileState(e.target.files[0]);
        const base64 = await toBase64(e.target.files[0]);
        setFileBase64(base64);
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
            <label className="panel-btn">
                <ion-icon name="image-outline"></ion-icon>
                <input
                    onChange={handleFileInput}
                    accept="image/*"
                    type="file"
                />
            </label>

            <button
                type="button"
                className={`panel-btn ${gifPanelState ? "active" : ""}`}
                onClick={toggleGifPanel}
            >
                <ion-icon name="sparkles-outline"></ion-icon>
            </button>
            <button className="panel-btn" type="submit">
                <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
            {gifPanelState && (
                <GifPanelWrapper
                    toggleGifPanel={toggleGifPanel}
                    inputRef={inputRef}
                />
            )}

            {fileState && (
                <UploadedImagePreview
                    fileBase64={fileBase64}
                    removeUploadedImage={removeUploadedImage}
                />
            )}
        </form>
    );
};

export default InputPanel;
