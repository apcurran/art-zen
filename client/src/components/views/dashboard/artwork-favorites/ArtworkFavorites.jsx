import { useState, useEffect } from "react";

import "./ArtworkFavorites.css";
import FavoriteItem from "./favorite-item/FavoriteItem";

function ArtworkFavorites({ userId, token }) {
    const [favoritesData, setFavoritesData] = useState([]);

    useEffect(() => {
        fetch(`/api/artworks/users/${userId}/favorites`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setFavoritesData(data.favoritesData))
            .catch((err) => console.error(err));
    }, [userId, token]);

    async function deleteFavorite(artworkId, favoriteId) {
        try {
            await fetch(`/api/artworks/${artworkId}/favorites/${favoriteId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update local state
            const updatedFavs = favoritesData.filter(
                (favorite) => favorite.favorite_id !== Number(favoriteId),
            );

            setFavoritesData(updatedFavs);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className="dashboard__favorites">
            {favoritesData.map((favorite) => (
                <FavoriteItem
                    favorite={favorite}
                    deleteFavorite={deleteFavorite}
                    key={favorite.favorite_id}
                />
            ))}
        </section>
    );
}

export default ArtworkFavorites;
