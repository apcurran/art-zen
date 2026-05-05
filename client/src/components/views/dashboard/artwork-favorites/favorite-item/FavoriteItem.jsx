import { Link } from "react-router";
import { AdvancedImage } from "@cloudinary/react";

import { cld } from "../../../../../utils/cloudinary-client";

import "./FavoriteItem.css";

function FavoriteItem({ favorite, deleteFavorite }) {
    const img = cld.image(favorite.img_url).quality("auto").format("auto");

    return (
        <article className="dashboard__favorites__article">
            <Link
                to={{ pathname: `/artworks/${favorite.artwork_id}` }}
                className="dashboard__favorites__article-link"
            >
                <figure className="dashboard__favorites__article__fig">
                    <AdvancedImage
                        cldImg={img}
                        alt={favorite.img_alt_txt}
                        height="375"
                        width="auto"
                        decoding="async"
                        className="dashboard__favorites__article__fig__img"
                    />
                </figure>
                <h2 className="dashboard__favorites__article__title">
                    {favorite.title}
                </h2>
            </Link>
            <button
                onClick={() =>
                    deleteFavorite(favorite.artwork_id, favorite.favorite_id)
                }
                className="dashboard__favorites__article__delete-btn"
            >
                Delete Favorite
            </button>
        </article>
    );
}

export default FavoriteItem;
