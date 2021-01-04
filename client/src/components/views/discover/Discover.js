import { useState, useEffect } from "react";

import "./Discover.css";
import Artwork from "./artwork/Artwork";

function Discover() {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        fetch("/api/artworks")
            .then(response => response.json())
            .then(data => setArtworks(data));
    }, []);

    return (
        <div>
            <h1>Discover New Artists</h1>
            <main>
                {artworks.map(artwork => (
                    <Artwork img_url={artwork.img_url} key={artwork.artwork_id} />
                ))}
            </main>
        </div>
    );
}

export default Discover;
