import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

// this may help to keep consistent vh on mobile browsers (autohiding address bars)
const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.querySelector("#root").style.setProperty("--vh", `${vh}px`);
};
setVh();
window.addEventListener("resize", setVh);
