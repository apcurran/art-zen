import { useState, useEffect } from "react";

import "./Discover.css";

function Discover() {
    useEffect(() => {
        fetch("/api/artworks")
            .then(response => response.json())
            .then(data => console.log(data));
    }, []);

    return (
        <div>
            Discover new artists
        </div>
    );
}

export default Discover;
