import { useState, useEffect } from "react";

import "./Discover.css";
import GridArtwork from "./grid-artwork/GridArtwork";

function Discover() {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        fetch("/api/artworks")
            .then(response => response.json())
            .then(data => setArtworks(data));
    }, []);

    return (
        <div className="discover">
            <h1 className="discover__title">Discover New Artists</h1>
            <main className="masonry-grid">
                {artworks.map(artwork => (
                    <GridArtwork img_url={artwork.img_url} artwork_id={artwork.artwork_id} key={artwork.artwork_id} />
                ))}
            </main>
        </div>
    );
}

export default Discover;
