import { useState, useEffect } from "react";
import { useParams } from "react-router";

function ArtworkView() {
    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/artworks/${id}`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            Artwork View {id}
        </div>
    );
}

export default ArtworkView;
