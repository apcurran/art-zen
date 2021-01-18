import { useContext } from "react";

import "./Discover.css";
import GridArtwork from "./grid-artwork/GridArtwork";
import { DiscoverArtworksContext } from "../../../contexts/DiscoverArtworksContext";

function Discover() {
    const { artworks } = useContext(DiscoverArtworksContext);

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
