import { useState, useEffect } from "react";

import "./ArtworkFavorites.css";

function ArtworkFavorites({ userId, token }) {
    const [favoritesData, setFavoritesData] = useState([]);

    useEffect(() => {
        fetch(`/api/artworks/users/${userId}/favorites`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }, [userId, token]);

    return (
        <div>
            Favorites
        </div>
    );
}

export default ArtworkFavorites;
