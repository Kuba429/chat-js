import React, { useContext } from "react";
import MyContext from "../ContextWrapper";
export default function Test() {
    const context = useContext(MyContext);

    return (
        <div>
            <h1>{context.username}</h1>
            <button onClick={debug}>Test</button>
          
        </div>
    );
}
