import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import "./FavoriteItem.css";

function FavoriteItem({ favorite, deleteFavorite }) {
    return (
        <article className="dashboard__favorites__article">
            <Link to={{pathname: `/artworks/${favorite.artwork_id}`}} className="dashboard__favorites__article-link">
                <figure className="dashboard__favorites__article__fig">
                    <Image
                        className="dashboard__favorites__article__fig__img"
                        cloudName="dev-project"
                        publicId={favorite.img_url}
                        height="375"
                        width="auto"
                        decoding="async"
                    >
                        <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                </figure>
                <h2 className="dashboard__favorites__article__title">{favorite.title}</h2>
            </Link>
            <button onClick={() => deleteFavorite(favorite.artwork_id, favorite.favorite_id)} className="dashboard__favorites__article__delete-btn">Delete Favorite</button>
        </article>
    );
}

export default FavoriteItem;
