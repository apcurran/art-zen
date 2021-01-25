import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

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
            .then(data => setFavoritesData(data.favoritesData))
            .catch(err => console.error(err));
    }, [userId, token]);

    async function deleteFavorite(artworkId, favoriteId) {
        try {
            const response = await fetch(`/api/artworks/${artworkId}/favorites/${favoriteId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const message = await response.json();

            // Update local state
            const updatedFavs = favoritesData.filter(favorite => favorite.favorite_id !== Number(favoriteId));

            setFavoritesData(updatedFavs);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className="dashboard__favorites">
            {favoritesData.map(favorite => (
                <article className="dashboard__favorites__article" key={favorite.favorite_id}>
                    <Link to={{pathname: `/artworks/${favorite.artwork_id}`}} className="dashboard__favorites__article__title-link">
                        <h2 className="dashboard__favorites__article__title">{favorite.title}</h2>
                    </Link>
                    <button onClick={() => deleteFavorite(favorite.artwork_id, favorite.favorite_id)} className="dashboard__favorites__article__delete-btn">Delete Favorite</button>
                    <figure className="dashboard__favorites__article__fig">
                        <Image
                            className="dashboard__favorites__article__fig__img"
                            cloudName="dev-project"
                            publicId={favorite.img_url}
                            height="375"
                            decoding="async"
                        >
                            <Transformation quality="auto" fetchFormat="auto" />
                        </Image>
                    </figure>
                </article>
            ))}
        </section>
    );
}

export default ArtworkFavorites;
