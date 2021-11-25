import React from "react";

export default function Message({isOwn}) {
    return (
        <div className={`message  ${isOwn ? 'own':''}`}>
            <div className="upperPart">
                <span className="author">Autor</span>
                <span className="time">8:12</span>
            </div>
            <div className="bottomPart">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Placeat corporis vel dicta molestiae explicabo nisi excepturi,
                commodi in, illo vero facilis sint! Magnam unde voluptates, in
                numquam quod doloremque eum.
            </div>
        </div>
    );
}
