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
            <SuggestionBar />
            <Grid
                key={`${channelSearch} ${term} ${activeChannel?.user.username}`}
                columns={4}
                width={inputRef.current ? inputRef.current.offsetWidth : 50}
                fetchGifs={fetchGifs}
            />
        </div>
    );
};

export default GifPanelWrapper;
