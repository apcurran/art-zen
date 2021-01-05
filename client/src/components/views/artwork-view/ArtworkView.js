import { useState, useEffect } from "react";
import { useParams } from "react-router";

function ArtworkView() {
    const { id } = useParams();
    const [artworkData, setArtworkData] = useState([]);

    useEffect(() => {
        fetch(`/api/artworks/${id}`)
            .then(response => response.json())
            .then(data => setArtworkData(data))
            .catch(err => console.error(err));
    }, [id]);

    return (
        <div>
            Artwork View {id}
        </div>
    );
}

export default ArtworkView;
