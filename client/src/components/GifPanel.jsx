import React, { useContext, useEffect, useState } from "react";
import {
    Carousel,
    Grid,
    SearchBar,
    SearchContext,
    SearchContextManager,
    SuggestionBar,
} from "@giphy/react-components";
const GifPanelWrapper = ({ inputRef }) => {
    return (
        <SearchContextManager apiKey="k7gCvducuYIyvhzBPxTIkzpsuaxRNGbP">
            <GifPanel inputRef={inputRef} />
        </SearchContextManager>
    );
};

const GifPanel = ({ inputRef }) => {
    const { fetchGifs, term, channelSearch, activeChannel } =
        useContext(SearchContext);
    return (
        <div className="gifPanel">
            <SearchBar />
            {/* <SuggestionBar /> */}
            <Grid
                key={`${channelSearch} ${term} ${activeChannel?.user.username}`}
                columns={4}
                width={
                    // textarea width + 2 * 36 which is FIXED width of buttons
                    inputRef.current ? inputRef.current.offsetWidth + 2 * 36 : 0
                }
                fetchGifs={fetchGifs}
            />
        </div>
    );
};

export default GifPanelWrapper;
