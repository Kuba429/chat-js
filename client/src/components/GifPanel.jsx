import React, { useContext, useEffect, useState } from "react";
import {
    Carousel,
    Grid,
    SearchBar,
    SearchContext,
    SearchContextManager,
    SuggestionBar,
} from "@giphy/react-components";
import MyContext from "../ContextWrapper";
const GifPanelWrapper = ({ inputRef, toggleGifPanel }) => {
    return (
        // according to docs it's ok for the key to be exposed,
        // can't prevent sdk components from exposing it anyway
        <SearchContextManager apiKey="k7gCvducuYIyvhzBPxTIkzpsuaxRNGbP">
            <GifPanel toggleGifPanel={toggleGifPanel} inputRef={inputRef} />
        </SearchContextManager>
    );
};

const GifPanel = ({ inputRef, toggleGifPanel }) => {
    const { fetchGifs, term, channelSearch, activeChannel } =
        useContext(SearchContext);
    const context = useContext(MyContext);
    const gifClickHandler = (gif, e) => {
        e.preventDefault();
        context.socket.emit("sendGif", {
            roomId: context.roomId,
            gifUrl: gif.embed_url,
        });
        toggleGifPanel();
    };
    return (
        <div className="gifPanel">
            <SearchBar />
            {/* <SuggestionBar /> */}
            <Grid
                key={`${channelSearch} ${term} ${activeChannel?.user.username}`}
                columns={inputRef.current.offsetWidth > 500 ? 4 : 2}
                width={
                    // textarea width + 2 * 36 which is FIXED width of buttons
                    inputRef.current.offsetWidth + 2 * 36
                }
                onGifClick={gifClickHandler}
                fetchGifs={fetchGifs}
            />
        </div>
    );
};

export default GifPanelWrapper;
