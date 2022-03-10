import { useContext } from "react";

import "./Discover.css";
import GridArtwork from "./grid-artwork/GridArtwork";
import { DiscoverArtworksContext } from "../../../contexts/DiscoverArtworksContext";

function Discover() {
    const { artworks } = useContext(DiscoverArtworksContext);

    return (
        <div className="discover">
            <div className="title--highlight-wrapper">
                <h1 className="discover__title title--highlight">Discover New Artists</h1>
            </div>
            <main className="masonry-grid">
                {artworks.map((artwork) => (
                    <GridArtwork img_url={artwork.img_url} img_alt_txt={artwork.img_alt_txt} artwork_id={artwork.artwork_id} key={artwork.artwork_id} />
                ))}
            </main>
        </div>
    );
}

export default Discover;
